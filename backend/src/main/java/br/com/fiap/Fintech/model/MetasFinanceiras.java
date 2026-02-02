package br.com.fiap.Fintech.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "METAS_FINANCEIRAS", schema = "RM565156")
public class MetasFinanceiras {

    public MetasFinanceiras() {
        this.valorAtual = 0.0;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "meta_seq")
    @SequenceGenerator(name = "meta_seq", sequenceName = "SEQ_METAS_FINANCEIRAS", allocationSize = 1)
    @Column(name = "id_meta")
    private Long id;

    @JsonProperty("nomeMeta")
    @Column(name = "nome", length = 100, nullable = false)
    private String nomeMeta;

    @JsonProperty("valorAlvo")
    @Column(name = "valor_alvo", nullable = false)
    private Double valorAlvo;

    @JsonProperty("dataAlvo")
    @Column(name = "data_alvo", nullable = false)
    private LocalDate dataAlvo;

    @JsonProperty("valorAtual")
    @Column(name = "valor_atual")
    private Double valorAtual = 0.0;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    @JsonProperty("usuario")
    private Usuarios usuario;

    public MetasFinanceiras(Long id, String nomeMeta, Double valorAlvo,
                            Double valorAtual, LocalDate dataAlvo, Usuarios usuario) {
        this.id = id;
        this.nomeMeta = nomeMeta;
        this.valorAlvo = valorAlvo;
        this.valorAtual = valorAtual != null ? valorAtual : 0.0;
        this.dataAlvo = dataAlvo;
        this.usuario = usuario;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNomeMeta() { return nomeMeta; }
    public void setNomeMeta(String nomeMeta) { this.nomeMeta = nomeMeta; }

    public Double getValorAlvo() { return valorAlvo; }
    public void setValorAlvo(Double valorAlvo) { this.valorAlvo = valorAlvo; }

    public LocalDate getDataAlvo() { return dataAlvo; }
    public void setDataAlvo(LocalDate dataAlvo) { this.dataAlvo = dataAlvo; }

    public Double getValorAtual() { return valorAtual; }
    public void setValorAtual(Double valorAtual) { this.valorAtual = valorAtual; }

    public Usuarios getUsuario() { return usuario; }
    public void setUsuario(Usuarios usuario) { this.usuario = usuario; }
}
