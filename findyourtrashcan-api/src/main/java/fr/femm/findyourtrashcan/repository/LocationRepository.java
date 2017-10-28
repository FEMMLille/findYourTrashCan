package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.femm.findyourtrashcan.data.Location;

/**
 * Interface for DB operation on Grade data
 * @author Francis Cornaire
 *
 */

public interface LocationRepository extends JpaRepository<Location, Integer>{

}
