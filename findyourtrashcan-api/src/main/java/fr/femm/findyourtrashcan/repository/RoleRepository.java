package fr.femm.findyourtrashcan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.femm.findyourtrashcan.data.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{
	
	public Role findByRoleName(String role);

}
