// Classe para representar investimentos
class Investimento {
    private String tipoInvestimento;
    private String descricao;
    private double valor;

    public Investimento(String tipoInvestimento, String descricao, double valor) {
        this.tipoInvestimento = tipoInvestimento;
        this.descricao = descricao;
        this.valor = valor;
    }

    // Altera a descrição
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    // Altera o valor
    public void setValor(double valor) {
        this.valor = valor;
    }

    @Override
    public String toString() {
        return tipoInvestimento + " - " + descricao + " - R$" + valor;
    }
}