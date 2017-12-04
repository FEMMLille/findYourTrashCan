package fr.femm.findyourtrashcan.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.springframework.data.geo.Point;

/**
 * Entity representing Trashcan in database
 * @author Francis Cornaire
 *
 */

@Entity
public class Trashcan {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@OneToOne
	private TrashcanType trashcanType;

	@OneToOne
	private GarbageType garbageType;

	private boolean isEmpty;
	
	private Double latitude;
	
	private Double longitude;
	
	private String picture;
	
	@OneToOne
	private Location location;

	public Trashcan() {

	}

	public Trashcan(Integer id, TrashcanType trashcanType, GarbageType garbageType, boolean isEmpty, Double latitude,
			Double longitude, String picture, Location location) {
		this.id = id;
		this.trashcanType = trashcanType;
		this.garbageType = garbageType;
		this.isEmpty = isEmpty;
		this.latitude = latitude;
		this.longitude = longitude;
		this.picture = picture;
		this.location = location;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public TrashcanType getTrashcanType() {
		return trashcanType;
	}

	public void setTrashcanType(TrashcanType trashcanType) {
		this.trashcanType = trashcanType;
	}

	public GarbageType getGarbageType() {
		return garbageType;
	}

	public void setGarbageType(GarbageType garbageType) {
		this.garbageType = garbageType;
	}

	public boolean isEmpty() {
		return isEmpty;
	}

	public void setEmpty(boolean isEmpty) {
		this.isEmpty = isEmpty;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

}
