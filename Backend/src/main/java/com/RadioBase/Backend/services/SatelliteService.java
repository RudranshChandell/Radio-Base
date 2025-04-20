package com.RadioBase.Backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class SatelliteService {
    private static final Logger logger = LoggerFactory.getLogger(SatelliteService.class);

    @Value("${API_KEY}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public SatelliteService() {
        this.restTemplate = new RestTemplate();
    }

    public String getSatellitesAbove(double lat, double lon) {
        try {
            String url = String.format(
                    "https://api.n2yo.com/rest/v1/satellite/above/%.4f/%.4f/0/90/18?apiKey=%s",
                    lat, lon, apiKey
            );
            
            logger.info("Fetching satellites for coordinates: lat={}, lon={}", lat, lon);
            String response = restTemplate.getForObject(url, String.class);
            
            return response;
        } catch (RestClientException e) {
            logger.error("Error fetching satellite data: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch satellite data: " + e.getMessage());
        }
    }
}
