import HeaderPersonalizado from './components/headerPersonalizado'
import GameHolder from './components/gameHolder'
import SideBar from './components/sideBar'
import Footer from './components/footer'
import Saldo from './components/saldo'
import './App.css'
import './index.css'

type Game = {
  title: string
  description: string
  imageUrl?: string
  gameUrl: string
}

const games: Game[] = [
  {
    title: 'Caça-Palavras de Português',
    description: 'Leia as palavras e encontre os termos escondidos na grade.',
    imageUrl: '',
    gameUrl: '/jogos/caca-palavras',
  },
  {
    title: 'Matemática Divertida',
    description: 'Resolva desafios de somas e multiplicações em tempo real.',
    imageUrl: '',
    gameUrl: '/jogos/matematica',
  },
  {
    title: 'Quiz de Ciências',
    description: 'Teste seus conhecimentos com perguntas educativas.',
    imageUrl: '',
    gameUrl: '/jogos/quiz-ciencias',
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

export default App
