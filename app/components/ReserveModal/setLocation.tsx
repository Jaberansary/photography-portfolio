"use client";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
  { title: "La Jolla Beach", image: "/locations/LaJollaBeach.jpg" },
  { title: "Balboa Park", image: "/locations/Balboa Park.jpg" },
  { title: "Sunset Cliffs", image: "/locations/SunsetCliffs.jpg" },
  {
    title: "Torrey Pines State Reserve",
    image: "/locations/TorreyPinesState.jpg",
  },
  { title: "Coronado Island", image: "/locations/CoronadoIsland.jpg" },
  { title: "Photography Studio", image: "/locations/studio.jpg" },
  { title: "Client's Home", image: "/locations/ClientHome.jpg" },
];

type Props = {
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  customLocation: string;
  setCustomLocation: (val: string) => void;
};

const SetLocation: React.FC<Props> = ({
  selectedLocation,
  setSelectedLocation,
  customLocation,
  setCustomLocation,
}) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const [showMapModal, setShowMapModal] = useState(false);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  function LocationClick({ enabled }: { enabled: boolean }) {
    if (enabled) {
      useMapEvents({
        click(e) {
          const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
          setPosition(coords);
          setSelectedLocation("");
        },
      });
    }
    return null;
  }

  async function fetchAddressFromCoords(lat: number, lon: number) {
    setIsFetchingAddress(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      return data.display_name || `${lat}, ${lon}`;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return `${lat}, ${lon}`;
    } finally {
      setIsFetchingAddress(false);
    }
  }

  const handleConfirmLocation = async () => {
    if (!position) return;
    const [lat, lon] = position;
    const address = await fetchAddressFromCoords(lat, lon);
    setCustomLocation(address);
    setShowMapModal(false);
  };

  const defaultIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="flex flex-col space-y-6 max-h-[80vh]">
      <div className="overflow-y-auto max-h-[50vh] pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="grid grid-cols-2 gap-4 m-4">
          {locations.map((loc, index) => (
            <div
              key={index}
              className={`p-4 border rounded-xl shadow-md cursor-pointer transition-all hover:scale-105 ${
                selectedLocation === loc.title
                  ? "ring-4 ring-sky-400"
                  : "border-gray-300"
              }`}
              onClick={() => {
                setSelectedLocation(loc.title);
                setCustomLocation("");
              }}
            >
              {loc.image ? (
                <img
                  src={loc.image}
                  alt={loc.title}
                  className="rounded-lg mb-2 w-full h-32 object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-32 text-sky-600" />
              )}
              <p className="text-center font-semibold">{loc.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <label className="block mb-2 font-medium text-zinc-700">
          {selectedLocation === "Client's Home"
            ? "Enter your home address:"
            : "Or enter a custom location:"}
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Your custom location (or select on map)"
            value={customLocation}
            onChange={(e) => {
              setCustomLocation(e.target.value);
              if (selectedLocation !== "Client's Home") {
                setSelectedLocation("");
              }
            }}
            className="flex-1 border border-gray-300 rounded px-4 py-2 outline-none focus:border-sky-500"
          />
          <button
            onClick={() => setShowMapModal(true)}
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition whitespace-nowrap"
          >
            Choose on map
          </button>
        </div>
      </div>

      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[500px] p-4 relative">
            <button
              onClick={() => setShowMapModal(false)}
              className="absolute top-3 right-4 text-gray-600 text-xl hover:text-gray-800"
            >
              ✖
            </button>
            <div className="h-full w-full relative">
              <MapContainer
                center={[37.7749, -122.4194]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <LocationClick enabled={showMapModal} />
                {position && (
                  <Marker position={position} icon={defaultIcon}>
                    <Popup>
                      موقعیت انتخاب‌شده:
                      <br />
                      {position[0].toFixed(5)}, {position[1].toFixed(5)}
                    </Popup>
                  </Marker>
                )}
              </MapContainer>

              {position && (
                <button
                  onClick={handleConfirmLocation}
                  disabled={isFetchingAddress}
                  className="absolute z-[1000] bottom-4 left-1/2 transform -translate-x-1/2 bg-sky-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-sky-700 transition"
                >
                  {isFetchingAddress ? "Loading..." : "Confirm location "}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetLocation;
