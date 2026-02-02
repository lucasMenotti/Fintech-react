package br.com.fiap.Fintech.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "USUARIOS", schema = "RM565156")
public class Usuarios {
    public Usuarios() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuarios_seq")
    @SequenceGenerator(name = "usuarios_seq", sequenceName = "SEQ_USUARIOS", allocationSize = 1)
    @Column(name = "ID_USUARIO")
    private Long id_usuario;

    @Column(name = "NOME")
    private String nome;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "SENHA")
    private String senha;

    @Column(name = "DATA_NASCIMENTO")
    private LocalDate dataNascimento;

    @Column(name = "DATA_CADASTRO")
    private LocalDate dataCadastro = LocalDate.now();

    public Long getId() { return id_usuario; }
    public void setId(Long id_usuario) { this.id_usuario = id_usuario; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }

    public LocalDate getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDate dataCadastro) { this.dataCadastro = dataCadastro; }
}

