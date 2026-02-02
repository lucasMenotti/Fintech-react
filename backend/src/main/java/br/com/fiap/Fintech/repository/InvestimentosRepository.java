package br.com.fiap.Fintech.repository;

import br.com.fiap.Fintech.model.Investimentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvestimentosRepository extends JpaRepository<Investimentos, Long> {}