package fr.femm.findyourtrashcan.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping(value = "/api/accountdetails")
public class AccountDetailsController {

	public static final String ID = "id";

	public static final String URL_GET_BY_USER = "/{" + ID + "}";

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
	@GetMapping(URL_GET_BY_USER)
	public AccountDetails getByUser(@PathVariable(ID) final Integer id) {
		logger.info("WebService getAccountDetails [id : " + id + "]");
		System.out.println(service.getByUser(id));

		return service.getByUser(id);
	}

	/**
	 * Create account details
	 * 
	 * @param accountDetails
	 *            The account details with the user in it
	 * @return The account details and user created
	 */
	@PutMapping
	public AccountDetails save(@RequestBody final AccountDetails accountDetails) {
		logger.info("WebService saveAccountDetails " + accountDetails);
		return service.create(accountDetails);
	}
	
	@PostMapping
	public AccountDetails create(@RequestBody final AccountDetails accountDetails) {
		logger.info("WebService saveAccountDetails " + accountDetails);
		return service.create(accountDetails);
	}
	
}
