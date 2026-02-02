package br.com.fiap.Fintech.repository;

import br.com.fiap.Fintech.model.Despesas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DespesasRepository extends JpaRepository<Despesas, Long> {}