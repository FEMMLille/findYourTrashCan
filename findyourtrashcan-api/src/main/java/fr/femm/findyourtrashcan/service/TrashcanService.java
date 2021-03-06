package fr.femm.findyourtrashcan.service;

import java.util.List;

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
	public Trashcan createTrashCan(Trashcan trashcan, boolean force) ;
	
	/**
	 * Method to get a trashcan
	 * @param code the id of the trashcan
	 * @return The trashcan
	 */
	public Trashcan getTrashcan(Integer id);

	/**
	 * Method to get trashcans in an area
	 * @param neLat the north east bound's latitude
	 * @param neLon the north east bound's longitude
	 * @param swLat the south west bound's latitude
	 * @param swLon the south west bound's longtitude
	 */
	public List<Trashcan> getTrashcansInBounds(float neLat, float neLon, float swLat, float swLon);

	/**
	 * Mthod to find trashcan with his type and garbage type
	 * @return List of trashcan who match these 2 filters
	 */
	public List<Trashcan> filterTrashcan(Trashcan trashcan);

	/**
	 * Method to set the favorite trashcan
	 */
	public boolean setFavoriteTrashcan(Trashcan trashcan);
	
	public Trashcan updateTrashcan(Trashcan trashcan);
	
	public void deleteTrashcan(Integer trashcanid);
	
}
