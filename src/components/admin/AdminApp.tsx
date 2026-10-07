"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ExternalLink, Inbox, Loader2, Lock, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Icon } from "@/lib/icons";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { CollectionManager } from "./CollectionManager";
import { inputClass } from "./fields";
import { Messages } from "./Messages";
import { COLLECTIONS, SETTINGS } from "./schema";
import { SettingsEditor } from "./SettingsEditor";

const isAdmin = (session: Session | null) =>
  session?.user.app_metadata?.role === "admin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message);
  };

  return (
    <div className="grid min-h-svh place-items-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-card-border bg-card p-7 shadow-xl shadow-black/5"
      >
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent via-accent-2 to-accent-3 text-white">
          <Lock size={20} />
        </span>
        <h1 className="mt-5 text-2xl font-semibold">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted">Manage your portfolio content.</p>

        <label className="mt-6 block">
          <span className="mb-1.5 block text-sm font-medium">Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-medium">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </label>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent via-accent-2 to-accent-3 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy && <Loader2 size={15} className="animate-spin" />}
          Sign in
        </button>
      </form>
    </div>
  );
}

const MESSAGES = "messages";
const SECTIONS = [...SETTINGS, ...COLLECTIONS];
const sectionId = (s: (typeof SECTIONS)[number]) =>
  s.kind === "settings" ? `settings-${s.key}` : s.table;

function Shell({ session }: { session: Session }) {
  const [active, setActive] = useState(MESSAGES);
  const [unread, setUnread] = useState(0);

  // Keep the open section in the URL hash so a refresh stays put.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (id === MESSAGES || SECTIONS.some((s) => sectionId(s) === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false)
      .then(({ count }) => setUnread(count ?? 0));
  }, []);

  const go = (id: string) => {
    window.history.replaceState(null, "", `#${id}`);
    setActive(id);
  };
  const onUnreadChange = useCallback((n: number) => setUnread(n), []);

  const current = SECTIONS.find((s) => sectionId(s) === active);

  const navButton = (id: string, label: string, icon: React.ReactNode, badge?: number) => (
    <button
      key={id}
      type="button"
      onClick={() => go(id)}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors",
        active === id
          ? "bg-accent/10 font-medium text-accent"
          : "text-muted hover:bg-foreground/5 hover:text-foreground"
      )}
    >
      {icon}
      <span className="flex-1 truncate">{label}</span>
      {!!badge && (
        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
    </button>
  );

  const groupLabel = "mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted/70";

  return (
    <div className="min-h-svh lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-card-border bg-background-2/40 p-4 lg:sticky lg:top-0 lg:flex lg:h-svh lg:overflow-y-auto">
        <div className="px-3 py-2 text-lg font-semibold">Portfolio admin</div>
        <div className="mt-4">
          {navButton(MESSAGES, "Messages", <Inbox size={16} />, unread)}
        </div>
        <div className={groupLabel}>Site</div>
        {SETTINGS.map((s) =>
          navButton(sectionId(s), s.label, <Icon name={s.icon} size={16} />)
        )}
        <div className={groupLabel}>Content</div>
        {COLLECTIONS.map((c) =>
          navButton(sectionId(c), c.label, <Icon name={c.icon} size={16} />)
        )}
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-card-border bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-8">
          {/* Mobile section picker */}
          <select
            aria-label="Section"
            value={active}
            onChange={(e) => go(e.target.value)}
            className={cn(inputClass, "max-w-[12rem] py-2 lg:hidden")}
          >
            <option value={MESSAGES}>
              Messages{unread ? ` (${unread})` : ""}
            </option>
            <optgroup label="Site">
              {SETTINGS.map((s) => (
                <option key={s.key} value={sectionId(s)}>
                  {s.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Content">
              {COLLECTIONS.map((c) => (
                <option key={c.table} value={sectionId(c)}>
                  {c.label}
                </option>
              ))}
            </optgroup>
          </select>

          <span className="hidden min-w-0 truncate text-sm text-muted lg:block">
            {session.user.email}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-card-border px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">View site</span>
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-card-border px-3 py-2 text-sm text-muted transition-colors hover:border-red-500 hover:text-red-500"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
          {active === MESSAGES || !current ? (
            <Messages onUnreadChange={onUnreadChange} />
          ) : current.kind === "settings" ? (
            <SettingsEditor key={current.key} doc={current} />
          ) : (
            <CollectionManager key={current.table} collection={current} />
          )}
        </main>
      </div>
    </div>
  );
}

/** Auth gate for the admin panel: login, then the content manager. */
export function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="grid min-h-svh place-items-center text-muted">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!session) return <Login />;

  if (!isAdmin(session)) {
    return (
      <div className="grid min-h-svh place-items-center px-6 text-center">
        <div>
          <h1 className="text-xl font-semibold">Not authorized</h1>
          <p className="mt-2 text-sm text-muted">
            {session.user.email} does not have admin access.
          </p>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="mt-5 rounded-xl border border-card-border px-4 py-2 text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <Shell session={session} />;
}
