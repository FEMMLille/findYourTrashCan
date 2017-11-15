package fr.femm.findyourtrashcan.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.repository.FYTCUserRepository;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
public class FYTCUserControllerTest {

	private static final String API_USER_URL = "http://localhost:8080/api/user";

	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	private MockMvc mockMvc;

	private FYTCUser user;

	@Autowired
	private WebApplicationContext webApplicationContext;

	private HttpMessageConverter mappingJackson2HttpMessageConverter;

	@Autowired
	private FYTCUserRepository userRepository;

	@Autowired
	void setConverters(HttpMessageConverter<?>[] converters) {

		this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
				.filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter).findAny().orElse(null);

		assertNotNull("the JSON message converter must not be null", this.mappingJackson2HttpMessageConverter);
	}

	@Before
	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();

		this.userRepository.deleteAllInBatch();

		this.user = userRepository.save(new FYTCUser("wow", "amazing", "lol@nope.com"));
	}

	@Test
	public void newUser() throws Exception {
		mockMvc.perform(post(API_USER_URL).content(this.json(new FYTCUser("test", "testPass", "lol@nope.com")))
				.contentType(contentType)).andExpect(status().isOk());
	}

	@Test
	public void getUser() throws Exception {
		mockMvc.perform(get(API_USER_URL + "/1").contentType(contentType)).andExpect(status().isOk())
				.andExpect(content().contentType(contentType)).andExpect(jsonPath("$.id", is(this.user.getId())))
				.andExpect(jsonPath("$.username", is(this.user.getUsername())))
				.andExpect(jsonPath("$.password", is(this.user.getPassword())));

	}

	protected String json(Object o) throws IOException {
		MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
		this.mappingJackson2HttpMessageConverter.write(o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
		return mockHttpOutputMessage.getBodyAsString();
	}
}