package fr.femm.findyourtrashcan.security;

import static java.util.Collections.emptyList;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.femm.findyourtrashcan.data.AccountDetails;
import fr.femm.findyourtrashcan.service.AccountDetailsService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Configuration
public class TokenAuthenticationService implements ApplicationContextAware {
	private static final long EXPIRATIONTIME = 864_000_000; // 10 days
	private static final String SECRET = "ThisIsASecret";
	private static final String TOKEN_PREFIX = "Bearer";
	public static final String HEADER_STRING = "authorization";
	
	private static AccountDetailsService accountDetailsService;

	public static void addAuthentication(final HttpServletResponse res, final String username) {
		final String JWT = Jwts.builder().setSubject(username)
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(SignatureAlgorithm.HS512, SECRET).compact();
		res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
		//res.addHeader("access-control-expose-headers", "content-disposition");
		res.addHeader("Access-Control-Expose-Headers", "authorization");
		res.setContentType(MediaType.APPLICATION_JSON_VALUE);
		res.setStatus(HttpServletResponse.SC_CREATED);	
		try {
			final AccountDetails accD = accountDetailsService.getByUserName(username);
		    res.getWriter().append(new ObjectMapper().writeValueAsString(accD));
		} catch (final IOException e) {
		    // TODO Auto-generated catch block
		}
	}

	public static Authentication getAuthentication(final HttpServletRequest request) {
		final String token = request.getHeader(HEADER_STRING);
		if (token != null) { // parse the token.
			final String user = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody()
					.getSubject();

			return user != null ? new UsernamePasswordAuthenticationToken(user, null, emptyList()) : null;
		}
		return null;
	}

	@Override
	public void setApplicationContext(final ApplicationContext arg0) throws BeansException {
		accountDetailsService = arg0.getBean(AccountDetailsService.class);
	}
	
	@Bean
	public static TokenAuthenticationService tokenAuthenService() {
        return new TokenAuthenticationService();
    }
}
