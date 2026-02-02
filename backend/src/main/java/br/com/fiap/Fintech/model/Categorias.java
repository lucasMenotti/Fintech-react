package br.com.fiap.Fintech.model;

import jakarta.persistence.*;

@Entity
@Table(name = "CATEGORIAS", schema = "RM565156")
public class Categorias {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categoria_seq")
    @SequenceGenerator(name = "categoria_seq", sequenceName = "SEQ_CATEGORIAS", allocationSize = 1)
    @Column(name = "ID_CATEGORIA")
    private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    private String nomeCategoria;


    @Column(name = "tipo", length = 50, nullable = false)
    private String tipoCategoria;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCategoria() {
        return nomeCategoria;
    }

    public void setNomeCategoria(String nomeCategoria) {
        this.nomeCategoria = nomeCategoria;
    }

    public String getTipoCategoria() {
        return tipoCategoria;
    }

    public void setTipoCategoria(String tipoCategoria) {
        this.tipoCategoria = tipoCategoria;
    }
}