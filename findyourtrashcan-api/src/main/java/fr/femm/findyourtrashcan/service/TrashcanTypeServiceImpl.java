package fr.femm.findyourtrashcan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.TrashcanType;
import fr.femm.findyourtrashcan.repository.TrashcanTypeRepository;

@Service
public class TrashcanTypeServiceImpl implements TrashcanTypeService {

	@Autowired
	private TrashcanTypeRepository trashcanTypeRepository;
	
	@Override
	public List<TrashcanType> getAllTrashcanType() {
		return trashcanTypeRepository.findAll();
	}

}
