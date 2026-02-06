package com.RadioBase.Backend.services;

import com.RadioBase.Backend.client.N2YOClient;
import com.RadioBase.Backend.dto.N2yoPass;
import com.RadioBase.Backend.dto.N2yoRadioPassResponse;
import com.RadioBase.Backend.dto.SatelliteInfoDto;
import com.RadioBase.Backend.dto.SatelliteResponse;
import com.RadioBase.Backend.enums.SatelliteStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SatelliteService {

    private final N2YOClient n2YOClient;
    private final ObjectMapper objectMapper;

    private SatelliteInfoDto baseDto(
            N2yoSatellite sat,
            String status,
            Long countdownSeconds) {
        return SatelliteInfoDto.builder()
                .id(sat.getSatid())
                .name(sat.getSatname())
                .latitude(sat.getSatlat())
                .longitude(sat.getSatlng())
                .altitude(sat.getSatalt())
                .launchDate(sat.getLaunchDate())
                .status(SatelliteStatus.valueOf(status))
                .countdownSeconds(countdownSeconds)
                .build();
    }

    public SatelliteResponse getSatelliteAbove(double lat, double lon) {

        try {
            String rawJson = n2YOClient.fetchSatellitesAbove(lat, lon);

            N2yoAboveResponse parsed = objectMapper.readValue(rawJson, N2yoAboveResponse.class);

            List<SatelliteInfoDto> satellites = parsed.getAbove().stream()
                    .limit(10) // Limit to 10 to search more candidates for upcoming passes
                    .map(sat -> enrichWithCountdown(sat, lat, lon))
                    .filter(sat -> sat.getStatus() == SatelliteStatus.UPCOMING)
                    .toList();

            return SatelliteResponse.builder()
                    .latitude(lat)
                    .longitude(lon)
                    .satellites(satellites)
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Failed to process satellite data", e);
        }
    }

    public SatelliteInfoDto enrichWithCountdown(
            N2yoSatellite sat,
            double userLat,
            double userLon) {
        try {
            String rawPassJson = n2YOClient.fetchRadioPasses(sat.getSatid(), userLat, userLon);

            N2yoRadioPassResponse passResponse = objectMapper.readValue(rawPassJson, N2yoRadioPassResponse.class);

            if (passResponse.getPasses().isEmpty()) {
                return baseDto(sat, "PASSED", null);
            }

            long now = Instant.now().getEpochSecond();
            N2yoPass pass = passResponse.getPasses().get(0);

            // Look for the next upcoming pass if available
            for (N2yoPass p : passResponse.getPasses()) {
                if (p.getStartUTC() > now) {
                    pass = p;
                    break;
                }
            }

            SatelliteStatus status;
            Long countdown;

            if (now < pass.getStartUTC()) {
                status = SatelliteStatus.UPCOMING;
                countdown = pass.getStartUTC() - now;
            } else if (now <= pass.getEndUTC()) {
                status = SatelliteStatus.CURRENT;
                countdown = pass.getEndUTC() - now;
            } else {
                status = SatelliteStatus.PASSED;
                countdown = null;
            }

            return SatelliteInfoDto.builder()
                    .id(sat.getSatid())
                    .name(sat.getSatname())
                    .latitude(sat.getSatlat())
                    .longitude(sat.getSatlng())
                    .altitude(sat.getSatalt())
                    .launchDate(sat.getLaunchDate())
                    .status(status)
                    .countdownSeconds(countdown)
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Countdown calculation failed", e);
        }
    }

}
