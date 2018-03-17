package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.femm.findyourtrashcan.data.Location;

/**
 * Interface for DB operation on Grade data
 * @author Francis Cornaire
 *
 */

public interface LocationRepository extends JpaRepository<Location, Integer>{
    
    @Query("SELECT l from Location l "
    	+ "WHERE l.code = :code")
    public Location findByCode(@Param("code")Integer code);
}
