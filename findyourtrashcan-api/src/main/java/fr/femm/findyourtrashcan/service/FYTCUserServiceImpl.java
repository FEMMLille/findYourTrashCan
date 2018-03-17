package fr.femm.findyourtrashcan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.data.Role;
import fr.femm.findyourtrashcan.repository.FYTCUserRepository;
import fr.femm.findyourtrashcan.repository.RoleRepository;

/**
 * Class implementation of the User service
 * @author Francis Cornaire
 *
 */

@Service
public class FYTCUserServiceImpl implements FYTCUserService {

	@Autowired
	private FYTCUserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	public FYTCUser createUser(final FYTCUser user) {
		//Checking for the role
		final Role roleInDB = roleRepository.findByRoleName(user.getRole().getRoleName());
		user.setRole(roleInDB);
		
		//Encrypting password before saving in database
		final BCryptPasswordEncoder passwordEncode =	new BCryptPasswordEncoder();
		user.setPassword(passwordEncode.encode(user.getPassword()));
		 
		return this.userRepository.save(user);
	}

	@Override
	public void encodePassword(final FYTCUser user) {
		final BCryptPasswordEncoder passwordEncode = new BCryptPasswordEncoder();
		user.setPassword(passwordEncode.encode(user.getPassword()));
	}

	@Override
	public FYTCUser getUser(final Integer id) {
		return this.userRepository.findOne(id);
	}

	@Override
	public FYTCUser getUser(final String userName) {
		return this.userRepository.findByUsername(userName);
	}

}
