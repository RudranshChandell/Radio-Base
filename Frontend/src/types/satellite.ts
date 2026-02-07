export type SatelliteInfo = {
    id:number;
    name:string;
    latitude:number;
    longitude:number;
    altitude:number;
    launchDate:string;
    status:"UPCOMING" | "CURRENT" | "PASSED";
    countdownSeconds:number|null;

};

export type SatelliteResponse = {
    latitude: number;
    longitude: number;
    satellites: SatelliteInfo[];
};