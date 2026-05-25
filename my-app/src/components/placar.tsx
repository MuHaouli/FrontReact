import type { PlacarMesaProps } from "../types/components/props.types"

function Placar({maoJogador, maoDealer}:PlacarMesaProps) {
  
  return (
    <section className="placar-mesa">
      <p>Jogador: {maoJogador}</p>
      <p>Dealer: {maoDealer}</p>
    </section>
  )
}

export default Placar