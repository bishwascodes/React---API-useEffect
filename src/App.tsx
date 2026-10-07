import { useEffect, useState } from 'react'

import Pokemon from './components/Pokemon'

import './App.css'

type PokemonApiResponse = {
  name: string,
  height: number,
  weight: number,
  base_experience: number,
  order: number,
  sprites: {
    front_default: string | null
  }
}

function App() {
  const [currentPokemon, setCurrentPokemon] = useState<PokemonApiResponse | null>(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((response) => response.json())
      .then((data) => setCurrentPokemon(data))
  }, [])

  return (
    <>
      {!currentPokemon && <p>Loading Pokemon...</p>}
      {currentPokemon?.sprites.front_default && (
        <Pokemon
          name={currentPokemon.name}
          image={currentPokemon.sprites.front_default}
          height={currentPokemon.height}
          weight={currentPokemon.weight}
          baseExperience={currentPokemon.base_experience}
          order={currentPokemon.order}
        />
      )}
    </>
  )
}

export default App
