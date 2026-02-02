package br.com.fiap.Fintech.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.fiap.Fintech.model.MetasFinanceiras;
import br.com.fiap.Fintech.service.MetasFinanceirasService;
import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*")
public class MetasFinanceirasController {

    @Autowired
    private MetasFinanceirasService service;

    @GetMapping
    public List<MetasFinanceiras> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<MetasFinanceiras> listarPorUsuario(@PathVariable Long idUsuario) {
        return service.listarPorUsuario(idUsuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetasFinanceiras> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MetasFinanceiras> salvar(@RequestBody MetasFinanceiras meta) {
        MetasFinanceiras saved = service.salvar(meta);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetasFinanceiras> atualizar(@PathVariable Long id, @RequestBody MetasFinanceiras meta) {
        MetasFinanceiras updated = service.atualizar(id, meta);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
