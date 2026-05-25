function MaoJogador() {
  const cartas = ['AS', '10H']

  return (
    <section className="mao-jogador">
      <h3>Sua mão</h3>
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

export default MaoJogador