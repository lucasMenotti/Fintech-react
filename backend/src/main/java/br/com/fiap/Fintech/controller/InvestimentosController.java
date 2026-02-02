package br.com.fiap.Fintech.controller;

import br.com.fiap.Fintech.model.Investimentos;
import br.com.fiap.Fintech.service.InvestimentosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investimentos")
@CrossOrigin(origins = "*")
public class InvestimentosController {

    @Autowired
    private InvestimentosService service;

    @GetMapping
    public ResponseEntity<List<Investimentos>> listarTodos() {
        List<Investimentos> investimentos = service.listarTodos();
        return ResponseEntity.ok(investimentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Investimentos> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(investimento -> ResponseEntity.ok(investimento))
                .orElse(ResponseEntity.notFound().build());
    }



    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Investimentos investimento) { // Mudança para tipo curinga (?)
        try {
            Investimentos novoInvestimento = service.salvar(investimento);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoInvestimento);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Investimentos> atualizar(@PathVariable Long id, @RequestBody Investimentos investimento) {
        try {
            Investimentos investimentoAtualizado = service.atualizar(id, investimento);
            return ResponseEntity.ok(investimentoAtualizado);
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