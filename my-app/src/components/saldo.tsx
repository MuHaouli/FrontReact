function Saldo(){
    const dinheiro = 1500.00;
    return (
        <div className="saldo">
            <h2>Saldo Atual</h2>
            <p>R$ {dinheiro}</p>
        </div>
    );  
}
export default Saldo;