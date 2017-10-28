package fr.femm.findyourtrashcan.service;

import fr.femm.findyourtrashcan.data.Location;

/**
 * Class for operating on location
 * @author Francis Cornaire
 *
 */

public interface LocationService {
	
	/**
	 * Method to create a location
	 * @param location The location
	 * @return The created location
	 */
	public Location createLocation(Location location);
	
	/**
	 * Method to get a location
	 * @param code the id of the location
	 * @return The location
	 */
	public Location getLocation(Long code);

}
