// Receita: herda de Transacao e soma ao saldo
class Receita extends Transacao {
    public Receita(String descricao, double valor) {
        super(descricao, valor); // Chama o construtor de Transacao
    }

    @Override
    public void aplicar(Saldo saldo) {
        saldo.adicionarSaldo(valorTransacao); // Adiciona ao saldo
        System.out.println("Receita adicionada: " + descricaoTransacao + " +R$" + valorTransacao);
    }
}