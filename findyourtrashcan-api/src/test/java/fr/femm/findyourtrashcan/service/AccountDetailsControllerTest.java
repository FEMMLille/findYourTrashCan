package fr.femm.findyourtrashcan.service;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

import fr.femm.findyourtrashcan.AbstractMvcTest;
import fr.femm.findyourtrashcan.controller.AccountDetailsController;
import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.data.Role;
import fr.femm.findyourtrashcan.security.WebSecurityConfig;


public class AccountDetailsControllerTest extends AbstractMvcTest {

	@Autowired
	private WebApplicationContext wac;

	@Test
	public void getByUser() throws Exception {
		final String token = extractToken(login("maws2", "songoku").andReturn());
		mockMvc.perform(get(AccountDetailsController.URL_GET_BY_USER, AccountDetailsController.ID)
				.header("Authorization", "Bearer " + token))
				.andExpect(status().isOk()).andExpect(content().contentType("application/json"))
				.andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(Matchers.notNullValue()));
	}

	@Override
	protected void doInit() throws Exception {
		AccountDetails details = new AccountDetails();
		details.setUser(new FYTCUser("maws2", "songoku", "mn", new Role(true, "admin")));
		createUser(details).andExpect(status().isCreated());
	}

	private ResultActions createUser(AccountDetails accountDetails) throws Exception {
		return mockMvc.perform(
				post(WebSecurityConfig.API_ACCOUNT_DETAILS_URL, accountDetails));
	}

}