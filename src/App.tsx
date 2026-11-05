import { useState } from 'react'

import RegularFetch from './components/RegularFetch'
import TanStackPokemon from './components/TanStackPokemon'

import './App.css'

type Tab = 'regular' | 'tanstack'

function App() {

  const [activeTab, setActiveTab] = useState<Tab>('regular')

  return (
    <>
      <h1 className="text-center">Welcome to Pokemon Game</h1>

      <nav className="tabs">
        <button
          className={activeTab === 'regular' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('regular')}
        >
          Regular Fetch
        </button>
        <button
          className={activeTab === 'tanstack' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('tanstack')}
        >
          TanStack Query
        </button>
      </nav>

      {activeTab === 'regular' ? <RegularFetch /> : <TanStackPokemon />}
    </>
  )
}

export default App
