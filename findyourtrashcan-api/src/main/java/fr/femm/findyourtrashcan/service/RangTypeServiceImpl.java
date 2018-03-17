package fr.femm.findyourtrashcan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.RangType;
import fr.femm.findyourtrashcan.repository.RangTypeRepository;

@Service
public class RangTypeServiceImpl implements RangTypeService {
    
    @Autowired 
    RangTypeRepository rangTypeRepository;

    @Override
    public RangType getById(Integer id) {
	return rangTypeRepository.findById(id);
    }
}
