package fr.femm.findyourtrashcan.service;

import java.util.List;

import fr.femm.findyourtrashcan.data.Rewards;

public interface RewardsService {
    public List<Rewards> getByRank(Integer id);
}
