package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.femm.findyourtrashcan.data.GarbageType;

/**
 * Interface for DB operation on GarbageType data
 * @author Francis Cornaire
 *
 */

public interface GarbageTypeRepository extends JpaRepository<GarbageType, Integer>{

}
