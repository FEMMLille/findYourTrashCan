package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.femm.findyourtrashcan.data.RangType;

/**
 * Interface for DB operation on RangType data
 * @author Francis Cornaire
 *
 */

public interface RangTypeRepository extends JpaRepository<RangType, Integer> {

    RangType findById(Integer id);

}
