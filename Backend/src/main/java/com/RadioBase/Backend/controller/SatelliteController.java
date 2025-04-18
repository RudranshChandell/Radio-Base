package com.RadioBase.Backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/satellites")
public class SatelliteController {
    private final String API_KEY = "CA2Q8L-6CSWXN-YWTG5A-5G8T";
    private final String BASE_URL = "https://api.n2yo.com/rest/v1/satellite/";

    @GetMapping("/above")
    public ResponseEntity<String> getSatellitesAbove(
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam double alt,
            @RequestParam int radius
    ) {
        String url = BASE_URL + "above/" + lat + "/" + lon + "/" + alt + "/" + radius + "/0&apiKey=" + API_KEY;

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);

        return ResponseEntity.ok(result);
    }
}
