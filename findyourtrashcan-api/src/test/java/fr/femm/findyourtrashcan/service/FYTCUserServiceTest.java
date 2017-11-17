package fr.femm.findyourtrashcan.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.data.Role;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FYTCUserServiceTest {

	@Autowired
	private FYTCUserService userService;

	@Test
	public void createUserTest() {
		// init
		FYTCUser userToTest = new FYTCUser("maws", "bg", "wo@gmail.com", new Role(true, "USER"));

		// execution
		FYTCUser userCreated = userService.createUser(userToTest);

		// test
		assertNotNull(userCreated);
		assertEquals(userCreated.getId(), userToTest.getId());
		assertEquals(userCreated.getUsername(), userToTest.getUsername());
		assertEquals(userCreated.getEmail(), userToTest.getEmail());
	}

	@Test
	public void getUserTest() {
		// init
		FYTCUser userToTest = new FYTCUser("maws", "bg", "wo@gmail.com", new Role(true, "USER"));

		// execution
		FYTCUser userCreated = userService.createUser(userToTest);
		FYTCUser userGeted = userService.getUser(userCreated.getId());

		// test
		assertNotNull(userGeted);
		assertEquals(userGeted.getId(), userToTest.getId());
	}

	@Test
	public void getUserTestByUsername() {
		// init
		FYTCUser userToTest = new FYTCUser("mat", "skra", "popopo@gmail.com", new Role(true, "USER"));

		// execution
		userService.createUser(userToTest);
		FYTCUser userGeted = userService.getUser("mat");

		// test
		assertNotNull(userGeted);
		assertEquals(userGeted.getUsername(), "mat");
		assertEquals(userGeted.getUsername(), userToTest.getUsername());
	}

}
