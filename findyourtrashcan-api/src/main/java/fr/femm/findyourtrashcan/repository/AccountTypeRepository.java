package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.femm.findyourtrashcan.data.AccountType;

/**
 * Interface for DB operation on AccountType data
 * @author Francis Cornaire
 *
 */

public interface AccountTypeRepository extends JpaRepository<AccountType, Integer>{

}
