"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { FormField } from "./fields";
import { emptyValue, type Collection, type Values } from "./schema";

const iconButton =
  "grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-foreground/5 hover:text-foreground disabled:pointer-events-none disabled:opacity-30";

function blankRow(collection: Collection): Values {
  return Object.fromEntries(
    collection.fields.map((f) => [f.name, emptyValue(f)])
  );
}

/** Slide-over form for creating or editing one row. */
function RowEditor({
  collection,
  row,
  onClose,
  onSaved,
  nextSortOrder,
}: {
  collection: Collection;
  row: Values | null;
  onClose: () => void;
  onSaved: () => void;
  nextSortOrder: number;
}) {
  const [values, setValues] = useState<Values>(row ?? blankRow(collection));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = Object.fromEntries(
      collection.fields.map((f) => [f.name, values[f.name]])
    );
    const { error } = row
      ? await supabase.from(collection.table).update(payload).eq("id", row.id)
      : await supabase
          .from(collection.table)
          .insert({ ...payload, sort_order: nextSortOrder });

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="hidden flex-1 cursor-default sm:block"
      />
      <form
        onSubmit={submit}
        className="flex h-full w-full max-w-xl flex-col border-l border-card-border bg-background shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-card-border px-6 py-4">
          <h2 className="text-lg font-semibold">
            {row ? "Edit" : "New"} {collection.singular}
          </h2>
          <button type="button" aria-label="Close" onClick={onClose} className={iconButton}>
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {collection.fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={values[field.name]}
              onChange={(v) => setValues((prev) => ({ ...prev, [field.name]: v }))}
            />
          ))}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-card-border px-6 py-4">
          <p className="min-w-0 truncate text-sm text-red-500">{error}</p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-card-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-accent-2 to-accent-3 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {row ? "Save changes" : "Create"}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}

/** List, create, edit, reorder and delete the rows of one content table. */
export function CollectionManager({ collection }: { collection: Collection }) {
  const [rows, setRows] = useState<Values[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Values | "new" | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from(collection.table)
      .select("*")
      .order("sort_order")
      .order("created_at");
    if (error) setError(error.message);
    else {
      setError("");
      setRows(data);
    }
  }, [collection.table]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const move = async (index: number, dir: -1 | 1) => {
    if (!rows) return;
    const next = [...rows];
    [next[index], next[index + dir]] = [next[index + dir], next[index]];
    const reordered: Values[] = next.map((r, i) => ({ ...r, sort_order: i }));
    setRows(reordered);

    // Persist only the rows whose position actually changed.
    const changed = reordered.filter(
      (r) => rows.find((o) => o.id === r.id)?.sort_order !== r.sort_order
    );
    const results = await Promise.all(
      changed.map((r) =>
        supabase.from(collection.table).update({ sort_order: r.sort_order }).eq("id", r.id)
      )
    );
    const failed = results.find((r) => r.error);
    if (failed?.error) {
      setError(failed.error.message);
      load();
    }
  };

  const remove = async (id: string) => {
    setBusyId(id);
    const { error } = await supabase.from(collection.table).delete().eq("id", id);
    setBusyId(null);
    setConfirmId(null);
    if (error) setError(error.message);
    else setRows((prev) => prev?.filter((r) => r.id !== id) ?? null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{collection.label}</h1>
          <p className="mt-1 text-sm text-muted">
            {rows ? `${rows.length} ${rows.length === 1 ? "item" : "items"}` : "Loading…"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-accent-2 to-accent-3 px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={16} /> Add {collection.singular}
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {rows?.length === 0 && (
        <div className="rounded-2xl border border-dashed border-card-border px-6 py-14 text-center text-sm text-muted">
          Nothing here yet. Add your first {collection.singular}.
        </div>
      )}

      <ul className="space-y-2">
        {rows?.map((row, i) => {
          const image = collection.imageField && row[collection.imageField];
          const subtitle = collection.subtitleField && row[collection.subtitleField];
          return (
            <li
              key={row.id}
              className="flex items-center gap-3 rounded-2xl border border-card-border bg-card px-3 py-3 sm:px-4"
            >
              {collection.imageField && (
                <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-foreground/5 text-xs font-semibold text-muted">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    String(row[collection.titleField] ?? "").slice(0, 2).toUpperCase()
                  )}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">
                  {row[collection.titleField] || "Untitled"}
                </div>
                {subtitle && (
                  <div className="truncate text-xs text-muted">{String(subtitle)}</div>
                )}
              </div>

              {confirmId === row.id ? (
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    disabled={busyId === row.id}
                    onClick={() => remove(row.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {busyId === row.id && <Loader2 size={13} className="animate-spin" />}
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmId(null)}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-muted hover:text-foreground"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex shrink-0 items-center">
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={i === 0}
                    onClick={() => move(i, -1)}
                    className={iconButton}
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={i === rows.length - 1}
                    onClick={() => move(i, 1)}
                    className={iconButton}
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Edit"
                    onClick={() => setEditing(row)}
                    className={iconButton}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    onClick={() => setConfirmId(row.id)}
                    className={cn(iconButton, "hover:bg-red-500/10 hover:text-red-500")}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {editing && (
        <RowEditor
          collection={collection}
          row={editing === "new" ? null : editing}
          nextSortOrder={rows?.length ? Math.max(...rows.map((r) => r.sort_order)) + 1 : 0}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}
