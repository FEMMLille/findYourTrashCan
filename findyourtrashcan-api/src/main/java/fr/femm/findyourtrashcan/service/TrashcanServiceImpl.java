package fr.femm.findyourtrashcan.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.data.Trashcan;
import fr.femm.findyourtrashcan.data.TrashcanFavourite;
import fr.femm.findyourtrashcan.repository.FYTCUserRepository;
import fr.femm.findyourtrashcan.repository.GarbageTypeRepository;
import fr.femm.findyourtrashcan.repository.LocationRepository;
import fr.femm.findyourtrashcan.repository.TrashcanFavouriteRepository;
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

	@Autowired
	private FYTCUserRepository userRepository;
	
	@Autowired
	private TrashcanFavouriteRepository trashcanFavouriteRepository;

	@Override
	@Transactional
	public Trashcan createTrashCan(Trashcan trashcan, boolean force) {
	    trashcan.setGarbageType(garbageTypeRepository.findOne(trashcan.getGarbageType().getId()));
	    trashcan.setTrashcanType(trashcanTypeRepository.findOne(trashcan.getTrashcanType().getId()));
	    trashcan.setLocation(locationRepository.findOne(trashcan.getLocation().getCode()));
	    trashcan.setTrustworthy(force);
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
	
	@Override
	public Trashcan updateTrashcan(Trashcan trashcan) {
	    return trashcanRepository.save(trashcan);
	}

	@Override
	public void deleteTrashcan(Integer trashcanId) {
	    trashcanRepository.delete(trashcanId);
	}
	
	@Override
	public List<Trashcan> filterTrashcan(Trashcan trashcan) {
		return this.trashcanRepository.findByTrashcanTypeAndGarbageType(trashcan.getTrashcanType(),trashcan.getGarbageType());
	}

	@Override
	public boolean setFavoriteTrashcan(Trashcan trashcan) {
		FYTCUser user = userRepository
				.findByUsername(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
		TrashcanFavourite fav = new TrashcanFavourite();
		fav.setEmpty(trashcan.isEmpty());
		fav.setGarbageType(trashcan.getGarbageType());
		fav.setLat(trashcan.getLat());
		fav.setLocation(trashcan.getLocation());
		fav.setLon(trashcan.getLon());
		fav.setPicture(trashcan.getPicture());
		fav.setTrashcanType(trashcan.getTrashcanType());
		fav.setTrustworthy(trashcan.isTrustworthy());
		if (user.getFavoriteSearch() != null) {
			trashcanFavouriteRepository.delete(user.getFavoriteSearch());
		}
		trashcanFavouriteRepository.save(fav);
		user.setFavoriteSearch(fav);
		userRepository.save(user);
		return true;
	}

}
