import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="font-display text-4xl font-semibold">Den side er ikke i ovnen</h1>
      <p className="mt-3 text-rye">Vi kunne ikke finde det, du ledte efter.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-crust px-5 py-3 font-semibold text-flour">
        Tilbage til opskrifterne
      </Link>
    </div>
  );
}
