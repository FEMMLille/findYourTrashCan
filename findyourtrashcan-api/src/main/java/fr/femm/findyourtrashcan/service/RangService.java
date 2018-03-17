package fr.femm.findyourtrashcan.service;

import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.data.Rang;

public interface RangService {
    public Rang createRank(FYTCUser u);
    
    public Rang incrementRank(Integer rankId, Integer nbPoints);

    public Rang getByUser(Integer id);
}
