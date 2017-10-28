package fr.femm.findyourtrashcan.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Entity representing Flags in database
 * @author Francis Cornaire
 *
 */

@Entity
public class Flags {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@OneToOne
	private Trashcan trashcan;

	private int countFlagEmpty;
	
	private int countFlagDoesntExist;
	
	private int countFlagExist;
	
	private int countFlagAnnoying;
	
	public Flags() {
		
	}

	public Flags(Trashcan trashcan, int countFlagEmpty, int countFlagDoesntExist, int countFlagExist,
			int countFlagAnnoying) {
		super();
		this.trashcan = trashcan;
		this.countFlagEmpty = countFlagEmpty;
		this.countFlagDoesntExist = countFlagDoesntExist;
		this.countFlagExist = countFlagExist;
		this.countFlagAnnoying = countFlagAnnoying;
	}

	public Trashcan getTrashcan() {
		return trashcan;
	}

	public void setTrashcan(Trashcan trashcan) {
		this.trashcan = trashcan;
	}

	public int getCountFlagEmpty() {
		return countFlagEmpty;
	}

	public void setCountFlagEmpty(int countFlagEmpty) {
		this.countFlagEmpty = countFlagEmpty;
	}

	public int getCountFlagDoesntExist() {
		return countFlagDoesntExist;
	}

	public void setCountFlagDoesntExist(int countFlagDoesntExist) {
		this.countFlagDoesntExist = countFlagDoesntExist;
	}

	public int getCountFlagExist() {
		return countFlagExist;
	}

	public void setCountFlagExist(int countFlagExist) {
		this.countFlagExist = countFlagExist;
	}

	public int getCountFlagAnnoying() {
		return countFlagAnnoying;
	}

	public void setCountFlagAnnoying(int countFlagAnnoying) {
		this.countFlagAnnoying = countFlagAnnoying;
	}

	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
		
	
}
