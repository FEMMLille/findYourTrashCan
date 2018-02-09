package fr.femm.findyourtrashcan.service;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

import fr.femm.findyourtrashcan.AbstractMvcTest;
import fr.femm.findyourtrashcan.controller.AccountDetailsController;
import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.data.Role;
import fr.femm.findyourtrashcan.repository.RoleRepository;
import fr.femm.findyourtrashcan.security.WebSecurityConfig;


public class AccountDetailsControllerTest extends AbstractMvcTest {

	@Autowired
	private WebApplicationContext wac;

	@Autowired
	private RoleRepository roleRepository;

	@Test
	public void getByUser() throws Exception {
		final String token = extractToken(login("maws2", "songoku").andReturn());
		mockMvc.perform(get(AccountDetailsController.URL_GET_BY_USER, AccountDetailsController.ID)
				.header("Authorization", "Bearer " + token))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(Matchers.notNullValue()));
	}

	@Override
	protected void doInit() throws Exception {
		Role role = new Role();
		role.setId(1);
		role.setRoleName("USER");
		role.setEnabled(true);
		// Role role = roleRepository.findByRoleName("admin");
		AccountDetails details = new AccountDetails();
		details.setBirthday(new Date(1991, 2, 10));
		details.setUser(new FYTCUser("maws2", "songoku", "mn@gmail.com", role));
		createUser(details).andExpect(status().isOk());
	}

	private ResultActions createUser(AccountDetails accountDetails) throws Exception {
		return mockMvc.perform(
				post(WebSecurityConfig.API_ACCOUNT_DETAILS_URL).contentType(MediaType.APPLICATION_JSON)
						.content(json(accountDetails)));
	}

}