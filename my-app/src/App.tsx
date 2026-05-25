/* import HeaderPersonalizado from './components/headerPersonalizado'
import GameHolder from './components/gameHolder'
import SideBar from './components/sideBar'
import Footer from './components/footer'
import Saldo from './components/saldo'
import './App.css'
import './index.css'
import blackjackImage from './assets/blackjack.png'

type Game = {
  title: string
  description: string
  imageUrl?: string
  gameUrl: string
}

const games: Game[] = [
  {
    title: 'BlackJack',
    description: 'Jogue BlackJack e teste sua sorte!',
    imageUrl: blackjackImage,
    gameUrl: '/jogos/blackjack',
  },
  {
    title: 'A ser desenvolvido',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '',
    gameUrl: '/jogos/',
  },
  {
    title: 'A ser desenvolvido',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '',
    gameUrl: '/jogos/',
  },
]

function App() {
  return (
    <div className="appContainer">
      <div className="headerWrapper">
        <HeaderPersonalizado />
        <Saldo />
      </div>

      <div className="mainWrapper">
        <SideBar />
        <main className="appShell">
          <section className="appHero">
            <div>
              <span className="heroBadge">Portal de Jogos Educativos</span>
              <h1>Escolha seu próximo jogo</h1>
              <p>
                Cada cartão leva você para a página do jogo. Clique e divirta-se enquanto aprende.
              </p>
            </div>
          </section>

          <section className="gamesSection">
            <div className="sectionHeader">
              <h2>Jogos Disponíveis</h2>
              <p>Toque em qualquer card para ser direcionado à página do jogo.</p>
            </div>
            <div className="gamesGrid">
              {games.map((game) => (
                <GameHolder
                  key={game.gameUrl}
                  title={game.title}
                  description={game.description}
                  imageUrl={game.imageUrl}
                  gameUrl={game.gameUrl}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App*/

import { useState } from 'react'
import './App.css'
import Carta from './components/carta'
import HeaderPersonalizado from './components/headerPersonalizado'
import MaoJogador from './components/maoJogador'
import PainelAcoes from './components/painelAcoes'
import Placar from './components/placar'

function App() {
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
        <PainelAcoes />
      </section>
    </main>
  )
}

export default App