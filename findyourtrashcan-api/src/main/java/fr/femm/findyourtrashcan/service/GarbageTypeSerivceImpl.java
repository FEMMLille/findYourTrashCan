package fr.femm.findyourtrashcan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.GarbageType;
import fr.femm.findyourtrashcan.repository.GarbageTypeRepository;

@Service
public class GarbageTypeSerivceImpl implements GarbageTypeService{

	@Autowired
	private GarbageTypeRepository garbageTypeRepository;
	
	@Override
	public List<GarbageType> getAllGarbageType() {
		
		return garbageTypeRepository.findAll();
	}

}
