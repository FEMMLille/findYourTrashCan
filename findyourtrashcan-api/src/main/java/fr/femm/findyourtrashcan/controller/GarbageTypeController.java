package fr.femm.findyourtrashcan.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.GarbageType;
import fr.femm.findyourtrashcan.service.GarbageTypeService;



@RestController
@RequestMapping("/api/garbageType")
public class GarbageTypeController {
	
	private Logger logger = Logger.getLogger(GarbageTypeController.class);

	@Autowired
	private GarbageTypeService service;
	
	/**
	 * Method to get all garbage type
	 * @return All garbage type
	 */

	@CrossOrigin("*")
	@RequestMapping(method = RequestMethod.GET)
	public List<GarbageType> getAllgarbageType() {
		logger.info("WebService getAllgarbageType");
		return service.getAllGarbageType();
	}

}
