import type { MaoProps } from "../types/components/props.types"

function MaoJogador({ cards }: MaoProps) {
  return (
    <section className="mao-jogador">
      <h3>Sua mão</h3>
      <div className="linha-cartas">
        {cards.length === 0 ? (
          <div className="carta carta-vazia">Sem cartas</div>
        ) : (
          cards.map((carta) => (
            <div key={carta} className="carta">
              {carta}
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default MaoJogador