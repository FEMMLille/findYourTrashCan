package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.data.Rang;

/**
 * Interface for DB operation on Rang data
 * @author Francis Cornaire
 *
 */

public interface RangRepository extends JpaRepository<Rang, Integer> {
    
    Rang findById(Integer id);
    @Query("SELECT r FROM Rang r "
    	+ "WHERE r.user.id = :id")
    Rang findByUserId(@Param("id") Integer id); 
    


}
