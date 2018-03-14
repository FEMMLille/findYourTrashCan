package fr.femm.findyourtrashcan.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Entity representing Rang in database
 * @author Francis Cornaire
 *
 */

@Entity
public class Rang {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@OneToOne
	private FYTCUser user;

	@OneToOne
	private RangType rangType;
	
	private int totalPoint;
	
	public Rang() {

	}

	public Rang(FYTCUser user, RangType rangType, int totalPoint) {
		super();
		this.user = user;
		this.rangType = rangType;
		this.totalPoint = totalPoint;
	}

	public FYTCUser getUser() {
		return user;
	}

	public void setUser(FYTCUser user) {
		this.user = user;
	}

	public RangType getRangType() {
		return rangType;
	}

	public void setRangType(RangType rangType) {
		this.rangType = rangType;
	}

	public int getTotalPoint() {
		return totalPoint;
	}

	public void setTotalPoint(int totalPoint) {
		this.totalPoint = totalPoint;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void increment(int i) {
	    setTotalPoint(getTotalPoint() + i);
	    if(getRangType().getId() != RangType.AMBASSADOR.getId()) {
        	    if(getTotalPoint() >= getRangType().getNecessaryPoint()) {
        		setRangType(RangType.getNextRankType(getRangType().getId()));
        	    }
	    }
	}

}
