

public class AlertaSaldo extends Alertas {
    private double saldoAtual;
    private double limiteMinimo;

    public AlertaSaldo(double saldoAtual, double limiteMinimo) {
        super("Atenção! Saldo baixo: ");
        this.saldoAtual = saldoAtual;
        this.limiteMinimo = limiteMinimo;
    }

    @Override
    public void exibirAlertas() {
        System.out.println("ALERTA! --> " + getMensagem() + "R$" + saldoAtual);
    }

    public boolean precisaAlertar() {
        return saldoAtual < limiteMinimo;
    }

}