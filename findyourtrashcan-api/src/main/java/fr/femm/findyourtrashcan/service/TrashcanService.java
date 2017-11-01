package fr.femm.findyourtrashcan.service;

import fr.femm.findyourtrashcan.data.Location;
import fr.femm.findyourtrashcan.data.Trashcan;

/**
 * Class for operating on Trashcan
 * @author Francis Cornaire
 *
 */

public interface TrashcanService {

	/**
	 * Method to create a trashcan
	 * @param trashcan The trashcan
	 * @return The created trashcan
	 */
	public Location createTrashCan(Trashcan trashcan) ;
	
	/**
	 * Method to get a trashcan
	 * @param code the id of the trashcan
	 * @return The trashcan
	 */
	public Location getTrashcan(Integer id);
	
}