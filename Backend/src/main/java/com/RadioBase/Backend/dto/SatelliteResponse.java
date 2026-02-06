package com.RadioBase.Backend.dto;

import com.RadioBase.Backend.services.SatelliteService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class SatelliteResponse {
    private final double latitude;
    private final double longitude;
    private List<SatelliteInfoDto> satellites;
}
