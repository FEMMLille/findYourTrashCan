package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.femm.findyourtrashcan.data.TrashcanFavourite;

/**
 * Interface for DB operation on Trashcan data
 * @author Francis Cornaire
 *
 */

public interface TrashcanFavouriteRepository extends JpaRepository<TrashcanFavourite, Integer> {

}

