package fr.femm.findyourtrashcan.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	public static final String API_USER_URL = "/api/user";
	public static final String API_LOGIN_URL = "/api/login";
	public static final String API_TRASHCAN = "/api/trashcan/";
	public static final String API_ACCOUNT_DETAILS_URL = "/api/accountdetails";
	public static final String USERNAME_QUERY_ATHENTIFICATION = "SELECT username, password,enabled FROM fytcuser f "
			+ "join Role r on r.id = f.role_id "
			+ "WHERE username=?";
	public static final String USERNAME_QUERY_AUTHORITIES = "SELECT username, role_name FROM fytcuser f "
			+ "join Role r on r.id = f.role_id "
			+ "WHERE username=?";

	@Autowired
	private DataSource dataSource;
	
	@Override
	protected void configure(final HttpSecurity http) throws Exception {
	    http
	    	.csrf().disable()
	    	.authorizeRequests()
				.antMatchers("/*").permitAll()
	    		//.antMatchers(API_TRASHCAN).permitAll()
			.antMatchers(API_ACCOUNT_DETAILS_URL).permitAll()
				//.antMatchers("/api/*").authenticated()
	    	.and()
	        .addFilterBefore(new JWTLoginFilter(API_LOGIN_URL, authenticationManager()),
	                UsernamePasswordAuthenticationFilter.class) // We filter the /api/login requests
	        .addFilterBefore(new JWTAuthenticationFilter(),
	                UsernamePasswordAuthenticationFilter.class); // And filter other requests to check the presence of JWT in header
	    
	   
	 }
	
	@Override
	public void configure(final WebSecurity web) throws Exception {
		 web.ignoring().antMatchers(HttpMethod.POST, API_ACCOUNT_DETAILS_URL);
	}

	@Override
	  protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(dataSource)
		.passwordEncoder(new BCryptPasswordEncoder())
		.usersByUsernameQuery(USERNAME_QUERY_ATHENTIFICATION)
		.authoritiesByUsernameQuery(USERNAME_QUERY_AUTHORITIES);
	}
	
}
