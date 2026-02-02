package br.com.fiap.Fintech.service;

import br.com.fiap.Fintech.model.Categorias;
import br.com.fiap.Fintech.model.Receitas;
import br.com.fiap.Fintech.repository.CategoriasRepository;
import br.com.fiap.Fintech.repository.ReceitasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReceitasService {

    @Autowired
    private ReceitasRepository receitasRepository;

    @Autowired
    private CategoriasRepository categoriasRepository;

    public List<Receitas> listarTodas() {
        return receitasRepository.findAll();
    }

    public Optional<Receitas> buscarPorId(Long id) {
        return receitasRepository.findById(id);
    }

    @Transactional
    public Receitas salvar(Receitas receita) {
        if (receita.getCategoria() != null && receita.getCategoria().getId() != null) {
            Categorias categoriaPersistida = categoriasRepository.findById(receita.getCategoria().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));
            receita.setCategoria(categoriaPersistida);
        } else {
            throw new IllegalArgumentException("Categoria obrigatória");
        }

        return receitasRepository.save(receita);
    }

    @Transactional
    public Receitas atualizar(Long id, Receitas receita) {
        Receitas receitaExistente = receitasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada"));

        receitaExistente.setDescricao(receita.getDescricao());
        receitaExistente.setValor(receita.getValor());
        receitaExistente.setDataRecebimento(receita.getDataRecebimento());

        // Atualizar categoria
        if (receita.getCategoria() != null && receita.getCategoria().getId() != null) {
            Categorias categoriaPersistida = categoriasRepository.findById(receita.getCategoria().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));
            receitaExistente.setCategoria(categoriaPersistida);
        }

        return receitasRepository.save(receitaExistente);
    }

    public void deletar(Long id) {
        receitasRepository.deleteById(id);
    }
}
