package com.RadioBase.Backend.controller;

import com.RadioBase.Backend.services.SatelliteService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LocationController {

    private final SatelliteService satelliteService;

    public LocationController(SatelliteService satelliteService) {
        this.satelliteService = satelliteService;
    }

    @PostMapping("/location")
    public String receiveLocation(@RequestBody Map<String,Object> payload) {
        double latitude=(double)payload.get("latitude");
        double longitude=(double)payload.get("longitude");

        System.out.println("The coordinates are: " + latitude + ", " + longitude);

        return satelliteService.getSatellitesAbove(latitude,longitude);
    }
}
