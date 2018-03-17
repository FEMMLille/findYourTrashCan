package fr.femm.findyourtrashcan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.femm.findyourtrashcan.data.GarbageType;
import fr.femm.findyourtrashcan.data.Trashcan;
import fr.femm.findyourtrashcan.data.TrashcanType;

/**
 * Interface for DB operation on Trashcan data
 * @author Francis Cornaire
 *
 */

public interface TrashcanRepository extends JpaRepository<Trashcan, Integer> {

    @Query("SELECT t FROM Trashcan t "
	    	+ "WHERE t.lat BETWEEN :swLat AND :neLat "
	    	+ "OR t.lon BETWEEN :swLon AND :neLon ")
    public List<Trashcan> findInBounds(
	    @Param("neLat") float neLat, 
	    @Param("neLon") float neLon, 
	    @Param("swLat") float swLat, 
	    @Param("swLon") float swLon);
    
    public List<Trashcan> findByTrashcanTypeAndGarbageType(TrashcanType trashcanType, GarbageType garbageType);
}

