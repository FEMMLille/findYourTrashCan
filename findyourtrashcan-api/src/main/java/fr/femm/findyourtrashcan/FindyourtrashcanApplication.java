package fr.femm.findyourtrashcan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"fr.femm.findyourtrashcan.data"})
@ComponentScan(basePackages = {"fr.femm.findyourtrashcan"})
@EnableJpaRepositories(basePackages = {"fr.femm.findyourtrashcan.repository"})
public class FindyourtrashcanApplication {

	public static void main(String[] args) {
		SpringApplication.run(FindyourtrashcanApplication.class, args);
	}
}
