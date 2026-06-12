import { useState } from 'react'
import axios, { isAxiosError } from 'axios'
import type { AxiosError } from 'axios'
import '../App.css'
import '../index.css'
import HeaderPersonalizado from '../components/headerPersonalizado'
import Placar from '../components/placar'
import Saldo from '../components/saldo'
import { startBlackjackGame, hitBlackjackGame, standBlackjackGame } from '../services/api'
import type { GameState } from '../services/api'

function Blackjack() {
  const [game, setGame] = useState<GameState | null>(null)
  const [playerName, setPlayerName] = useState('Jogador')
  const [balance, setBalance] = useState(1500)
  const [depositAmount, setDepositAmount] = useState(0)
  const [betAmount, setBetAmount] = useState(100)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleDeposit() {
    if (depositAmount <= 0) {
      setError('Digite um valor válido para adicionar.')
      return
    }
    setBalance((current) => current + depositAmount)
    setDepositAmount(0)
    setError('')
  }

  function reconcileBalance(gameState: GameState) {
    if (gameState.balance != null) {
      setBalance(gameState.balance)
      return
    }

    if (!gameState.finished || !gameState.result) {
      return
    }

    if (gameState.result === 'PLAYER_WIN') {
      setBalance((current) => current + gameState.betAmount * 2)
    } else if (gameState.result === 'DRAW') {
      setBalance((current) => current + gameState.betAmount)
    }
  }

  async function handleStartGame() {
    if (betAmount <= 0) {
      setError('Aposta deve ser maior que zero.')
      return
    }

    if (betAmount > balance) {
      setError('Saldo insuficiente para essa aposta.')
      return
    }

    setError('')
    setLoading(true)
    try {
      const newGame = await startBlackjackGame(playerName || 'Jogador', betAmount)
      setGame(newGame)

      if (newGame.balance != null) {
        setBalance(newGame.balance)
      } else {
        setBalance((current) => current - betAmount)
      }
    } catch (err) {
      console.error('Falha ao iniciar jogo:', err)
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError
        const backendMessage = (axiosError.response?.data as { message?: string } | undefined)?.message || axiosError.response?.statusText
        setError(`Não foi possível iniciar o jogo: ${backendMessage ?? axiosError.message}`)
      } else if (err instanceof Error) {
        setError(`Não foi possível iniciar o jogo: ${err.message}`)
      } else {
        setError('Não foi possível iniciar o jogo. Verifique o backend.')
      }
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
      reconcileBalance(updatedGame)
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
      reconcileBalance(updatedGame)
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
        <Saldo
          balance={balance}
          depositAmount={depositAmount}
          onDeposit={handleDeposit}
          onDepositChange={setDepositAmount}
        />
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
        <label>
          Valor da aposta:
          <input
            type="number"
            min="1"
            step="1"
            value={betAmount}
            onChange={(event) => setBetAmount(Number(event.target.value))}
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