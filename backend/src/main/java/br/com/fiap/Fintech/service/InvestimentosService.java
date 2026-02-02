package br.com.fiap.Fintech.service;
import br.com.fiap.Fintech.model.Investimentos;
import br.com.fiap.Fintech.repository.InvestimentosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvestimentosService {

    private static final Logger logger = LoggerFactory.getLogger(InvestimentosService.class);
    @Autowired
    private InvestimentosRepository repository;
    public List<Investimentos> listarTodos() {
        return repository.findAll();
    }

    public Optional<Investimentos> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Investimentos salvar(Investimentos investimento) {
        logger.info("Recebendo investimento. Categoria: {}",
                investimento.getCategoria() != null ? investimento.getCategoria().getNomeCategoria() : "null");
        if (investimento.getValorAplicacao() == null || investimento.getValorAplicacao() <= 0) {
            throw new IllegalArgumentException("O valor do investimento deve ser maior que zero.");
        }
        if (investimento.getCategoria() == null) {
            throw new IllegalArgumentException("A categoria é obrigatória.");
        }
        return repository.save(investimento);
    }


    public Investimentos atualizar(Long id, Investimentos investimentoAtualizado) {
        return repository.findById(id)
                .map(investimento -> {
                    investimento.setNomeInvestimento(investimentoAtualizado.getNomeInvestimento());
                    investimento.setCategoria(investimentoAtualizado.getCategoria());
                    investimento.setValorAplicacao(investimentoAtualizado.getValorAplicacao());
                    investimento.setDataAplicacao(investimentoAtualizado.getDataAplicacao());
                    investimento.setUsuario(investimentoAtualizado.getUsuario());

                    return repository.save(investimento);
                })
                .orElseThrow(() -> new RuntimeException("Investimento não encontrado com o id: " + id));
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Investimento não encontrado com o id: " + id);
        }
        repository.deleteById(id);
    }
}