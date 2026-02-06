package com.RadioBase.Backend.controller;

import com.RadioBase.Backend.dto.LocationRequest;
import com.RadioBase.Backend.dto.SatelliteResponse;
import com.RadioBase.Backend.services.SatelliteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class LocationController {

    private final SatelliteService satelliteService;

    @PostMapping("/location")
    public SatelliteResponse receiveLocation(@Valid @RequestBody LocationRequest request) {

        return satelliteService.getSatelliteAbove(request.getLatitude(), request.getLongitude());
    }
}
