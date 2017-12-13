package fr.femm.findyourtrashcan.service;

import java.util.List;

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
	public Trashcan createTrashCan(Trashcan trashcan) ;
	
	/**
	 * Method to get a trashcan
	 * @param code the id of the trashcan
	 * @return The trashcan
	 */
	public Trashcan getTrashcan(Integer id);

	public List<Trashcan> getTrashcansInBounds(float neLat, float neLon, float swLat, float swLon);
	
}
