import { useEffect, useState } from 'react'

import Pokemon from './components/Pokemon'

import './App.css'

import type { PokemonApiResponse } from './type/pokemonApiResponse'

const startingHealth = 10;
const damage = 2;
const maxPokemonId = 1025;
const pokemonName = "Ditto";

function getRandomId() {
  return Math.floor(Math.random() * maxPokemonId) + 1 // 1 to 1025
}


function App() {

  const [currentPokemon, setCurrentPokemon] = useState<PokemonApiResponse | null>(null)
  const [health, setHealth] = useState<number>(startingHealth)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const result = await response.json();
        setCurrentPokemon(result);
        setHealth(startingHealth);
      } catch (error) {
        console.log('Error:' + error);
      }
    }

    fetchData();

  }, [])

  useEffect(() => {
    if (health != 0) return;
    setCurrentPokemon(null);
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomId()}`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const result = await response.json();
        setCurrentPokemon(result);
        setHealth(startingHealth);
      } catch (error) {
        console.log('Error:' + error);
      }
    }

    fetchData();

  }, [health])

  function damagePokemon(damage: number) {
    setHealth(health => Math.max(health - damage, 0))
  }


  return (
    <>

      <h1 className="text-center">Welcome to Pokemon Game</h1>
      <section className="main d-flex justify-content-center py-3">
        {!currentPokemon && <p>Loading Pokemon...</p>}
        {currentPokemon?.sprites.front_default && (
          <Pokemon
            name={currentPokemon.name}
            image={currentPokemon.sprites.front_default}
            height={currentPokemon.height}
            weight={currentPokemon.weight}
            baseExperience={currentPokemon.base_experience}
            order={currentPokemon.order}
            onClickAction={() => damagePokemon(damage)}
            health={health}
          />
        )}
      </section>
    </>
  )
}

export default App
