package fr.femm.findyourtrashcan.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.Trashcan;
import fr.femm.findyourtrashcan.repository.FYTCUserRepository;
import fr.femm.findyourtrashcan.repository.GarbageTypeRepository;
import fr.femm.findyourtrashcan.repository.LocationRepository;
import fr.femm.findyourtrashcan.repository.TrashcanRepository;
import fr.femm.findyourtrashcan.repository.TrashcanTypeRepository;

/**
 * Class implementation of the Trashcan service
 * @author Francis Cornaire
 *
 */

@Service
public class TrashcanServiceImpl implements TrashcanService {
    
    	@Autowired
	private TrashcanRepository trashcanRepository;
    	
    	@Autowired
    	private GarbageTypeRepository garbageTypeRepository;
    	
    	@Autowired
    	private TrashcanTypeRepository trashcanTypeRepository;
    	
    	@Autowired
    	private LocationRepository locationRepository;
	
	@Override
	@Transactional
	public Trashcan createTrashCan(Trashcan trashcan) {
	    trashcan.setGarbageType(garbageTypeRepository.findOne(trashcan.getGarbageType().getId()));
	    trashcan.setTrashcanType(trashcanTypeRepository.findOne(trashcan.getTrashcanType().getId()));
	    trashcan.setLocation(locationRepository.findOne(trashcan.getLocation().getCode()));
	    return trashcanRepository.save(trashcan);
	}

	@Override
	public Trashcan getTrashcan(Integer id) {
		return trashcanRepository.findOne(id);
	}

	@Override
	public List<Trashcan> getTrashcansInBounds(float neLat, float neLon, float swLat, float swLon) {
	    return this.trashcanRepository.findInBounds(neLat, neLon, swLat, swLon);
	}

}
