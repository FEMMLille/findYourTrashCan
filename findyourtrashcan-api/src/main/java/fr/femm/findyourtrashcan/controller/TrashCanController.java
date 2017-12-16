package fr.femm.findyourtrashcan.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.Trashcan;
import fr.femm.findyourtrashcan.service.TrashcanService;

@RestController
@RequestMapping("/api/trashcan")
public class TrashCanController {

    private Logger logger = Logger.getLogger(TrashCanController.class);

    @Autowired
    private TrashcanService service;


    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Trashcan> getTrashcansInBounds(@RequestParam("ne_lat") float neLat, @RequestParam("ne_lon") float neLon,
	    @RequestParam("sw_lat") float swLat, @RequestParam("sw_lon") float swLon) {
	
	logger.info("WebService getTrashcansInBounds [" + "northeast : (" + neLat + ", " + neLon + "), "
		+ "southwest : (" + swLat + ", " + swLon + ")]");
	return service.getTrashcansInBounds(neLat, neLon, swLat, swLon);
    }
    
    @RequestMapping(value="/", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Trashcan addTrashcan(@RequestBody Trashcan trashcan) {
	logger.info("WebService addTrashcan [ + " + trashcan + " ]");
	return service.createTrashCan(trashcan);
	
    }
}
