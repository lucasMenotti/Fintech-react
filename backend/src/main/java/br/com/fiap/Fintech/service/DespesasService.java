package br.com.fiap.Fintech.service;

import br.com.fiap.Fintech.model.Despesas;
import br.com.fiap.Fintech.repository.DespesasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesasService {

    @Autowired
    private DespesasRepository repository;

    public List<Despesas> listarTodas() {
        return repository.findAll();
    }

    public Optional<Despesas> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Despesas salvar(Despesas despesa) {
        if (despesa.getValor() <= 0) {
            throw new IllegalArgumentException("O valor da despesa deve ser maior que zero.");
        }
        return repository.save(despesa);
    }

    public Despesas atualizar(Long id, Despesas despesaAtualizada) {
        return repository.findById(id)
                .map(despesaExistente -> {
                    despesaExistente.setDescricao(despesaAtualizada.getDescricao());
                    despesaExistente.setValor(despesaAtualizada.getValor());
                    despesaExistente.setDataGasto(despesaAtualizada.getDataGasto());
                    despesaExistente.setUsuario(despesaAtualizada.getUsuario());
                    despesaExistente.setCategoria(despesaAtualizada.getCategoria());

                    if (despesaExistente.getValor() <= 0) {
                        throw new IllegalArgumentException("O valor da despesa deve ser maior que zero.");
                    }

                    return repository.save(despesaExistente);
                })
                .orElseThrow(() -> new RuntimeException("Despesa não encontrada com o id: " + id));
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Despesa não encontrada com o id: " + id);
        }
        repository.deleteById(id);
    }
}