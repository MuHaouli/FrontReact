import { useState } from 'react'
import '../App.css'
import '../index.css'
import Carta from '../components/carta'
import HeaderPersonalizado from '../components/headerPersonalizado'
import PainelAcoes from '../components/painelAcoes'
import Placar from '../components/placar'
import Saldo from '../components/saldo'

function Blackjack() {
  const [pontosJogador, setPontosJogador] = useState(17)
  const [rodadaAtiva, setRodadaAtiva] = useState(true)

  function handleComprarCarta() {
    setPontosJogador((pontosAtuais) => pontosAtuais + 1)
  }

  function handleNovaRodada() {
    setPontosJogador(12)
    setRodadaAtiva(true)
  }

  return (
    <main className="app-aula">
      <div className="headerWrapper">
        <HeaderPersonalizado />
        <Saldo />
      </div>

      <section className="blackjack-board">
        <Placar maoJogador={pontosJogador} maoDealer={15} />
      </section>

      <section className="bloco-demo">
        <h3>Controles</h3>
        <p>Pontos do jogador: {pontosJogador}</p>
        <p>Status: <strong>{rodadaAtiva ? '🟢 Rodada Ativa' : '🔴 Rodada Encerrada'}</strong></p>
        
        <div className="blackjack-controls-container">
          <button type="button" onClick={handleComprarCarta}>
            🎴 Comprar (demo)
          </button>
          <button type="button" onClick={handleNovaRodada}>
            🔄 Reiniciar rodada
          </button>
          <button type="button" onClick={() => setRodadaAtiva((estadoAtual) => !estadoAtual)}>
            ⚡ Alternar status
          </button>
        </div>
      </section>

      <section className="bloco-componentes">
        <h3>Componentes basicos extras</h3>
        <div className="blackjack-components-grid">
          <div className="blackjack-component-card">
            <h4>Carta de Exemplo</h4>
            <Carta />
          </div>
          <div className="blackjack-component-card">
            <h4>Painel de Ações</h4>
            <PainelAcoes />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Blackjack