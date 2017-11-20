package fr.femm.findyourtrashcan.service;

import fr.femm.findyourtrashcan.data.FYTCUser;

/**
 * Class for operating on user
 * @author Francis Cornaire
 *
 */

public interface FYTCUserService {
	
	/**
	 * Method to create a user
	 * This method encrypt user password before the creation
	 * @param user The user
	 * @return The created user
	 */
	public FYTCUser createUser(FYTCUser user);
	
	/**
	 * Method to get a user
	 * @param id the id of the user
	 * @return The user
	 */
	public FYTCUser getUser(Integer id);
	
	/**
	 * Method to get the user by his username
	 * @param userName The username
	 * @return The user
	 */
	public FYTCUser getUser(String userName);

}
