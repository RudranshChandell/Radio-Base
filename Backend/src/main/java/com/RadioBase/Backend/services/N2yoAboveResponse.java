package com.RadioBase.Backend.services;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class N2yoAboveResponse {

    private List<N2yoSatellite> above;
}
