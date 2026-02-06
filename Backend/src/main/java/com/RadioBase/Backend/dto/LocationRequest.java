package com.RadioBase.Backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationRequest {

    @NotNull
    @Min(-90)
    @Max(90)
    private Double Longitude;

    @NotNull
    @Min(-90)
    @Max(90)
    private Double Latitude;
}
