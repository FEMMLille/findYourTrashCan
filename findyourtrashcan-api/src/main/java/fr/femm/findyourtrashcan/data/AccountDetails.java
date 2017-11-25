package fr.femm.findyourtrashcan.data;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Entity representing AccountDetails in database
 */

@Entity
public class AccountDetails {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@OneToOne
	private FYTCUser user;

	private String firstName;
	
	private String lastName;
	
	private Date birthday;
	
	private String avatar;
	
	public AccountDetails() {
		
	}

	public AccountDetails(FYTCUser user, String firstName, String lastName, Date birthday, String avatar) {
		this.user = user;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
		this.avatar = avatar;
	}

	public FYTCUser getUser() {
		return user;
	}

	public void setUser(FYTCUser user) {
		this.user = user;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "AccountDetails [id=" + id + ", user=" + user + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", birthday=" + birthday + ", avatar=" + avatar + "]";
	}
	
}
