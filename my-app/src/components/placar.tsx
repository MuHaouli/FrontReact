import type { PlacarMesaProps } from "../types/components/props.types"
import MaoJogador from "./maoJogador"
import MaoDealer from "./maoDealer"

function Placar({ maoJogador, maoDealer, playerCards, dealerCards }: PlacarMesaProps) {
  return (
    <section className="placar-mesa">
      <div className="placar-pontuacao">
        <div className="placar-item">
          <span className="placar-label">Jogador</span>
          <span className="placar-valor">{maoJogador}</span>
        </div>
        <div className="placar-item">
          <span className="placar-label">Dealer</span>
          <span className="placar-valor">{maoDealer}</span>
        </div>
      </div>
      <div className="placar-maos">
        <MaoJogador cards={playerCards} />
        <MaoDealer cards={dealerCards} />
      </div>
    </section>
  )
}

export default Placar