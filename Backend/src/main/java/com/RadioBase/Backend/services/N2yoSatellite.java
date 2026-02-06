package com.RadioBase.Backend.services;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class N2yoSatellite {

    private int satid;
    private String satname;

    private double satlat;
    private double satlng;
    private double satalt;

    private String launchDate;

}
