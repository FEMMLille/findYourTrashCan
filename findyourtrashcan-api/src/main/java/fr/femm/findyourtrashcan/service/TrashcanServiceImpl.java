package fr.femm.findyourtrashcan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.Trashcan;
import fr.femm.findyourtrashcan.repository.TrashcanRepository;

/**
 * Class implementation of the Trashcan service
 * @author Francis Cornaire
 *
 */

@Service
public class TrashcanServiceImpl implements TrashcanService{

	@Autowired
	private TrashcanRepository trashcanRepository;
	
	@Override
	public Trashcan createTrashCan(Trashcan trashcan) {
		return trashcanRepository.save(trashcan);
	}

	@Override
	public Trashcan getTrashcan(Integer id) {
		return trashcanRepository.findOne(id);
	}

}
