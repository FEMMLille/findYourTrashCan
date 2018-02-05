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
import fr.femm.findyourtrashcan.security.WebSecurityConfig;


public class AccountDetailsControllerTest extends AbstractMvcTest {

	@Autowired
	private WebApplicationContext wac;

	@Test
	public void getByUser() throws Exception {
		final String token = extractToken(login("maws", "songoku").andReturn());
		mockMvc.perform(get(AccountDetailsController.URL_GET_BY_USER, AccountDetailsController.ID)
				.header("Authorization", "Bearer " + token))
				.andExpect(status().isOk()).andExpect(content().contentType("application/json"))
				.andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(Matchers.notNullValue()));
	}

	@Override
	protected void doInit() throws Exception {
		createUser("maws", "songoku").andExpect(status().isCreated());
	}

	private ResultActions createUser(String username, String password) throws Exception {
		return mockMvc.perform(
				post(WebSecurityConfig.API_USER_URL)
						.content("{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}"));
	}

}