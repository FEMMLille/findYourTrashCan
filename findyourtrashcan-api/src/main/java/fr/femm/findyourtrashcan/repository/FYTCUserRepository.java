package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.femm.findyourtrashcan.data.FYTCUser;

/**
 * Interface for DB operation on User data
 * @author Francis Cornaire
 *
 */

public interface FYTCUserRepository extends JpaRepository<FYTCUser, Integer> {

	public FYTCUser findByUsername(String usrname);

}
