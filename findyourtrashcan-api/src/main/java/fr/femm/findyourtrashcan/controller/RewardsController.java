package fr.femm.findyourtrashcan.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.Rewards;
import fr.femm.findyourtrashcan.service.RewardsService;

@RestController
@RequestMapping(value = "/api/rewards", produces = MediaType.APPLICATION_JSON_VALUE)
public class RewardsController {
    
    public final Logger logger = Logger.getLogger(RewardsController.class);

    @Autowired
    private RewardsService rewardsService;
    
    @GetMapping("/rank/{rankId}")
    public List<Rewards> getRewardsForRank(@PathVariable("rankId") final Integer id) {
	logger.info("Webservice getRewardsForRank [rank-id : " + id + "]");
	return rewardsService.getByRank(id);
    }
}
