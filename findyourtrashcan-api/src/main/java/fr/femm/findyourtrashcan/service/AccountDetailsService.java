package fr.femm.findyourtrashcan.service;

import fr.femm.findyourtrashcan.data.AccountDetails;

/**
 * Class for operating on user
 */

public interface AccountDetailsService {
	/**
	 * Method to get a user account details
	 * 
	 * @param id
	 *            the id of the user
	 * @return The user account details
	 */
	AccountDetails getByUser(final Integer id);
	
	/**
	 * Method to create a user with his account details
	 * 
	 * @param accountDetails
	 *            The account details [user]
	 * @return The created account dtails + user
	 */
	public AccountDetails create(AccountDetails accountDetails);

}
