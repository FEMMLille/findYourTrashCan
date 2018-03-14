package fr.femm.findyourtrashcan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.femm.findyourtrashcan.data.Rewards;

/**
 * Interface for DB operation on Rewards data
 * @author Francis Cornaire
 *
 */

public interface RewardsRepository extends JpaRepository<Rewards, Integer>{
    @Query("SELECT r FROM Rewards r "
    	+ "WHERE rang_type_id = :id")
    List<Rewards> findByRankTypeId(@Param("id") Integer id);
}
