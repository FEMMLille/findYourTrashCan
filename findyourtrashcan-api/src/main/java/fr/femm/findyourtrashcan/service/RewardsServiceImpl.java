package fr.femm.findyourtrashcan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.Rewards;
import fr.femm.findyourtrashcan.repository.RewardsRepository;

@Service
public class RewardsServiceImpl implements RewardsService {
    @Autowired
    RewardsRepository rewardsRepository;
    
    @Override
    public List<Rewards> getByRank(Integer id) {
	return rewardsRepository.findByRankTypeId(id);
    }
}
