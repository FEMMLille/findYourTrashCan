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
    
    public static RangType NEWBIE = new RangType(0, "Novice", 10000);
    public static RangType INTERMEDIATE = new RangType(1, "Intermédaire", 30000);
    public static RangType CONFIRMED = new RangType(2, "Confirmé", 80000);
    public static RangType AMBASSADOR = new RangType(3, "Ambassadeur", 100000);

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

	public static RangType getNextRankType(Integer ranktypeId) {
	    switch(ranktypeId) {
	    case 0:return INTERMEDIATE;
	    case 1:return CONFIRMED;
	    case 2:return AMBASSADOR;
	    case 3:return AMBASSADOR;
	    default:return NEWBIE;
	    }
	}
	
}
