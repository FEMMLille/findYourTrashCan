package fr.femm.findyourtrashcan.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.Trashcan;
import fr.femm.findyourtrashcan.service.TrashcanService;

@RestController
@RequestMapping(value = "/api/trashcan", produces = MediaType.APPLICATION_JSON_VALUE)
public class TrashCanController {

	public static final String SW_LON = "sw_lon";

	public static final String SW_LAT = "sw_lat";

	public static final String NE_LON = "ne_lon";

	public static final String NE_LAT = "ne_lat";

	private final Logger logger = Logger.getLogger(TrashCanController.class);

	@Autowired
	private TrashcanService service;

	@GetMapping
	public List<Trashcan> getTrashcansInBounds(@RequestParam(NE_LAT) final float neLat,
			@RequestParam(NE_LON) final float neLon, @RequestParam(SW_LAT) final float swLat,
			@RequestParam(SW_LON) final float swLon) {

		logger.info("WebService getTrashcansInBounds [" + "northeast : (" + neLat + ", " + neLon + "), "
				+ "southwest : (" + swLat + ", " + swLon + ")]");
		return service.getTrashcansInBounds(neLat, neLon, swLat, swLon);
	}

	@PostMapping
	public Trashcan addTrashcan(@RequestBody final Trashcan trashcan) {
		logger.info("WebService addTrashcan [ + " + trashcan + " ]");
		return service.createTrashCan(trashcan);
	}
	
	@PutMapping
	public Trashcan updateTrashcan(@RequestBody final Trashcan trashcan) {
	    logger.info("WebService updateTrashcan [" + trashcan + " ]");
	    return service.updateTrashcan(trashcan);
	    
	}
}
