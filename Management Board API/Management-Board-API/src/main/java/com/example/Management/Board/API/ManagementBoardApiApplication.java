package com.example.Management.Board.API;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing; // Import this annotation

@SpringBootApplication
@EnableJpaAuditing // Add this annotation to enable JPA Auditing
public class ManagementBoardApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManagementBoardApiApplication.class, args);
	}
}
