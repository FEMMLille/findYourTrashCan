package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.femm.findyourtrashcan.data.Trashcan;

/**
 * Interface for DB operation on Trashcan data
 * @author Francis Cornaire
 *
 */

public interface TrashcanRepository extends JpaRepository<Trashcan, Integer>{

}
