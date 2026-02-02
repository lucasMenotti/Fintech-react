package br.com.fiap.Fintech.controller;

import br.com.fiap.Fintech.model.ContasBancarias;
import br.com.fiap.Fintech.service.ContasBancariasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contas")
@CrossOrigin(origins = "*")
public class ContasBancariasController {

    @Autowired
    private ContasBancariasService service;

    @GetMapping
    public ResponseEntity<List<ContasBancarias>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContasBancarias> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ContasBancarias> salvar(@RequestBody ContasBancarias conta) {
        ContasBancarias novaConta = service.salvar(conta);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaConta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContasBancarias> atualizar(@PathVariable Long id, @RequestBody ContasBancarias conta) {
        try {
            ContasBancarias contaAtualizada = service.atualizar(id, conta);
            return ResponseEntity.ok(contaAtualizada);
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