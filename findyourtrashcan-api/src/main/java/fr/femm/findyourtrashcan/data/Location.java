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
	
	private Float latitude;
	
	private Float longitude;

	public Location() {
		
	}

	public Location(Integer code, String label, Float latitude, Float longitude) {
		super();
		this.code = code;
		this.label = label;
		this.latitude = latitude;
		this.longitude = longitude;
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

	public Float getLatitude() {
		return latitude;
	}

	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	public Float getLongitude() {
		return longitude;
	}

	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}

}
