package fr.femm.findyourtrashcan.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.TrashcanType;
import fr.femm.findyourtrashcan.service.TrashcanTypeService;

@RestController
@RequestMapping("/api/trashcanType")
public class TrashcanTypeController {
	
	private Logger logger = Logger.getLogger(TrashcanTypeController.class);

	@Autowired
	private TrashcanTypeService service;
	
	/**
	 * Method to get all trashcan type
	 * @return All trashcan type
	 */

	@RequestMapping(method = RequestMethod.GET)
	public List<TrashcanType> getAlltrashcanType() {
		logger.info("WebService getAlltrashcanType");

		return service.getAllTrashcanType();
	}

}
