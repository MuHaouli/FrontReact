import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export type GameState = {
  gameId: string;
  playerName: string;
  playerCards: string[];
  dealerCards: string[];
  playerScore: number;
  dealerScore: number;
  betAmount: number;
  balance?: number;
  finished: boolean;
  result?: string;
};

export async function startBlackjackGame(playerName: string, betAmount: number) {
  const response = await api.post<GameState>('/api/blackjack/start', { playerName, betAmount });
  return response.data;
}

export async function getBlackjackState(gameId: string) {
  const response = await api.get<GameState>(`/api/blackjack/${gameId}`);
  return response.data;
}

export async function hitBlackjackGame(gameId: string) {
  const response = await api.post<GameState>(`/api/blackjack/${gameId}/hit`);
  return response.data;
}

export async function standBlackjackGame(gameId: string) {
  const response = await api.post<GameState>(`/api/blackjack/${gameId}/stand`);
  return response.data;
}

export default api;
