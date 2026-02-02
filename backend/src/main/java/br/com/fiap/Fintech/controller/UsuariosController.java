package br.com.fiap.Fintech.controller;

import br.com.fiap.Fintech.model.Usuarios;
import br.com.fiap.Fintech.model.LoginRequest;
import br.com.fiap.Fintech.service.UsuariosService;
import br.com.fiap.Fintech.service.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuariosController {

    @Autowired
    private UsuariosService service;

    @GetMapping
    public ResponseEntity<List<Usuarios>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuarios> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(usuario -> ResponseEntity.ok(usuario))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Usuarios> salvar(@RequestBody Usuarios usuario) {
        try {
            Usuarios novoUsuario = service.salvar(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (IllegalArgumentException e) {
            // MELHORIA: Retornar uma mensagem de erro mais útil (opcional)
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuarios> atualizar(@PathVariable Long id, @RequestBody Usuarios usuario) {
        try {
            Usuarios usuarioAtualizado = service.atualizar(id, usuario);
            return ResponseEntity.ok(usuarioAtualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest credenciais) {
        String email = credenciais.getEmail();
        String senha = credenciais.getSenha();

        if (email == null || email.trim().isEmpty()) {

            return ResponseEntity.badRequest().body(Map.of("erro", "O campo de email é obrigatório."));
        }

        if (senha == null || senha.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "O campo de senha é obrigatório."));
        }

        return service.autenticar(email, senha)
                .map(usuarioLogado -> ResponseEntity.ok(usuarioLogado))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}