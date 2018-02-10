package fr.femm.findyourtrashcan.service;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

import fr.femm.findyourtrashcan.AbstractMvcTest;
import fr.femm.findyourtrashcan.controller.AccountDetailsController;
import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.security.TokenAuthenticationService;


public class AccountDetailsControllerTest extends AbstractMvcTest {

	public static final String URL_PREFIX = "/api/accountdetails";

	@Autowired
	private WebApplicationContext wac;

	@Test
	public void getByUser() throws Exception {
		final String token = extractTokenFromHeader(login("maws2", "songoku").andReturn());
		mockMvc.perform(
				get(URL_PREFIX + AccountDetailsController.URL_GET_BY_USER_ID, 1L)
						.header(TokenAuthenticationService.HEADER_STRING, token))
				.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(Matchers.notNullValue()));

	}
	
	@Test
	public void getByUserName() throws Exception {
		final String token = extractTokenFromHeader(login("maws2", "songoku").andReturn());
		mockMvc.perform(
				get(URL_PREFIX + AccountDetailsController.URL_GET_BY_USER_NAME, "maws2")
						.header(TokenAuthenticationService.HEADER_STRING, token))
				.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(Matchers.notNullValue()));

	}
	
	@Test
	public void save() throws Exception {
		final MvcResult result = login("maws2", "songoku").andReturn();
		final String token = extractTokenFromHeader(result);
		final Integer id = extractId(result);
		final AccountDetails accD = extractAccountDetails(result);
		accD.getUser().setPassword("songoku");
		accD.setFirstName("Mustapha");
		mockMvc.perform(
				put(URL_PREFIX).contentType(MediaType.APPLICATION_JSON)
				.content(json(accD))
						.header(TokenAuthenticationService.HEADER_STRING, token))
				.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value(Matchers.notNullValue()));
	}

	@Override
	protected void doInit() throws Exception {
		super.doInit();
	}



}