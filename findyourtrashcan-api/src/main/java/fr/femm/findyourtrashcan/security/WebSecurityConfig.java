package fr.femm.findyourtrashcan.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private DataSource dataSource;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
	    http
	    	.csrf().disable()
	    	.authorizeRequests()
	    		.antMatchers("/").permitAll()
	        	.antMatchers(HttpMethod.POST, "/api/user").permitAll()
	        	.anyRequest().authenticated()
	    	.and()
	        .addFilterBefore(new JWTLoginFilter("/api/login", authenticationManager()),
	                UsernamePasswordAuthenticationFilter.class) // We filter the /api/user requests
	        .addFilterBefore(new JWTAuthenticationFilter(),
	                UsernamePasswordAuthenticationFilter.class); // And filter other requests to check the presence of JWT in header
	 }

	@Override
	  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(dataSource)
		.passwordEncoder(new BCryptPasswordEncoder())
		.usersByUsernameQuery("SELECT username, password,enabled FROM fytcuser WHERE username=?")
		.authoritiesByUsernameQuery("SELECT username" + ", role FROM fytcuser WHERE username=?");
	}
	
}
