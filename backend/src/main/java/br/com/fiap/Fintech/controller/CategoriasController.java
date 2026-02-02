package br.com.fiap.Fintech.controller;

import br.com.fiap.Fintech.model.Categorias;
import br.com.fiap.Fintech.service.CategoriasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriasController {

    @Autowired
    private CategoriasService service;

    @GetMapping
    public ResponseEntity<List<Categorias>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @PostMapping
    public ResponseEntity<Categorias> salvar(@RequestBody Categorias categoria) {
        try {
            Categorias novaCategoria = service.salvar(categoria);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}