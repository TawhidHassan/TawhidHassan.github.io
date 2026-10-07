"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
};

const action =
  "inline-flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent";

/** Inbox for contact-form submissions. */
export function Messages({ onUnreadChange }: { onUnreadChange: (n: number) => void }) {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setMessages(data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  useEffect(() => {
    if (messages) onUnreadChange(messages.filter((m) => !m.is_read).length);
  }, [messages, onUnreadChange]);

  const setRead = async (m: Message, is_read: boolean) => {
    setMessages((prev) => prev?.map((x) => (x.id === m.id ? { ...x, is_read } : x)) ?? null);
    const { error } = await supabase.from("messages").update({ is_read }).eq("id", m.id);
    if (error) {
      setError(error.message);
      load();
    }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    setConfirmId(null);
    if (error) setError(error.message);
    else setMessages((prev) => prev?.filter((m) => m.id !== id) ?? null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="mt-1 text-sm text-muted">
          Submissions from the contact form on your site.
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {!messages && !error && (
        <div className="grid place-items-center py-20 text-muted">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {messages?.length === 0 && (
        <div className="rounded-2xl border border-dashed border-card-border px-6 py-14 text-center text-sm text-muted">
          No messages yet.
        </div>
      )}

      <ul className="space-y-3">
        {messages?.map((m) => (
          <li
            key={m.id}
            className={cn(
              "rounded-2xl border bg-card p-4 sm:p-5",
              m.is_read ? "border-card-border" : "border-accent/50"
            )}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="min-w-0">
                <span className="font-medium">{m.name}</span>
                <span className="ml-2 text-sm text-muted">{m.email}</span>
              </div>
              <time className="text-xs text-muted">
                {new Date(m.created_at).toLocaleString()}
              </time>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {m.message}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a href={`mailto:${m.email}`} className={action}>
                <Reply size={13} /> Reply
              </a>
              <button type="button" onClick={() => setRead(m, !m.is_read)} className={action}>
                {m.is_read ? <Mail size={13} /> : <MailOpen size={13} />}
                Mark {m.is_read ? "unread" : "read"}
              </button>
              {confirmId === m.id ? (
                <>
                  <button
                    type="button"
                    onClick={() => remove(m.id)}
                    className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmId(null)}
                    className="px-2 text-xs text-muted hover:text-foreground"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmId(m.id)}
                  className={cn(action, "hover:border-red-500 hover:text-red-500")}
                >
                  <Trash2 size={13} /> Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
