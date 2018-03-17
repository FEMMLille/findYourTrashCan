package fr.femm.findyourtrashcan.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class DataSourceConfig {
	
	private static final String SPRING_DATASOURCE_URL = "${spring.datasource.url}";
	private static final String SPRING_DATASOURCE_USERNAME = "${spring.datasource.username}";
	private static final String SPRING_DATASOURCE_PASSWORD = "${spring.datasource.password}";
	private static final String DATASOURCE = "dataSource";
	private static final String DRIVER_CLASS_NAME = "org.postgresql.Driver";
	
	@Value(SPRING_DATASOURCE_URL)
	private String databaseUrl;
	
	@Value(SPRING_DATASOURCE_USERNAME)
	private String userName;
	
	@Value(SPRING_DATASOURCE_PASSWORD)
	private String password;


	@Bean(name=DATASOURCE)
	public DriverManagerDataSource dataSource() {
	    DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
	    driverManagerDataSource.setDriverClassName(DRIVER_CLASS_NAME);
	    driverManagerDataSource.setUrl(databaseUrl);
	    driverManagerDataSource.setUsername(userName);
	    driverManagerDataSource.setPassword(password);
	    
	    return driverManagerDataSource;
	    
	}
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("*")
                    .exposedHeaders("Authorization");
            }
        };
    }
	
}
