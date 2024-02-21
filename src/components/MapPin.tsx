// you need to install react icons (npm i react-icons) to use this icon
import { HiMapPin } from "react-icons/hi2";
import { PinComponent, Coordinate } from "@yext/search-ui-react";
import { Popup, LngLatLike } from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
// transforms the Yext Display Coordiate into the format that Mapbox expects
const transformToMapboxCoord = (coordinate: Coordinate): LngLatLike => ({
  lng: coordinate.longitude,
  lat: coordinate.latitude,
});

const MapPin: PinComponent<Location> = (props) => {
  const { mapbox, result } = props;

  const yextCoordinate = result.rawData.yextDisplayCoordinate;

  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  useEffect(() => {
    if (active && yextCoordinate) {
      popupRef.current
        .setLngLat(transformToMapboxCoord(yextCoordinate))
        .setText(result.name || "unknown location")
        .addTo(mapbox);
    }
  }, [active, mapbox, result, yextCoordinate]);

  // create a callback to open the popup on click
  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    // return the pin component with the onClick handler
    <HiMapPin
      className="h-[41px] w-[27px]"
      fill="#172554"
      onClick={handleClick}
    />
  );
};

export default MapPin;
