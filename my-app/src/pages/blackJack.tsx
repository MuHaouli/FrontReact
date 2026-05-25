import { useState } from 'react'
import '../App.css'
import Carta from '../components/carta'
import HeaderPersonalizado from '../components/headerPersonalizado'
import MaoJogador from '../components/maoJogador'
import PainelAcoes from '../components/painelAcoes'
import Placar from '../components/placar'

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
      <HeaderPersonalizado />


      <Placar maoJogador={pontosJogador} maoDealer={15} />
      <MaoJogador />

      <section className="bloco-demo">
        <h3>Controles</h3>
        <p>Pontos do jogador: {pontosJogador}</p>
        <button type="button" onClick={handleComprarCarta}>
          Comprar (demo)
        </button>
        <button type="button" onClick={handleNovaRodada}>
          Reiniciar rodada
        </button>
        <button type="button" onClick={() => setRodadaAtiva((estadoAtual) => !estadoAtual)}>
          Alternar status
     
        </button>
      
        <p>{rodadaAtiva ? 'Rodada ativa' : 'Rodada encerrada'}</p>
      </section>

      <section className="bloco-componentes">
        <h3>Componentes basicos extras</h3>
        <Carta />
        <PainelAcoes />
      </section>
    </main>
  )
}

export default Blackjack