package fr.femm.findyourtrashcan.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.femm.findyourtrashcan.data.RangType;
import fr.femm.findyourtrashcan.service.RangTypeService;


@RestController
@RequestMapping(value = "/api/rank-type", produces=MediaType.APPLICATION_JSON_VALUE)
public class RangTypeController {
    @Autowired
    RangTypeService rangTypeService;
    
    public final Logger logger = Logger.getLogger(RangTypeController.class);
    @CrossOrigin("*")
    @GetMapping("/{id}")
    public RangType getById(@PathVariable("id") final Integer id) {
	logger.info("WebService getRanTypekById [id : " + id + "]");
	return rangTypeService.getById(id);
    }
}
