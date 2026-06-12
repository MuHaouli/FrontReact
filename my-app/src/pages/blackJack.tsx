import { useState } from 'react'
import '../App.css'
import '../index.css'
import HeaderPersonalizado from '../components/headerPersonalizado'
import Placar from '../components/placar'
import Saldo from '../components/saldo'
import { startBlackjackGame, hitBlackjackGame, standBlackjackGame, GameState } from '../services/api'

function Blackjack() {
  const [game, setGame] = useState<GameState | null>(null)
  const [playerName, setPlayerName] = useState('Jogador')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleStartGame() {
    setError('')
    setLoading(true)
    try {
      const newGame = await startBlackjackGame(playerName || 'Jogador')
      setGame(newGame)
    } catch (err) {
      setError('Não foi possível iniciar o jogo. Verifique o backend.')
    } finally {
      setLoading(false)
    }
  }

  async function handleHit() {
    if (!game || game.finished) return
    setError('')
    setLoading(true)
    try {
      const updatedGame = await hitBlackjackGame(game.gameId)
      setGame(updatedGame)
    } catch (err) {
      setError('Erro ao comprar carta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  async function handleStand() {
    if (!game || game.finished) return
    setError('')
    setLoading(true)
    try {
      const updatedGame = await standBlackjackGame(game.gameId)
      setGame(updatedGame)
    } catch (err) {
      setError('Erro ao encerrar a rodada. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const statusText = game
    ? game.finished
      ? `Encerrado: ${game.result ?? 'Resultado indisponível'}`
      : 'Rodada ativa'
    : 'Aguardando início do jogo'

  return (
    <main className="app-aula">
      <div className="headerWrapper">
        <HeaderPersonalizado />
        <Saldo />
      </div>

      <section className="blackjack-board">
        <Placar
          maoJogador={game?.playerScore ?? 0}
          maoDealer={game?.dealerScore ?? 0}
          playerCards={game?.playerCards ?? []}
          dealerCards={game?.dealerCards ?? []}
        />
      </section>

      <section className="bloco-demo">
        <h3>Controles</h3>
        <label>
          Nome do jogador:
          <input
            type="text"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            disabled={!!game}
          />
        </label>
        <p>Pontos do jogador: {game?.playerScore ?? 0}</p>
        <p>Status: <strong>{statusText}</strong></p>
        {error && <p className="error-message">{error}</p>}
        <div className="blackjack-controls-container">
          {!game ? (
            <button type="button" onClick={handleStartGame} disabled={loading || !playerName.trim()}>
              🟢 Iniciar jogo
            </button>
          ) : (
            <>
              <button type="button" onClick={handleHit} disabled={loading || game.finished}>
                🎴 Comprar carta
              </button>
              <button type="button" onClick={handleStand} disabled={loading || game.finished}>
                🛑 Parar
              </button>
              <button
                type="button"
                onClick={() => setGame(null)}
                disabled={loading}
              >
                🔄 Reiniciar
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Blackjack