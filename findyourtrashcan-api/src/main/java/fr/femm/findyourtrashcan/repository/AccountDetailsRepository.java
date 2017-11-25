package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.femm.findyourtrashcan.data.AccountDetails;

/**
 * Interface for DB operation on AccoutDetails data
 */

public interface AccountDetailsRepository extends JpaRepository<AccountDetails, Integer> {

	/**
	 * Finds account details by the user id
	 * 
	 * @param id
	 *            Id of the user we want account details
	 * @return The account details
	 */
	AccountDetails findByUserId(Integer id);

}
