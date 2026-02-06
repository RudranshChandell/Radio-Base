package com.RadioBase.Backend.client;

import com.RadioBase.Backend.exception.SatelliteApiException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class N2YOClient {

        private static final Logger logger = LoggerFactory.getLogger(N2YOClient.class);

        private static final String N2YO_ABOVE_API = "https://api.n2yo.com/rest/v1/satellite/above/%.4f/%.4f/0/90/18?apiKey=%s";

        private final RestTemplate restTemplate;

        @Value("${API_KEY}")
        private String apiKey;

        public String fetchRadioPasses(int satId, double lat, double lon) {

                String url = String.format(
                                "https://api.n2yo.com/rest/v1/satellite/radiopasses/%d/%.4f/%.4f/0/2/0?apiKey=%s",
                                satId, lat, lon, apiKey);

                return restTemplate.getForObject(url, String.class);
        }

        public String fetchSatellitesAbove(double latitude, double longitude) {
                try {
                        String url = String.format(
                                        N2YO_ABOVE_API,
                                        latitude,
                                        longitude,
                                        apiKey);

                        logger.info(
                                        "Calling N2YO API for coordinates: lat={}, lon={}",
                                        latitude,
                                        longitude);

                        return restTemplate.getForObject(url, String.class);

                } catch (RestClientException e) {
                        logger.error("Failed to fetch satellite data from N2YO", e);
                        throw new SatelliteApiException(
                                        "N2YO API call failed",
                                        e);
                }
        }
}
