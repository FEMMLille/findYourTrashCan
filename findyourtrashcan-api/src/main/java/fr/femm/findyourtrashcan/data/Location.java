package fr.femm.findyourtrashcan.data;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.data.geo.Point;

/**
 * Entity representing Location in database
 * @author Francis Cornaire
 *
 */

@Entity
public class Location {

	@Id
	private Integer code;

	private String label;
	
	private float lat;
	
	private float lon;
	
	private String webContact;
	
	private String webInformations;

	public Location() {
		
	}

	public Location(Integer code, String label, float lat, float lon, String webContact, String webInformations) {
		super();
		this.code = code;
		this.label = label;
		this.lat = lat;
		this.lon = lon;
		this.webContact = webContact;
		this.webInformations = webInformations;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
	
	public float getLat() {
		return lat;
	}

	public void setLat(float lat) {
		this.lat = lat;
	}
	
	public float getLon() {
		return lon;
	}

	public void setLon(float lon) {
		this.lon = lon;
	}	
	
	
	
	public String getWebContact() {
	    return webContact;
	}

	public void setWebContact(String webContact) {
	    this.webContact = webContact;
	}

	public String getWebInformations() {
	    return webInformations;
	}

	public void setWebInformations(String webInformations) {
	    this.webInformations = webInformations;
	}

	@Override
	public String toString() {
	    return "[ Location" + getCode()
	    	+ "\nLabel : " + getLabel()
	    	+ "\nLat : " + getLat()
	    	+ "\nLon : " + getLon() 
	    	+ "\nwebinformations : " + getWebInformations()
	    	+ "\nwebContact : " + getWebContact()+ " ]";
	}
}
