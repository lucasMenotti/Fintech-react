package br.com.fiap.Fintech.repository;

import br.com.fiap.Fintech.model.Receitas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceitasRepository extends JpaRepository<Receitas, Long> {}