// Despesa: herda de Transacao e subtrai do saldo
class Despesa extends Transacao {
    public Despesa(String descricao, double valor) {
        super(descricao, valor); // Chama o construtor de Transacao
    }

    @Override
    public void aplicar(Saldo saldo) {
        saldo.sacarSaldo(valorTransacao); // Retira do saldo
        System.out.println("Despesa registrada: " + descricaoTransacao + " -R$" + valorTransacao);
    }
}