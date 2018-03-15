package fr.femm.findyourtrashcan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.Location;
import fr.femm.findyourtrashcan.repository.LocationRepository;

/**
 * Class implementation of the Location service
 * @author Francis Cornaire
 *
 */

@Service
public class LocationServiceImpl implements LocationService {
    
    	@Autowired
    	private LocationRepository locationRepository;

	@Override
	public Location createLocation(Location location) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Location getLocation(Integer code) {
		return locationRepository.findByCode(code);
	}

}
