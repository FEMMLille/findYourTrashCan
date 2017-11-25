package fr.femm.findyourtrashcan.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
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

	private Logger logger = Logger.getLogger(FYTCUserController.class);

	@Autowired
	private FYTCUserService service;

	/**
	 * Method to create a user
	 * 
	 * @param user
	 *            The user send by the front request
	 * @return The new user created
	 */

	@RequestMapping(method = RequestMethod.POST)
	public FYTCUser createUser(@RequestBody FYTCUser user) {
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
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public FYTCUser getUser(@PathVariable("id") Integer id) {
		logger.info("WebService getUser [id : " + id + "]");

		return service.getUser(id);
	}

}
