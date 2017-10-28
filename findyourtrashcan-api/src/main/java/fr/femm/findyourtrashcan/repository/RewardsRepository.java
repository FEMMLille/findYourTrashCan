package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.femm.findyourtrashcan.data.Rewards;

/**
 * Interface for DB operation on Rewards data
 * @author Francis Cornaire
 *
 */

public interface RewardsRepository extends JpaRepository<Rewards, Integer>{

}
