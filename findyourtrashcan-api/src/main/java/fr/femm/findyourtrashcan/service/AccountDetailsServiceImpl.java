package fr.femm.findyourtrashcan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.repository.AccountDetailsRepository;

/**
 * Class implementation of the User service
 * @author Francis Cornaire
 *
 */

@Service
public class AccountDetailsServiceImpl implements AccountDetailsService {

	@Autowired
	private AccountDetailsRepository accountDetailsRepository;

	@Autowired
	private FYTCUserService userService;

	@Override
	public AccountDetails getAccountDetails(Integer id) {
		return accountDetailsRepository.findByUserId(id);
	}

	@Override
	public AccountDetails createUser(AccountDetails accountDetails) {
		userService.createUser(accountDetails.getUser());
		return accountDetailsRepository.save(accountDetails);
	}
	
}
