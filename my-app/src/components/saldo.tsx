import type { SaldoProps } from '../types/components/props.types'

function Saldo({ balance, depositAmount, onDeposit, onDepositChange }: SaldoProps) {
  return (
    <div className="saldo">
      <h2>Saldo Atual</h2>
      <p>R$ {balance.toFixed(2)}</p>
      <div className="saldo-actions">
        <input
          type="number"
          min="1"
          step="1"
          value={depositAmount}
          onChange={(event) => onDepositChange(Number(event.target.value))}
          placeholder="Valor para adicionar"
        />
        <button
          type="button"
          onClick={() => onDeposit(depositAmount)}
          disabled={depositAmount <= 0}
        >
          Adicionar saldo
        </button>
      </div>
    </div>
  )
}

export default Saldo;