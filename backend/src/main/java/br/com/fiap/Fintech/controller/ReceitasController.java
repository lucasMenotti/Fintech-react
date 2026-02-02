package br.com.fiap.Fintech.controller;

import br.com.fiap.Fintech.model.Receitas;
import br.com.fiap.Fintech.service.ReceitasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receitas")
@CrossOrigin(origins = "*")
public class ReceitasController {

    @Autowired
    private ReceitasService service;

    @GetMapping
    public ResponseEntity<List<Receitas>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receitas> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Receitas> salvar(@RequestBody Receitas receita) {
        try {
            Receitas novaReceita = service.salvar(receita);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaReceita);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Receitas> atualizar(@PathVariable Long id, @RequestBody Receitas receita) {
        try {
            Receitas receitaAtualizada = service.atualizar(id, receita);
            return ResponseEntity.ok(receitaAtualizada);
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
}