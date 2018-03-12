package fr.femm.findyourtrashcan.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.service.AccountDetailsService;

@RestController
@RequestMapping(value = "/api/accountdetails", produces=MediaType.APPLICATION_JSON_VALUE)
public class AccountDetailsController {

	public static final String ID = "id";
	public static final String NAME = "name";

	public static final String URL_GET_BY_USER_ID = "/{" + ID + "}";
	public static final String URL_GET_BY_USER_NAME = "/name/{" + NAME + "}";

	public final Logger logger = Logger.getLogger(AccountDetailsController.class);

	@Autowired
	private AccountDetailsService service;

	/**
	 * Method to find a user account details
	 * 
	 * @param id
	 *            the id of the user we want to get the account details
	 * @return The account details found
	 */
	@GetMapping(URL_GET_BY_USER_ID)
	public AccountDetails getByUser(@PathVariable(ID) final Integer id) {
		logger.info("WebService getAccountDetails [id : " + id + "]");

		return service.getByUser(id);
	}
	/**
	 * Method to find a user account details by its name
	 * 
	 * @param username
	 *            the username of the user we want to get the account details
	 * @return The account details found
	 */
	@GetMapping(URL_GET_BY_USER_NAME)
	public AccountDetails getByUserName(@PathVariable(NAME) final String username) {
		logger.info("WebService getAccountDetails [name : " + username + "]");

		return service.getByUserName(username);
	}

	/**
	 * Method to update a user account details
	 * 
	 * @param accountDetails The infos we want to update
	 * @return The updated account details
	 */
	@PutMapping
	public AccountDetails save(@RequestBody final AccountDetails accountDetails) {
		logger.info("WebService saveAccountDetails " + accountDetails);
		return service.create(accountDetails);
	}

	/**
	 * Create account details
	 * 
	 * @param accountDetails
	 *            The account details with the user in it
	 * @return The account details and user created
	 */
	@PostMapping
	public AccountDetails create(@RequestBody final AccountDetails accountDetails) {
		logger.info("WebService saveAccountDetails " + accountDetails);
		return service.create(accountDetails);
	}

}
