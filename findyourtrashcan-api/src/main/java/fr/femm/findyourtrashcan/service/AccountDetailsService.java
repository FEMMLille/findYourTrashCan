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
	AccountDetails create(final AccountDetails accountDetails);

	/**
	 * Gets a user by its username
	 * @param username The username
	 * @return The account details.
	 */
	AccountDetails getByUserName(String username);

}
