package fr.femm.findyourtrashcan.service;

import java.util.List;
import fr.femm.findyourtrashcan.data.TrashcanType;

public interface TrashcanTypeService {
	
	/**
	 * Method to get all trashcanType
	 * @return The trashcan
	 */
	public List<TrashcanType> getAllTrashcanType();

}
