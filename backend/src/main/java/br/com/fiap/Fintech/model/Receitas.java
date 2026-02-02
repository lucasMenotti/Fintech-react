package br.com.fiap.Fintech.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "RECEITAS", schema = "RM565156")
public class Receitas {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "receita_seq")
    @SequenceGenerator(name = "receita_seq", sequenceName = "SEQ_RECEITAS", allocationSize = 1)
    @Column(name = "id_receita")
    private Long id;

    @Column(name = "descricao", length = 255)
    private String descricao;

    @Column(name = "valor", nullable = false)
    private Double valor;

    @Column(name = "data_recebimento", nullable = false)
    private LocalDate dataRecebimento;

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

    public LocalDate getDataRecebimento() {
        return dataRecebimento;
    }

    public void setDataRecebimento(LocalDate dataRecebimento) {
        this.dataRecebimento = dataRecebimento;
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