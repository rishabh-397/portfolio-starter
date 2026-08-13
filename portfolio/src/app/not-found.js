import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-4">
      <p className="mono-tag">{"// 404"}</p>
      <h1 className="font-display italic text-5xl sm:text-6xl">Page not found.</h1>
      <p className="opacity-70 max-w-sm">
        Whatever you were looking for isn&apos;t here — might be a broken
        link, or a page that moved.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-full bg-signal text-ink px-6 py-2.5 font-medium hover:opacity-90 active:scale-95 transition-all"
      >
        Back to home
      </Link>
    </div>
  );
}
