package fr.femm.findyourtrashcan.data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entity representing GarbageType in database
 * @author Francis Cornaire
 *
 */

@Entity
public class GarbageType {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private String label;
	
	public GarbageType() {
		
	}

	public GarbageType(Integer id, String label) {
		super();
		this.id = id;
		this.label = label;
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
	
	@Override
	public String toString() {
	    return "[ GarbageType" + getId()
	    	+ "\nLabel : " + getLabel() + " ]";
	}
	
}
