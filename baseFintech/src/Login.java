public class Login {
    private String usuario;
    private String senha;


    public Login(String senha, String usuario) {
        this.usuario = usuario;
        this.senha = senha;
    }

    public void doLogin() {
        System.out.println("Realizando login para o usuário: " + usuario);
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        if (usuario != null && !usuario.isBlank()) {
            this.usuario = usuario;
        }
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        if (senha != null && !senha.isBlank()) {
            this.senha = senha;
        }
    }

    public boolean doLogin(String usuarioDigitado, String senhaDigitada) {
        if (this.usuario.equals(usuarioDigitado) && this.senha.equals(senhaDigitada)) {
            System.out.println("Login realizado com sucesso!");
            return true;
        } else {
            System.out.println("Usuário ou senha incorretos!");
            return false;
        }
    }

}
