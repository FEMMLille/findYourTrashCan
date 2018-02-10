package fr.femm.findyourtrashcan.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

import fr.femm.findyourtrashcan.AbstractMvcTest;
import fr.femm.findyourtrashcan.controller.TrashCanController;
import fr.femm.findyourtrashcan.data.Role;
import fr.femm.findyourtrashcan.data.Trashcan;
import fr.femm.findyourtrashcan.security.TokenAuthenticationService;
import fr.femm.findyourtrashcan.security.WebSecurityConfig;


public class TrashCanControllerTest extends AbstractMvcTest {

	public static final String URL_PREFIX = "/api/trashcan";

	@Autowired
	private WebApplicationContext wac;

	@Test
	public void getTrashcansInBounds() throws Exception {
		final String token = extractTokenFromHeader(login("maws2", "songoku").andReturn());
		
		final Trashcan t1 = new Trashcan();
		t1.setEmpty(true);
		t1.setLat(0.1f);
		t1.setLon(0.1f);
		t1.setPicture("");
		t1.setTrashcanType(trashcanTypeRepository.findOne(1));
		t1.setGarbageType(garbageTypeRepository.findOne(1));
		t1.setLocation(locationRepository.findOne(59000));
		
		
		final Trashcan t2 = new Trashcan();
		t2.setEmpty(true);
		t2.setLat(0.2f);
		t2.setLon(0.3f);
		t2.setPicture("");
		t2.setTrashcanType(trashcanTypeRepository.findOne(1));
		t2.setGarbageType(garbageTypeRepository.findOne(1));
		t2.setLocation(locationRepository.findOne(59000));
		
		final Trashcan t3 = new Trashcan();
		t3.setEmpty(true);
		t3.setLat(1f);
		t3.setLon(3f);
		t3.setPicture("");
		t3.setTrashcanType(trashcanTypeRepository.findOne(1));
		t3.setGarbageType(garbageTypeRepository.findOne(1));
		t3.setLocation(locationRepository.findOne(59000));
		
		createTrashCan(t1);
		createTrashCan(t2);
		createTrashCan(t3);
		
		mockMvc.perform(
				get(URL_PREFIX)
				.param(TrashCanController.SW_LAT, ""+ 0)
				.param(TrashCanController.NE_LAT, ""+ 0.3f)
				.param(TrashCanController.SW_LON, ""+ 0)
				.param(TrashCanController.NE_LON, ""+ 0.1f)
						.header(TokenAuthenticationService.HEADER_STRING, token))
				.andDo(MockMvcResultHandlers.print())		
				.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(3));
		
		
		mockMvc.perform(
				get(URL_PREFIX)
				.param(TrashCanController.SW_LAT, ""+ 0.9f)
				.param(TrashCanController.NE_LAT, ""+ 1f)
				.param(TrashCanController.SW_LON, ""+ 1)
				.param(TrashCanController.NE_LON, ""+ 2f)
						.header(TokenAuthenticationService.HEADER_STRING, token))
				.andDo(MockMvcResultHandlers.print())		
				.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1));
		
		mockMvc.perform(
				get(URL_PREFIX)
				.param(TrashCanController.SW_LAT, ""+ 0)
				.param(TrashCanController.NE_LAT, ""+ 3f)
				.param(TrashCanController.SW_LON, ""+ 0)
				.param(TrashCanController.NE_LON, ""+ 3f)
						.header(TokenAuthenticationService.HEADER_STRING, token))
				.andDo(MockMvcResultHandlers.print())		
				.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(4));
		
		mockMvc.perform(
				get(URL_PREFIX)
				.param(TrashCanController.SW_LAT, ""+ 0)
				.param(TrashCanController.NE_LAT, ""+ 0)
				.param(TrashCanController.SW_LON, ""+ 0)
				.param(TrashCanController.NE_LON, ""+ 0)
						.header(TokenAuthenticationService.HEADER_STRING, token))
				.andDo(MockMvcResultHandlers.print())		
				.andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0));

	}
	
	@Test
	public void addTrashcan() throws Exception {
		final Trashcan t = trashcanRepository.findOne(1);
		assertNotNull(t.getId());
		assertNotNull(t.getPicture());
		assertNotNull(t.getGarbageType());
		assertEquals(0.1f, t.getLat(), 0.00001);
		assertEquals(0.5f, t.getLon(), 0.00001);
		assertNotNull(t.getLocation());
		assertNotNull(t.getTrashcanType());
	}


	@Override
	protected void doInit() throws Exception {
		super.doInit();
		final Role role = new Role();
		role.setId(1);
		role.setRoleName("USER");
		role.setEnabled(true);
		// Role role = roleRepository.findByRoleName("admin");
		final Trashcan t1 = new Trashcan();
		t1.setEmpty(true);
		t1.setLat(0.1f);
		t1.setLon(0.5f);
		t1.setPicture("");
		t1.setTrashcanType(trashcanTypeRepository.findOne(1));
		t1.setGarbageType(garbageTypeRepository.findOne(1));
		t1.setLocation(locationRepository.findOne(59000));
		createTrashCan(t1).andExpect(status().isOk());
	}

	private ResultActions createTrashCan(final Trashcan trashcan) throws Exception {
		return mockMvc.perform(
				post(WebSecurityConfig.API_TRASHCAN).contentType(MediaType.APPLICATION_JSON)
						.content(json(trashcan)));
	}

}