// Classe abstrata que generaliza Receita e Despesa
abstract class Transacao {
    // Atributos comuns a qualquer transação
    protected String descricaoTransacao;
    protected double valorTransacao;

    // Construtor define descrição e valor
    public Transacao(String descricao, double valor){
        this.descricaoTransacao = descricao;
        this.valorTransacao = valor;
    }

    // Metodo abstrato: cada subclasse define como aplica no saldo
    public abstract void aplicar(Saldo saldo);

    @Override
    public String toString() {
        return descricaoTransacao + " - R$" + valorTransacao;
    }
}