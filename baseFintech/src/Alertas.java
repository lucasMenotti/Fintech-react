
public abstract class Alertas {
    String mensagem;

    public Alertas(String mensagem ) {
        this.mensagem = mensagem;

    }

    public String getMensagem() {
        return mensagem;
    }


    public abstract void exibirAlertas();
}
