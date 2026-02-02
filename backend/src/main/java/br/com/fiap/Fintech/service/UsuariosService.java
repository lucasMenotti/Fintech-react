package br.com.fiap.Fintech.service;

import br.com.fiap.Fintech.model.Usuarios;
import br.com.fiap.Fintech.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuariosService {

    @Autowired
    private UsuariosRepository repository;

    public List<Usuarios> listarTodos() {
        return repository.findAll();
    }

    public Optional<Usuarios> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Usuarios salvar(Usuarios usuario) {
        if (usuario.getEmail() == null || !usuario.getEmail().contains("@")) {
            throw new IllegalArgumentException("Email inválido.");
        }
        if (usuario.getSenha() == null || usuario.getSenha().length() < 6) {
            throw new IllegalArgumentException("A senha deve ter no mínimo 6 caracteres.");
        }
        return repository.save(usuario);
    }


    public Optional<Usuarios> autenticar(String email, String senha) {
        // Busca o usuário pelo email
        return repository.findByEmail(email)
                .filter(usuario -> usuario.getSenha().equals(senha));
    }

    public Usuarios atualizar(Long id, Usuarios usuarioAtualizado) {
        return repository.findById(id)
                .map(usuarioExistente -> {
                    usuarioExistente.setNome(usuarioAtualizado.getNome());
                    usuarioExistente.setEmail(usuarioAtualizado.getEmail());
                    return repository.save(usuarioExistente);
                })
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + id));
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado com o id: " + id);
        }
        repository.deleteById(id);
    }
}