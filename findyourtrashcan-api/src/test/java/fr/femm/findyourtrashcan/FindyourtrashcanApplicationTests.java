package fr.femm.findyourtrashcan;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles(FindyourtrashcanApplicationTests.TEST_PROFILE)
public class FindyourtrashcanApplicationTests {
	
	public static final String TEST_PROFILE = "test";
	
	@Test
	public void contextLoads() {
	}

}
