
public class AlertaReceita extends Alertas {

    private double valorReceita;

    public AlertaReceita(double valorReceita) {
        super("Nova receita recebida: ");
        this.valorReceita = valorReceita;
    }

    @Override
    public void exibirAlertas() {
        System.out.println("ALERTA! --> " + getMensagem() + "+R$" + valorReceita);

    }
}
