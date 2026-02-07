import { SatelliteResponse } from "@/types/satellite";

export async function fetchSatellites(
  latitude: number,
  longitude: number
): Promise<SatelliteResponse> {
  // Use the Next.js proxy to avoid CORS and hardcoded ports in specific files
  const res = await fetch("/api/proxy/location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude,
      longitude,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Backend returned status ${res.status}: ${errorBody}`);
    throw new Error(`Failed to fetch satellites: Status ${res.status}`);
  }

  return res.json();
}
