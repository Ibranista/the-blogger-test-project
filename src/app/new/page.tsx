"use client";

import { Input } from "@/components/ui/input";
import { useGetPokemonByNameQuery } from "@/services/pokemon";

export default function ExamplePage() {
  const { data: bulbasaurData, isLoading } =
    useGetPokemonByNameQuery("bulbasaur");

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {bulbasaurData ? (
        <>
          <h2>{bulbasaurData.name}</h2>
          <img
            src={bulbasaurData.sprites.front_default}
            alt={bulbasaurData.name}
          />
        </>
      ) : (
        <p>No data found.</p>
      )}
      <Input type="text" placeholder="Search..." />
      <Input placeholder="Search something..." />
    </div>
  );
}
