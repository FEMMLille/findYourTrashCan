package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.femm.findyourtrashcan.data.Rang;

/**
 * Interface for DB operation on Rang data
 * @author Francis Cornaire
 *
 */

public interface RangRepository extends JpaRepository<Rang, Integer> {

}
