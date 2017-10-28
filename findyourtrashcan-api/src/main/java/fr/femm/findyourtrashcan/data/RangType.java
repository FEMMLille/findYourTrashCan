package fr.femm.findyourtrashcan.data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entity representing RangType in database
 * @author Francis Cornaire
 *
 */

@Entity
public class RangType {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private String label;
	
	private Integer necessaryPoint;
	
	public RangType() {

	}

	public RangType(Integer id, String label, Integer necessaryPoint) {
		super();
		this.id = id;
		this.label = label;
		this.necessaryPoint = necessaryPoint;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Integer getNecessaryPoint() {
		return necessaryPoint;
	}

	public void setNecessaryPoint(Integer necessaryPoint) {
		this.necessaryPoint = necessaryPoint;
	}
	
}
