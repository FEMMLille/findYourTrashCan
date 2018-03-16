package fr.femm.findyourtrashcan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.Location;
import fr.femm.findyourtrashcan.service.LocationService;

@RestController
@RequestMapping("/api/location")
public class LocationController {
    
    @Autowired
    private LocationService locationService;
    
    @CrossOrigin("*")
    @GetMapping("/{code}")
    public Location getLocationFromCode(@PathVariable("code") Integer code) {
	return locationService.getLocation(code);
    }
}
