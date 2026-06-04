"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
};

/** Classic type / delete loop through a list of phrases. */
export function Typewriter({
  words,
  className,
  typeSpeed = 70,
  deleteSpeed = 35,
  holdTime = 1600,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 400);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-pulse bg-accent" />
    </span>
  );
}
