package fr.femm.findyourtrashcan.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.service.AccountDetailsService;

@RestController
@RequestMapping("/api/accountdetails")
public class AccountDetailsController {

	private Logger logger = Logger.getLogger(AccountDetailsController.class);

	@Autowired
	private AccountDetailsService service;

	/**
	 * Method to find a user account details
	 * 
	 * @param id
	 *            the id of the user we want to get the account details
	 * @return The user founded
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public AccountDetails getAccountDetails(@PathVariable("id") Integer id) {
		logger.info("WebService getAccountDetails [id : " + id + "]");

		return service.getAccountDetails(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public AccountDetails createAccountDetails(@RequestBody AccountDetails accountDetails) {
		logger.info("WebService createAccountDetails " + accountDetails);

		return service.createUser(accountDetails);
	}

}
