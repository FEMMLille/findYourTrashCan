package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.femm.findyourtrashcan.data.Flags;

/**
 * Interface for DB operation on Flags data
 * @author Francis Cornaire
 *
 */

public interface FlagsRepository extends JpaRepository<Flags, Integer>{

}
