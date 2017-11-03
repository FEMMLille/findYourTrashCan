package fr.femm.findyourtrashcan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.repository.FYTCUserRepository;

/**
 * Class implementation of the User service
 * @author Francis Cornaire
 *
 */

@Service
public class FYTCUserServiceImpl implements FYTCUserService {

	@Autowired
	private FYTCUserRepository userRepository;
	
	@Override
	public FYTCUser createUser(FYTCUser user){
		//Encrypting password before saving in database
		 BCryptPasswordEncoder passwordEncode =	new BCryptPasswordEncoder();
		 user.setPassword(passwordEncode.encode(user.getPassword()));
		 
		 return this.userRepository.save(user);
	}

	@Override
	public FYTCUser getUser(Integer id) {
		return this.userRepository.findOne(id);
	}

	@Override
	public FYTCUser getUser(String userName) {
		return this.userRepository.findByUsername(userName);
	}

}
