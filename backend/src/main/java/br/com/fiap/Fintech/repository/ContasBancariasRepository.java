package br.com.fiap.Fintech.repository;

import br.com.fiap.Fintech.model.ContasBancarias;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContasBancariasRepository extends JpaRepository<ContasBancarias, Long> {}