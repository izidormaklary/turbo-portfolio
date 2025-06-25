import { Suspense } from "react";
import Content from "@/ui/Content";
import Hero from "@/ui/Hero";
export default function Home() {
  return (
    <div className="w-full ">
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}
