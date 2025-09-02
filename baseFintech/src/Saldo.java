// Classe para representar o saldo geral
class Saldo {
    private double valorSaldo;

    public Saldo(double valorSaldo){
        this.valorSaldo = valorSaldo; // Inicializa com o valor informado
    }

    public void setSaldo(double valor){
        this.valorSaldo = valor; // define novo saldo
    }

    // Retira valor do saldo
    public void sacarSaldo(double valor){
        if (valor > 0 && valor <= valorSaldo) {
            valorSaldo -= valor;
            System.out.println("Saque realizado com sucesso!");
        } else {
            System.out.println("Valor inválido ou saldo insuficiente!");
        }
    }

    // Adiciona valor ao saldo
    public void adicionarSaldo(double valor){
        valorSaldo += valor;
        System.out.println("Saldo atualizado: R$" + valorSaldo);
    }

    public double getSaldo(){
        return valorSaldo; // Devolve o saldo atual
    }

    public void exibirSaldo(){
        System.out.println("Saldo atual: R$" + valorSaldo);
    }
}

