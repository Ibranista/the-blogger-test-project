"use client";

import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState, useTransition } from "react";

import { StarFilledIcon,StarOutlineIcon } from "@/assets/icons";
import { auth, db, googleProvider } from "@/lib/firebase/client";

type Props = { articleId: string | number };

export default function StarButton({ articleId }: Props) {
  const id = String(articleId);

  const [user, setUser] = useState<User | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [hasStarred, setHasStarred] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const colRef = collection(db, "articles", id, "stargazers");
        const agg = await getCountFromServer(colRef);
        if (!cancelled) setCount(agg.data().count);

        if (auth.currentUser) {
          const myDoc = await getDoc(
            doc(db, "articles", id, "stargazers", auth.currentUser.uid)
          );
          if (!cancelled) setHasStarred(myDoc.exists());
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, user]);

  async function ensureSignedIn() {
    if (auth.currentUser) return auth.currentUser;
    const cred = await signInWithPopup(auth, googleProvider);
    return cred.user;
  }

  async function toggleStar() {
    try {
      const u = await ensureSignedIn();
      const starRef = doc(db, "articles", id, "stargazers", u.uid);

      startTransition(() => {
        setHasStarred((prev) => !prev);
        setCount((c) => (c == null ? c : hasStarred ? c - 1 : c + 1));
      });

      if (hasStarred) {
        await deleteDoc(starRef);
      } else {
        await setDoc(starRef, { createdAt: serverTimestamp() });
      }

      // sync from server
      const colRef = collection(db, "articles", id, "stargazers");
      const agg = await getCountFromServer(colRef);
      setCount(agg.data().count);

      const me = await getDoc(starRef);
      setHasStarred(me.exists());
    } catch (e) {
      console.error("Failed to toggle star:", e);
    }
  }

  return (
    <button
      onClick={toggleStar}
      disabled={isPending || count === null}
      aria-pressed={hasStarred}
      className="group relative flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="relative">
        <StarOutlineIcon
          className={`w-5 h-5 transition-all duration-300 absolute inset-0 ${
            hasStarred
              ? "opacity-0 scale-125 -rotate-45 text-yellow-400"
              : "opacity-100 text-muted-foreground/70 group-hover:text-yellow-500/80"
          }`}
        />

        <StarFilledIcon
          className={`w-5 h-5 transition-all duration-300 ${
            hasStarred
              ? "opacity-100 scale-100 text-yellow-400"
              : "opacity-0 scale-75 rotate-45 text-yellow-400"
          }`}
        />
      </div>

      <span
        className={`font-medium transition-all duration-300 ${
          hasStarred
            ? "text-yellow-600"
            : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        {count ?? "—"}
      </span>

      <div
        className={`absolute inset-0 rounded-full -z-10 transition-all duration-300 ${
          hasStarred
            ? "bg-yellow-100/70"
            : "bg-muted group-hover:bg-muted-foreground/10"
        }`}
      />
    </button>
  );
}
