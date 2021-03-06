package fr.femm.findyourtrashcan.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.service.FYTCUserService;

@RestController
@RequestMapping("/api/user")
public class FYTCUserController {

	private final Logger logger = Logger.getLogger(FYTCUserController.class);

	@Autowired
	private FYTCUserService service;

	/**
	 * Method to create a user
	 * 
	 * @param user
	 *            The user send by the front request
	 * @return The new user created
	 */
	@CrossOrigin("*")
	@RequestMapping(method = RequestMethod.POST)
	public FYTCUser createUser(@RequestBody final FYTCUser user) {
		logger.info("WebService createUser " + user);

		return service.createUser(user);
	}

	/**
	 * Method to find a user
	 * 	
	 * @param id
	 *            the id of the user we want to get
	 * @return The user founded
	 */
	@CrossOrigin("*")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public FYTCUser getUser(@PathVariable("id") final Integer id) {
		logger.info("WebService getUser [id : " + id + "]");

		return service.getUser(id);
	}

	/**
	 * Method to find a user
	 * 
	 * @param id
	 *            the id of the user we want to get
	 * @return The user founded
	 */
	@CrossOrigin("*")
	@RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
	public FYTCUser getUserByName(@PathVariable("name") final String name) {
		logger.info("WebService getUser [name : " + name + "]");
		return service.getUser(name);
	}

}
