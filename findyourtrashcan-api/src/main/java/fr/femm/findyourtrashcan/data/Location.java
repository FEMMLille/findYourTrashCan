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
	
	private Point coordinate;
	
	public Location() {
		
	}

	public Location(Integer code, String label, Point coordinate) {
		super();
		this.code = code;
		this.label = label;
		this.coordinate = coordinate;
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

	public Point getCoordinate() {
		return coordinate;
	}

	public void setCoordinate(Point coordinate) {
		this.coordinate = coordinate;
	}
	
}
