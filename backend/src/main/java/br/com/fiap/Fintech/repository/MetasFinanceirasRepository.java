package br.com.fiap.Fintech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.fiap.Fintech.model.MetasFinanceiras;
import java.util.List;

public interface MetasFinanceirasRepository extends JpaRepository<MetasFinanceiras, Long> {
    List<MetasFinanceiras> findByUsuarioId(Long idUsuario);
}
