import Image from "next/image";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero/>
        <div className={`h-dvh`}></div>
    </main>
  );
}
