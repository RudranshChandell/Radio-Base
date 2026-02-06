package com.RadioBase.Backend.dto;

import com.RadioBase.Backend.enums.SatelliteStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SatelliteInfoDto {

    private final int id;
    private final String name;

    private final double latitude;
    private final double longitude;
    private final double altitude;

    private final String launchDate;

    private final SatelliteStatus status; // UPCOMING / CURRENT / PASSED
    private final Long countdownSeconds;
}
