package fr.femm.findyourtrashcan.data;

import javax.persistence.CascadeType;
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
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Integer id;

	private String username;
	
	private String password;
	
	private String email;

	@OneToOne(cascade = { CascadeType.ALL })
	private TrashcanFavourite favoriteSearch;

	@OneToOne
	private Role role;
	
	public FYTCUser() {
		
	}
	
	public FYTCUser(final String username, final String password, final String email,final Role role) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
	}

	public Integer getId() {
		return id;
	}

	public void setId(final Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(final String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(final String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(final String email) {
		this.email = email;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(final Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "FYTCUser [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email
				+ ", role=" + role + "]";
	}

	/**
	 * @return the favoriteSearch
	 */
	public TrashcanFavourite getFavoriteSearch() {
		return favoriteSearch;
	}

	/**
	 * @param favoriteSearch the favoriteSearch to set
	 */
	public void setFavoriteSearch(TrashcanFavourite favoriteSearch) {
		this.favoriteSearch = favoriteSearch;
	}

}
