function MaoDealer() {
  const cartas = ['A◆', '10♣']

  return (
    <section className="mao-dealer">
      <h3>Mão do Dealer</h3>
      <div className="linha-cartas">
        {cartas.map((carta) => (
          <div key={carta} className="carta">
            {carta}
          </div>
        ))}
      </div>
    </section>
  )
}

export default MaoDealer