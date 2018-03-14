package fr.femm.findyourtrashcan.data;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Entity representing AccountDetails in database
 */

@Entity
public class AccountDetails {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@OneToOne(cascade = CascadeType.ALL)
	private FYTCUser user;

	private String firstName;
	
	private String lastName;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date birthday;
	
	private String avatar;
	
	public AccountDetails() {
		
	}
	
	public FYTCUser getUser() {
		return user;
	}

	public void setUser(final FYTCUser user) {
		this.user = user;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(final String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(final String lastName) {
		this.lastName = lastName;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(final Date birthday) {
		this.birthday = birthday;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(final String avatar) {
		this.avatar = avatar;
	}

	public Integer getId() {
		return id;
	}

	public void setId(final Integer id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "AccountDetails [id=" + id + ", user=" + user + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", birthday=" + birthday + ", avatar=" + avatar + "]";
	}
	
}
