package br.com.fiap.Fintech.controller;

import org.springframework.web.bind.annotation.*;

import br.com.fiap.Fintech.model.LoginRequest;
import br.com.fiap.Fintech.model.Usuarios;
import br.com.fiap.Fintech.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UsuariosRepository usuarioRepository;

    @PostMapping("/login")
    public Usuarios login(@RequestBody LoginRequest loginRequest) {
        Usuarios usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Email não encontrado"));
        if (!usuario.getSenha().equals(loginRequest.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        return usuario;
    }
}