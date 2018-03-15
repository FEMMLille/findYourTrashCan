package fr.femm.findyourtrashcan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.data.Rang;
import fr.femm.findyourtrashcan.data.RangType;
import fr.femm.findyourtrashcan.repository.RangRepository;

@Service
public class RangServiceImpl implements RangService {

    @Autowired
    RangRepository rangRepository;
    
    @Override
    public Rang createRank(FYTCUser u) {
	Rang userRank = new Rang(u, RangType.NEWBIE, 0);
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
	return rangRepository.findByUserId(id);
    }
    
}
