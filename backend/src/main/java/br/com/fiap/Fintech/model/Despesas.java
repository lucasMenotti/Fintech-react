package br.com.fiap.Fintech.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "DESPESAS", schema = "RM565156")
public class Despesas {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "despesa_seq")
    @SequenceGenerator(name = "despesa_seq", sequenceName = "SEQ_DESPESAS", allocationSize = 1)
    @Column(name = "id_despesa")
    private Long id;

    @Column(name = "descricao", length = 255)
    private String descricao;

    @Column(name = "valor", nullable = false)
    private Double valor;

    @Column(name = "data_gasto", nullable = false)
    private LocalDate dataGasto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuarios usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_CATEGORIA", nullable = false)
    private Categorias categoria;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public LocalDate getDataGasto() {
        return dataGasto;
    }

    public void setDataGasto(LocalDate dataGasto) {
        this.dataGasto = dataGasto;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    public Categorias getCategoria() {
        return categoria;
    }

    public void setCategoria(Categorias categoria) {
        this.categoria = categoria;
    }
}