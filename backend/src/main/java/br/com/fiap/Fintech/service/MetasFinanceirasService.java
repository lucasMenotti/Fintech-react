package br.com.fiap.Fintech.service;

import br.com.fiap.Fintech.model.MetasFinanceiras;
import br.com.fiap.Fintech.repository.MetasFinanceirasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MetasFinanceirasService {

    @Autowired
    private MetasFinanceirasRepository repository;

    public List<MetasFinanceiras> listarTodas() {
        return repository.findAll();
    }

    public Optional<MetasFinanceiras> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public List<MetasFinanceiras> listarPorUsuario(Long idUsuario) {
        return repository.findByUsuarioId(idUsuario);
    }

    public MetasFinanceiras salvar(MetasFinanceiras meta) {
        if (meta.getValorAtual() == null) {
            meta.setValorAtual(0.0);
        }
        return repository.save(meta);
    }

    public MetasFinanceiras atualizar(Long id, MetasFinanceiras metaAtualizada) {
        return repository.findById(id).map(meta -> {
            if (metaAtualizada.getNomeMeta() != null)
                meta.setNomeMeta(metaAtualizada.getNomeMeta());

            if (metaAtualizada.getValorAlvo() != null)
                meta.setValorAlvo(metaAtualizada.getValorAlvo());

            if (metaAtualizada.getValorAtual() != null)
                meta.setValorAtual(metaAtualizada.getValorAtual());

            if (metaAtualizada.getDataAlvo() != null)
                meta.setDataAlvo(metaAtualizada.getDataAlvo());

            if (metaAtualizada.getUsuario() != null)
                meta.setUsuario(metaAtualizada.getUsuario());

            return repository.save(meta);
        }).orElseThrow(() -> new RuntimeException("Meta não encontrada"));
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
