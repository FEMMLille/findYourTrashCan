package fr.femm.findyourtrashcan.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Role {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private boolean enabled;
	
	private String roleName;

	public Role() {
		
	}
	
	public Role(boolean enabled, String role) {
		this.enabled = enabled;
		this.roleName = role;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String role) {
		this.roleName = role;
	}

}
