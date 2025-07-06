package com.RadioBase.Backend.controller;

import com.RadioBase.Backend.services.SatelliteService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class LocationController {

    private final SatelliteService satelliteService;
    private final String frontendUrl;

    // ✅ Inject frontend.url from application.properties
    public LocationController(SatelliteService satelliteService, @Value("${frontend.url}") String frontendUrl) {
        this.satelliteService = satelliteService;
        this.frontendUrl = frontendUrl;
    }

    @PostMapping("/location")
    public String receiveLocation(@RequestBody Map<String,Object> payload) {
        double latitude = (double) payload.get("latitude");
        double longitude = (double) payload.get("longitude");

        System.out.println("The coordinates are: " + latitude + ", " + longitude);
        System.out.println("Frontend URL being used: " + frontendUrl); // Optional: just to confirm

        return satelliteService.getSatellitesAbove(latitude, longitude);
    }
}
