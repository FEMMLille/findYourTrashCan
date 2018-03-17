package fr.femm.findyourtrashcan.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.data.Rang;
import fr.femm.findyourtrashcan.service.RangService;

@RestController
@RequestMapping(value = "/api/rank", produces=MediaType.APPLICATION_JSON_VALUE)
public class RangController {
    
    public final Logger logger = Logger.getLogger(RangController.class);
    
    @Autowired
    RangService rangService;
    @CrossOrigin("*")
    @GetMapping("/user/{id}")
	public Rang getByUser(@PathVariable("id") final Integer id) {
		logger.info("WebService getRankByUser [id : " + id + "]");
		return rangService.getByUser(id);
	}
    @CrossOrigin("*")
    @PutMapping("/user/{id}")
    public Rang increaseUserRankPoints(@PathVariable("id") Integer rankId, @RequestParam("nbPoints") Integer nbPoints) {
	logger.info("WebService increaseUserRankPoints [id : " + rankId + ", nbPoints : " + nbPoints + "]");
	return rangService.incrementRank(rankId, nbPoints);
    }
}
