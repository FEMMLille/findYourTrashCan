package fr.femm.findyourtrashcan.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.femm.findyourtrashcan.data.GarbageType;
import io.jsonwebtoken.lang.Assert;

@RunWith(SpringRunner.class)
@WebAppConfiguration
public class GarbageTypeControllerTest {

	public static final String URL_GARBAGE_TYPE = "/api/garbageType";

	@Autowired
	private WebApplicationContext wac;

	private MockMvc mockMvc;

	private ObjectMapper mapper; 
	
	private TypeReference<List<GarbageType>> garbageTypeRef;


	@Before
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
		mapper = new ObjectMapper();
		
		garbageTypeRef = new TypeReference<List<GarbageType>>() {};
	}

	@Test
	public void getAll() throws Exception {
		MvcResult response = mockMvc.perform(get(URL_GARBAGE_TYPE)).andExpect(status().isOk()).andReturn();

		String content = response.getResponse().getContentAsString();
		
		List<GarbageType> result = mapper.readValue(content, garbageTypeRef);
		
		Assert.notNull(result);


	}
}
