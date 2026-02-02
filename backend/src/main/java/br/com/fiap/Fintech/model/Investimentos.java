package br.com.fiap.Fintech.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "INVESTIMENTOS", schema = "RM565156")
public class Investimentos {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "investimento_seq")
    @SequenceGenerator(name = "investimento_seq", sequenceName = "SEQ_INVESTIMENTOS", allocationSize = 1)
    @Column(name = "id_investimento")
    private Long id;

    @JsonProperty("descricao")
    @Column(name = "nome", length = 100, nullable = false)
    private String nomeInvestimento;


    @JsonProperty("tipoInvestimento")
    @Column(name = "tipo", length = 50, nullable = false)
    private String tipo;

    @JsonProperty("valor")
    @Column(name = "valor_aplicado", nullable = false)
    private Double valorAplicacao;

    @JsonProperty("dataInvestimento")
    @Column(name = "data_aplicacao", nullable = false)
    private LocalDate dataAplicacao;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuarios usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categorias categoria;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeInvestimento() {
        return nomeInvestimento;
    }

    public void setNomeInvestimento(String nomeInvestimento) {
        this.nomeInvestimento = nomeInvestimento;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Categorias getCategoria() {
        return categoria;
    }

    public void setCategoria(Categorias categoria) {
        this.categoria = categoria;
    }

    public Double getValorAplicacao() {
        return valorAplicacao;
    }

    public void setValorAplicacao(Double valorAplicacao) {
        this.valorAplicacao = valorAplicacao;
    }

    public LocalDate getDataAplicacao() {
        return dataAplicacao;
    }

    public void setDataAplicacao(LocalDate dataAplicacao) {
        this.dataAplicacao = dataAplicacao;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }
}