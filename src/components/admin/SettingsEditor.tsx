"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FormField } from "./fields";
import { getPath, setPath, type SettingsDoc, type Values } from "./schema";

/** Shallow-merge saved values over defaults, one level deep for nested groups. */
function withDefaults(defaults: Values, saved: Values | null): Values {
  if (!saved) return defaults;
  const merged: Values = { ...defaults, ...saved };
  for (const [key, value] of Object.entries(defaults)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      merged[key] = { ...value, ...saved[key] };
    }
  }
  return merged;
}

/** Edit one `site_settings` JSON document. */
export function SettingsEditor({ doc }: { doc: SettingsDoc }) {
  const [values, setValues] = useState<Values | null>(null);
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", doc.key)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        setValues(withDefaults(doc.defaults, data?.value ?? null));
      });
    return () => {
      cancelled = true;
    };
  }, [doc]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values) return;
    setState("saving");
    setError("");
    const { error } = await supabase.from("site_settings").upsert({
      key: doc.key,
      value: values,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      setError(error.message);
      setState("idle");
      return;
    }
    setState("saved");
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <form onSubmit={save}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{doc.label}</h1>
          <p className="mt-1 text-sm text-muted">{doc.description}</p>
        </div>
        <button
          type="submit"
          disabled={!values || state === "saving"}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-accent-2 to-accent-3 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {state === "saving" && <Loader2 size={15} className="animate-spin" />}
          {state === "saved" && <Check size={15} />}
          {state === "saved" ? "Saved" : "Save"}
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {!values ? (
        <div className="grid place-items-center py-20 text-muted">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="space-y-5 rounded-2xl border border-card-border bg-card p-5 sm:p-7">
          {doc.fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={getPath(values, field.name)}
              onChange={(v) =>
                setValues((prev) => prev && setPath(prev, field.name, v))
              }
            />
          ))}
        </div>
      )}
    </form>
  );
}
