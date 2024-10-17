export type Item = {
  id: number
  name: string
  description: string
}

export type Pokemon = {
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
}
