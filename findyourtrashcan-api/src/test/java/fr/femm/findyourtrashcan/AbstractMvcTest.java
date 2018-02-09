package fr.femm.findyourtrashcan;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
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

    private ObjectMapper mapper = new ObjectMapper();
    private static Set<Class> inited = new HashSet<>();

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

	protected abstract void doInit() throws Exception;

    protected String json(Object o) throws IOException {
        return mapper.writeValueAsString(o);
    }

    protected ResultActions login(String username, String password) throws Exception {
		final AccountCredentials auth = new AccountCredentials();
        auth.setUsername(username);
        auth.setPassword(password);
        return mockMvc.perform(
				post(WebSecurityConfig.API_LOGIN_URL)
                        .content(json(auth))
                        .contentType(MediaType.APPLICATION_JSON));
    }

    protected String extractToken(MvcResult result) throws UnsupportedEncodingException {
		return result.getResponse().getHeader(TokenAuthenticationService.HEADER_STRING);
    }

}