import type { MaoProps } from "../types/components/props.types"

function MaoDealer({ cards }: MaoProps) {
  return (
    <section className="mao-dealer">
      <h3>Mão do Dealer</h3>
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

export default MaoDealer