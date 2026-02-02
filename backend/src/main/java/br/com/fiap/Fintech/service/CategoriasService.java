package br.com.fiap.Fintech.service;

import br.com.fiap.Fintech.model.Categorias;
import br.com.fiap.Fintech.repository.CategoriasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriasService {

    @Autowired
    private CategoriasRepository repository;

    public List<Categorias> listarTodas() {
        return repository.findAll();
    }

    public Optional<Categorias> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Categorias salvar(Categorias categoria) {
        String tipo = categoria.getTipoCategoria().toUpperCase();
        if (!tipo.equals("RECEITA") && !tipo.equals("DESPESA")) {
            throw new IllegalArgumentException("Tipo da categoria deve ser 'RECEITA' ou 'DESPESA'");
        }
        categoria.setTipoCategoria(tipo);
        return repository.save(categoria);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}