package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.femm.findyourtrashcan.data.Grade;

/**
 * Interface for DB operation on Grade data
 * @author Francis Cornaire
 *
 */

public interface GradeRepository extends JpaRepository<Grade, Integer>{

}
