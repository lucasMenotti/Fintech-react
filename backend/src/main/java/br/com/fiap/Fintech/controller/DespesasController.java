package br.com.fiap.Fintech.controller;

import br.com.fiap.Fintech.model.Despesas;
import br.com.fiap.Fintech.service.DespesasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/despesas")
@CrossOrigin(origins = "*")
public class DespesasController {

    @Autowired
    private DespesasService service;

    @GetMapping
    public ResponseEntity<List<Despesas>> listarTodas() {
        List<Despesas> despesas = service.listarTodas();
        return ResponseEntity.ok(despesas); // 200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<Despesas> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(despesa -> ResponseEntity.ok(despesa))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Despesas> salvar(@RequestBody Despesas despesa) {
        try {
            Despesas novaDespesa = service.salvar(despesa);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaDespesa);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Despesas> atualizar(@PathVariable Long id, @RequestBody Despesas despesa) {
        try {
            Despesas despesaAtualizada = service.atualizar(id, despesa);
            return ResponseEntity.ok(despesaAtualizada);
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