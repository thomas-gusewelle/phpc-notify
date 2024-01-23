'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <button onClick={() => router.push("/notify")} className="text-white bg-indigo-600 px-6  py-3 rounded-xl">I am the Preacher</button>
      <button onClick={() => router.push("/status")} className="text-white bg-neutral-600 px-6  py-3 rounded-xl">I am the Liturgist</button>
    </div>
  );
}
