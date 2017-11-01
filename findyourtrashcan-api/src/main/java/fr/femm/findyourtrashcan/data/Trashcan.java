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
	
	private Point coordinate;
	
	private String picture;
	
	@OneToOne
	private Location location;

	public Trashcan() {

	}

	public Trashcan(Integer id, TrashcanType trashcanType, GarbageType garbageType, boolean isEmpty,
			Point coordinate, String picture, Location location) {
		super();
		this.id = id;
		this.trashcanType = trashcanType;
		this.garbageType = garbageType;
		this.isEmpty = isEmpty;
		this.coordinate = coordinate;
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

	public Point getCoordinate() {
		return coordinate;
	}

	public void setCoordinate(Point coordinate) {
		this.coordinate = coordinate;
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