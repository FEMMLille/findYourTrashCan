package fr.femm.findyourtrashcan;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.data.FYTCUser;
import fr.femm.findyourtrashcan.data.Role;
import fr.femm.findyourtrashcan.repository.GarbageTypeRepository;
import fr.femm.findyourtrashcan.repository.LocationRepository;
import fr.femm.findyourtrashcan.repository.TrashcanRepository;
import fr.femm.findyourtrashcan.repository.TrashcanTypeRepository;
import fr.femm.findyourtrashcan.security.AccountCredentials;
import fr.femm.findyourtrashcan.security.TokenAuthenticationService;
import fr.femm.findyourtrashcan.security.WebSecurityConfig;

@RunWith(SpringJUnit4ClassRunner.class)
// @ContextConfiguration(classes = {
// JpaConfig.class,
// WebSecurityConfig.class })
@WebAppConfiguration
@SpringBootTest(classes = FindyourtrashcanApplication.class)
@ActiveProfiles(FindyourtrashcanApplicationTests.TEST_PROFILE)
@Ignore
public abstract class AbstractMvcTest {
    protected MockMvc mockMvc;

    private final ObjectMapper mapper = new ObjectMapper();
    private static Set<Class> inited = new HashSet<>();
    
    @Autowired
    protected TrashcanRepository trashcanRepository;
    
    @Autowired
    protected TrashcanTypeRepository trashcanTypeRepository;
    
    @Autowired
    protected GarbageTypeRepository garbageTypeRepository;
    
    @Autowired
    protected LocationRepository locationRepository;

    @Autowired
	private FilterChainProxy springSecurityFilterChain;

	@Autowired
	private WebApplicationContext wac;

    @Before
    public void setup() {
		this.mockMvc = webAppContextSetup(this.wac)
				.apply(SecurityMockMvcConfigurers.springSecurity())
				.build();
    }

    @Before
    public void init() throws Exception {
        if (!inited.contains(getClass())) {
            doInit();
            inited.add(getClass());
        }
    }

	protected void doInit() throws Exception {
		final Role role = new Role();
		role.setId(1);
		role.setRoleName("USER");
		role.setEnabled(true);
		// Role role = roleRepository.findByRoleName("admin");
		final AccountDetails details = new AccountDetails();
		details.setBirthday(new Date(1991, 2, 10));
		details.setUser(new FYTCUser("maws2", "songoku", "mn@gmail.com", role));
		createUser(details).andExpect(status().isOk());
	}

    protected String json(final Object o) throws IOException {
        return mapper.writeValueAsString(o);
    }

    protected ResultActions login(final String username, final String password) throws Exception {
		final AccountCredentials auth = new AccountCredentials();
        auth.setUsername(username);
        auth.setPassword(password);
        return mockMvc.perform(
				post(WebSecurityConfig.API_LOGIN_URL)
                        .content(json(auth))
                        .contentType(MediaType.APPLICATION_JSON));
    }

    protected String extractTokenFromHeader(final MvcResult result) throws UnsupportedEncodingException {
 		return result.getResponse().getHeader(TokenAuthenticationService.HEADER_STRING);
    }
    
    protected Integer extractId(final MvcResult result) throws Exception {
    	return JsonPath.read(result.getResponse().getContentAsString(), "$.id");
    }
    
    protected AccountDetails extractAccountDetails(final MvcResult result) throws Exception {
    	return mapper.readValue(result.getResponse().getContentAsString(), AccountDetails.class);
    }
    
	protected ResultActions createUser(final AccountDetails accountDetails) throws Exception {
		return mockMvc.perform(
				post(WebSecurityConfig.API_ACCOUNT_DETAILS_URL).contentType(MediaType.APPLICATION_JSON)
						.content(json(accountDetails)));
	}

}