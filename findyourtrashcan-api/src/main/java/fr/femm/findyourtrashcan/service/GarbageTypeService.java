package fr.femm.findyourtrashcan.service;

import java.util.List;

import fr.femm.findyourtrashcan.data.GarbageType;

public interface GarbageTypeService {
	
	/**
	 * Method to get all garbage
	 * @return The trashcan
	 */
	public List<GarbageType> getAllGarbageType();

}
