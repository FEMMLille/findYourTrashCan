package fr.femm.findyourtrashcan.service;

import fr.femm.findyourtrashcan.data.AccountDetails;

/**
 * Class for operating on user
 * @author Francis Cornaire
 *
 */

public interface AccountDetailsService {
	/**
	 * Method to get a user account details
	 * 
	 * @param id
	 *            the id of the user
	 * @return The user account details
	 */
	AccountDetails getAccountDetails(final Integer id);
	
	/**
	 * Method to create a user with his account details
	 * 
	 * @param accountDetails
	 *            The account details
	 * @return The created account dtails + user
	 */
	public AccountDetails createUser(AccountDetails accountDetails);
}
