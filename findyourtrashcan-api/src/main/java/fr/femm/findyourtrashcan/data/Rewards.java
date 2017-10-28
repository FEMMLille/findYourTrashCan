package fr.femm.findyourtrashcan.data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Entity representing Rewards in database
 * @author Francis Cornaire
 *
 */

@Entity
public class Rewards {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@OneToOne
	private RangType rangType;

	private String label;
	
	public Rewards() {
		
	}

	public Rewards(Integer id, RangType rangType, String label) {
		super();
		this.id = id;
		this.rangType = rangType;
		this.label = label;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public RangType getRangType() {
		return rangType;
	}

	public void setRangType(RangType rangType) {
		this.rangType = rangType;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

}
