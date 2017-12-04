package fr.femm.findyourtrashcan.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.Trashcan;
import fr.femm.findyourtrashcan.service.TrashcanService;

@RestController
@RequestMapping("/api/trashcan")
public class TrashCanController {
	
	private Logger logger = Logger.getLogger(TrashCanController.class);

	@Autowired
	private TrashcanService service;

	/**
	 * Method to create a trashcan
	 * 
	 * @param Trashcan
	 *            The trashcan send by the mobile request
	 * @return The new trashcan created
	 */

	@RequestMapping(method = RequestMethod.POST)
	public Trashcan createTrashcan(@RequestBody Trashcan trashcan) {
		logger.info("WebService createTrashcan [trashcan : " + trashcan);

		return service.createTrashCan(trashcan);
	}
	
}
