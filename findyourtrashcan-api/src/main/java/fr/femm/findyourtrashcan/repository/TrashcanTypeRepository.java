package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.femm.findyourtrashcan.data.TrashcanType;

/**
 * Interface for DB operation on TrashcanType data
 * @author Francis Cornaire
 *
 */

public interface TrashcanTypeRepository extends JpaRepository<TrashcanType, Integer>{

}
