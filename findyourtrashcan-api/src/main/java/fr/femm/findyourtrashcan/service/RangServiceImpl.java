package fr.femm.findyourtrashcan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.data.Rang;
import fr.femm.findyourtrashcan.data.RangType;
import fr.femm.findyourtrashcan.repository.RangRepository;
import fr.femm.findyourtrashcan.repository.RangTypeRepository;

@Service
public class RangServiceImpl implements RangService {

    @Autowired
    RangRepository rangRepository;
    
    @Autowired
    RangTypeRepository rangTypeRepository;
    
    @Override
    public Rang createRank(FYTCUser u) {
    	if(rangTypeRepository.findById(RangType.NEWBIE.getId()) != null)
    		rangTypeRepository.save(RangType.NEWBIE);
	Rang userRank = new Rang(u, rangTypeRepository.findById(RangType.NEWBIE.getId()), 0);
	return rangRepository.save(userRank);
    }

    @Override
    public Rang incrementRank(Integer rId, Integer nbPoints) {
	Rang rang = rangRepository.findById(rId);
	rang.increment(nbPoints);
	return rangRepository.save(rang);
    }

    @Override
    public Rang getByUser(Integer id) {
	return rangRepository.findById(id);
    }
    
}
