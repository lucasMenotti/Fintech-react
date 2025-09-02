// Classe que representa metas financeiras
class Meta {
    private String descricaoMeta;
    private double valorObjetivo;
    private double valorAtual;

    // Construtor que inicializa os atributos
    public Meta(String descricao, double valorObjetivo, double valorAtual){
        this.descricaoMeta = descricao;
        this.valorObjetivo = valorObjetivo;
        this.valorAtual = valorAtual;
    }

    // Atualiza o valor acumulado (positivo adiciona, negativo retira)
    public void adicionarValor(double valor) {
        if (valorAtual + valor < 0) {
            System.out.println("Operação inválida! O valor atual não pode ser negativo.");
        } else {
            valorAtual += valor;
            System.out.println("Meta atualizada! Valor atual: R$ " + valorAtual);
        }
    }

    // Calcula quanto ainda falta para atingir a meta
    public double calcularRestante() {
        return valorObjetivo - valorAtual;
    }

    // Calcula a porcentagem de progresso (0% até 100%)
    public double calcularProgresso() {
        if (valorObjetivo == 0)
            return 0;
        double progresso = (valorAtual / valorObjetivo) * 100;
        // Garante que fique entre 0 e 100
        return Math.min(Math.max(progresso, 0), 100);
    }
    public boolean estaConcluida() {
        return valorAtual >= valorObjetivo;
    }


    // Mostra informações completas da meta
    public void exibirMeta() {
        System.out.println("Meta: " + descricaoMeta);
        System.out.println("Objetivo: R$ " + valorObjetivo);
        System.out.println("Atual: R$ " + valorAtual);
        System.out.println("Progresso: " + calcularProgresso() + "%");
        System.out.println("Falta: R$ " + calcularRestante());
    }
}