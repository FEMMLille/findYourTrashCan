package fr.femm.findyourtrashcan.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Entity representing Grade in database
 * @author Francis Cornaire
 *
 */

@Entity
public class Grade {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@OneToOne
	private FYTCUser user;

	@OneToOne
	private AccountType accountType;
	
	@OneToOne
	private Location location;
	
	public Grade() {
		
	}

	public Grade(FYTCUser user, AccountType accountType, Location location) {
		super();
		this.user = user;
		this.accountType = accountType;
		this.location = location;
	}

	public FYTCUser getUser() {
		return user;
	}

	public void setUser(FYTCUser user) {
		this.user = user;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}
	
}
