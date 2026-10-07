"use client";

import { useRef, useState } from "react";
import { FileText, Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import { ACCENTS } from "@/lib/data";
import { ICON_NAMES, Icon } from "@/lib/icons";
import { MEDIA_BUCKET, supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { emptyValue, type Field, type Values } from "./schema";

export const inputClass =
  "w-full rounded-xl border border-card-border bg-background-2/60 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20";

const ghostButton =
  "inline-flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent";

type Props = {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
};

/** Upload a file to the media bucket and return its public URL. */
async function uploadMedia(file: File, folder: string) {
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const path = `${folder}/${Date.now()}-${safe}`;
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "31536000", contentType: file.type });
  if (error) throw error;
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

function UploadField({ field, value, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const url = (value as string) ?? "";
  const isImage = field.type === "image";

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadMedia(file, field.folder ?? "misc"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl border border-dashed border-card-border bg-background-2/60 text-muted">
        {url && isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-full w-full object-cover" />
        ) : url ? (
          <FileText size={26} className="text-accent" />
        ) : (
          <Upload size={20} />
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={input}
            type="file"
            accept={field.accept ?? "image/*"}
            onChange={onPick}
            className="hidden"
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => input.current?.click()}
            className={cn(ghostButton, "text-foreground")}
          >
            {busy ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {busy ? "Uploading…" : url ? "Replace" : "Upload"}
          </button>
          {url && (
            <>
              <a href={url} target="_blank" rel="noopener noreferrer" className={ghostButton}>
                View
              </a>
              <button type="button" onClick={() => onChange("")} className={ghostButton}>
                <X size={13} /> Remove
              </button>
            </>
          )}
        </div>
        <input
          value={url}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste a URL"
          className={cn(inputClass, "text-xs")}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}

function ListField({ field, value, onChange }: Props) {
  const items = (value as string[]) ?? [];
  const update = (i: number, v: string) =>
    onChange(items.map((item, idx) => (idx === i ? v : item)));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          {field.multiline ? (
            <textarea
              value={item}
              rows={3}
              onChange={(e) => update(i, e.target.value)}
              className={inputClass}
            />
          ) : (
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              className={inputClass}
            />
          )}
          <button
            type="button"
            aria-label="Remove item"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ""])} className={ghostButton}>
        <Plus size={13} /> Add item
      </button>
    </div>
  );
}

function RowsField({ field, value, onChange }: Props) {
  const rows = (value as Values[]) ?? [];
  const columns = field.columns ?? [];
  const blank = () =>
    Object.fromEntries(columns.map((c) => [c.name, emptyValue(c)]));

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex items-end gap-2 rounded-xl border border-card-border bg-background-2/30 p-2.5"
        >
          <div
            className="grid flex-1 gap-2"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
          >
            {columns.map((col) => (
              <label key={col.name} className="block min-w-0">
                <span className="mb-1 block text-[11px] text-muted">{col.label}</span>
                <FieldInput
                  field={col}
                  value={row[col.name]}
                  onChange={(v) =>
                    onChange(
                      rows.map((r, idx) => (idx === i ? { ...r, [col.name]: v } : r))
                    )
                  }
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            aria-label="Remove row"
            onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
            className="grid h-10 w-9 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...rows, blank()])} className={ghostButton}>
        <Plus size={13} /> Add row
      </button>
    </div>
  );
}

/** Renders the control for a single field. */
export function FieldInput({ field, value, onChange }: Props) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          value={(value as string) ?? ""}
          rows={4}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      );
    case "number":
      return (
        <input
          type="number"
          step={field.step}
          value={value === null || value === undefined ? "" : String(value)}
          required={field.required}
          onChange={(e) =>
            onChange(e.target.value === "" ? "" : Number(e.target.value))
          }
          className={inputClass}
        />
      );
    case "icon":
      return (
        <div className="flex items-center gap-2">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
            <Icon name={(value as string) ?? ""} size={18} />
          </span>
          <select
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          >
            {ICON_NAMES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      );
    case "accent":
      return (
        <div className="flex flex-wrap gap-2">
          {ACCENTS.map((a) => (
            <button
              key={a}
              type="button"
              aria-label={a}
              aria-pressed={value === a}
              onClick={() => onChange(a)}
              className={cn(
                "h-9 w-14 rounded-xl bg-gradient-to-br ring-offset-2 ring-offset-background transition",
                a,
                value === a ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100"
              )}
            />
          ))}
        </div>
      );
    case "list":
      return <ListField field={field} value={value} onChange={onChange} />;
    case "rows":
      return <RowsField field={field} value={value} onChange={onChange} />;
    case "image":
    case "file":
      return <UploadField field={field} value={value} onChange={onChange} />;
    default:
      return (
        <input
          value={(value as string) ?? ""}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      );
  }
}

/** A labelled field, with optional group heading and help text. */
export function FormField(props: Props) {
  const { field } = props;
  return (
    <div>
      {field.group && (
        <h3 className="mb-4 mt-4 border-t border-card-border pt-6 text-xs font-semibold uppercase tracking-widest text-accent">
          {field.group}
        </h3>
      )}
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-accent"> *</span>}
        </span>
      </div>
      <FieldInput {...props} />
      {field.help && <p className="mt-1.5 text-xs text-muted">{field.help}</p>}
    </div>
  );
}
