package io.hong.admin;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class HongMcpAdminApplication {

	public static void main(String[] args) {
		log.info("::: Application Started ::::");
		SpringApplication.run(HongMcpAdminApplication.class, args);
	}

}
