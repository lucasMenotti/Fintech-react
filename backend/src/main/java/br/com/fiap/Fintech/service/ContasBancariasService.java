package br.com.fiap.Fintech.service;

import br.com.fiap.Fintech.model.ContasBancarias;
import br.com.fiap.Fintech.repository.ContasBancariasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContasBancariasService {

    @Autowired
    private ContasBancariasRepository repository;

    public List<ContasBancarias> listarTodas() {
        return repository.findAll();
    }

    public Optional<ContasBancarias> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public ContasBancarias salvar(ContasBancarias conta) {
        if (conta.getSaldoInicial() == null) {
            conta.setSaldoInicial(0.0);
        }
        return repository.save(conta);
    }

    public ContasBancarias atualizar(Long id, ContasBancarias contaAtualizada) {
        return repository.findById(id)
                .map(contaExistente -> {
                    contaExistente.setNomeBanco(contaAtualizada.getNomeBanco());
                    contaExistente.setNumeroAgencia(contaAtualizada.getNumeroAgencia());
                    contaExistente.setNumeroConta(contaAtualizada.getNumeroConta());
                    contaExistente.setTipoConta(contaAtualizada.getTipoConta());
                    contaExistente.setSaldoInicial(contaAtualizada.getSaldoInicial());
                    contaExistente.setUsuario(contaAtualizada.getUsuario());
                    return repository.save(contaExistente);
                })
                .orElseThrow(() -> new RuntimeException("Conta não encontrada com o id: " + id));
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Conta não encontrada com o id: " + id);
        }
        repository.deleteById(id);
    }
}