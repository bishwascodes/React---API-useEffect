import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Pokemon from './Pokemon'

import type { PokemonApiResponse } from '../type/pokemonApiResponse'

const startingHealth = 10;
const damage = 2;
const maxPokemonId = 1025;
const startingPokemon = "ditto";

function getRandomId() {
  return Math.floor(Math.random() * maxPokemonId) + 1 // 1 to 1025
}

// queryFn: fetches one Pokemon by name or id
async function fetchPokemon(id: string | number): Promise<PokemonApiResponse> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json();
}


// TanStack Query implementation: useQuery replaces useEffect + loading/data state
function TanStackPokemon() {

  const [pokemonId, setPokemonId] = useState<string | number>(startingPokemon)
  const [health, setHealth] = useState<number>(startingHealth)

  const { data, isPending, isError, error, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => fetchPokemon(pokemonId),
    staleTime: 60 * 1000, // data stays "fresh" for 60 seconds -> no refetch
  })

  function damagePokemon(damage: number) {
    const newHealth = Math.max(health - damage, 0)
    if (newHealth === 0) {
      // Changing the queryKey makes TanStack fetch the new Pokemon automatically
      setPokemonId(getRandomId())
      setHealth(startingHealth)
    } else {
      setHealth(newHealth)
    }
  }

  return (
    <>
      <p className="text-center cache-info">
        {isFetching
          ? 'Fetching from API...'
          : data && `Showing cached data : last fetched from API at ${new Date(dataUpdatedAt).toLocaleTimeString()}.`}
      </p>

      <section className="main d-flex justify-content-center py-3">
        {isPending && <p>Loading Pokemon...</p>}
        {isError && <p className="error">Error: {error.message}</p>}
        {data?.sprites.front_default && (
          <Pokemon
            name={data.name}
            image={data.sprites.front_default}
            height={data.height}
            weight={data.weight}
            baseExperience={data.base_experience}
            order={data.order}
            onClickAction={() => damagePokemon(damage)}
            health={health}
          />
        )}
      </section>
    </>
  )
}

export default TanStackPokemon
