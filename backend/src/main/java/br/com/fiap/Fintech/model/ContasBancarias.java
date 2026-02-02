package br.com.fiap.Fintech.model;

import jakarta.persistence.*;

@Entity
@Table(name = "CONTAS_BANCARIAS", schema = "RM565156")
public class ContasBancarias {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "conta_seq")
    @SequenceGenerator(name = "conta_seq", sequenceName = "SEQ_CONTA", allocationSize = 1)
    @Column(name = "ID_CONTA")
    private Long id;

    @Column(name = "nome_banco", length = 50, nullable = false)
    private String nomeBanco;

    @Column(name = "numero_agencia", length = 10, nullable = false)
    private String numeroAgencia;

    @Column(name = "numero_conta", length = 20, nullable = false)
    private String numeroConta;

    @Column(name = "tipo_conta", length = 15, nullable = false)
    private String tipoConta;

    @Column(name = "saldo_inicial")
    private Double saldoInicial = 0.0;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuarios usuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeBanco() {
        return nomeBanco;
    }

    public void setNomeBanco(String nomeBanco) {
        this.nomeBanco = nomeBanco;
    }

    public String getNumeroAgencia() {
        return numeroAgencia;
    }

    public void setNumeroAgencia(String numeroAgencia) {
        this.numeroAgencia = numeroAgencia;
    }

    public String getNumeroConta() {
        return numeroConta;
    }

    public void setNumeroConta(String numeroConta) {
        this.numeroConta = numeroConta;
    }

    public String getTipoConta() {
        return tipoConta;
    }

    public void setTipoConta(String tipoConta) {
        this.tipoConta = tipoConta;
    }

    public Double getSaldoInicial() {
        return saldoInicial;
    }

    public void setSaldoInicial(Double saldoInicial) {
        this.saldoInicial = saldoInicial;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }
}