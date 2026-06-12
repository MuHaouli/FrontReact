export type ExemploPropsProps = {
  mensagem: string
}

export type PlacarMesaProps = {
  maoJogador: number
  maoDealer: number
  playerCards: string[]
  dealerCards: string[]
}

export type MaoProps = {
  cards: string[]
}

export type SaldoProps = {
  balance: number
  depositAmount: number
  onDeposit: (amount: number) => void
  onDepositChange: (amount: number) => void
}
