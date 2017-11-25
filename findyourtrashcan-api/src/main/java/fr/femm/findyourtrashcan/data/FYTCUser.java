package fr.femm.findyourtrashcan.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Entity representing User in database
 * @author Francis Cornaire
 *
 */

@Entity
public class FYTCUser {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private String username;
	
	private String password;
	
	private String email;

	@OneToOne
	private Role role;
	
	public FYTCUser() {
		
	}
	
	public FYTCUser(String username, String password, String email,Role role) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "FYTCUser [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email
				+ ", role=" + role + "]";
	}

}
