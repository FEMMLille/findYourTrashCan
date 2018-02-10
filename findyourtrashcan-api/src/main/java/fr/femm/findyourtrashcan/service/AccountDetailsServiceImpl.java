package fr.femm.findyourtrashcan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.repository.AccountDetailsRepository;
import fr.femm.findyourtrashcan.repository.RoleRepository;

/**
 * Class implementation of the User service
 */

@Service
@Transactional
public class AccountDetailsServiceImpl implements AccountDetailsService {

	@Autowired
	private AccountDetailsRepository accountDetailsRepository;

	@Autowired
	private FYTCUserService userService;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public AccountDetails getByUser(final Integer id) {
		return accountDetailsRepository.findByUserId(id);
	}

	@Override
	public AccountDetails create(final AccountDetails accountDetails) {
		userService.encodePassword(accountDetails.getUser());
		accountDetails.getUser().setRole(roleRepository.findOne(accountDetails.getUser().getRole().getId()));
		return accountDetailsRepository.saveAndFlush(accountDetails);
	}
	
	@Override
	public AccountDetails getByUserName(final String username) {
		return accountDetailsRepository.findByUserUsername(username);
	}
}
