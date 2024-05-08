import React from "react";
import { Hero } from "../../components/hero/Hero";
import { Perks } from "../../components/perks/Perks";

export function Home() {
  return (
    <main className="main">
      <Hero />
      <Perks />
    </main>
  );
}
