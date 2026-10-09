export type PokemonApiResponse = {
  name: string,
  height: number,
  weight: number,
  base_experience: number,
  order: number,
  sprites: {
    front_default: string | null
  }
}
