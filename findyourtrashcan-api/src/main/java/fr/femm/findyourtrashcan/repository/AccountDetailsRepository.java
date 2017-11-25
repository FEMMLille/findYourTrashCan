package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.femm.findyourtrashcan.data.AccountDetails;

/**
 * Interface for DB operation on AccoutDetails data
 * @author Francis Cornaire
 *
 */

public interface AccountDetailsRepository extends JpaRepository<AccountDetails, Integer> {

	AccountDetails findByUserId(Integer id);

}
