import { CardProps } from "@yext/search-ui-react";
import { BsClock, BsGlobe } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import { LiaDirectionsSolid } from "react-icons/lia";
import { MdOutlineRsvp } from "react-icons/md";
import Event from "../types/events";
import { useMapContext } from "./EventSearch";
import { useEffect } from "react";

const EventCard = ({ result }: CardProps<Event>) => {
  const { hoveredLocationId, setHoveredLocationId, clicked, setClicked } =
    useMapContext();
  const { name } = result;
  const {
    description,
    slug,
    time,
    venueName,
    landingPageUrl,
    address,
    isFreeEvent,
    id,
  } = result.rawData;
  const getLongDate = (input: string) => {
    let currDate = new Date(input);
    const month = currDate.toLocaleString("default", {
      month: "long",
    });
    return `${currDate.getDate()} ${month} ${currDate.getFullYear()}`;
  };

  const getDirectionsUrl = (addr?: any) => {
    const region = addr.region ? ` ${addr.region}` : ``;
    const rawQuery = `${addr.line1},${addr.city},${region} ${addr.postalCode} ${addr.countryCode}`;
    const query = encodeURIComponent(rawQuery);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}&output=classic`;
    return url;
  };

  return (
    <div
      onClick={() => setClicked(id)}
      onMouseEnter={() => {
        setHoveredLocationId(id), setClicked("");
      }}
      onMouseLeave={() => {
        setHoveredLocationId(""), setClicked("");
      }}
      className={`flex justify-between border-y p-4   ${
        hoveredLocationId === id ? "bg-gray-200" : ""
      }`}
    >
      <div className="flex flex-col ">
        <div className="flex w-full">
          <div className="flex flex-col justify-between gap-4 ">
            <a
              href={landingPageUrl}
              className="text-lg text-[#348daf] flex gap-4 items-center hover:underline"
            >
              {result.id} {name}
              {isFreeEvent && (
                <span className="bg-[#348daf] text-xs p-[2px] text-white">
                  Free
                </span>
              )}
            </a>
            <div className="flex items-center gap-2">
              <div>
                <BsClock />
              </div>
              <div className="  text-gray-600">
                {getLongDate(time.start)}-{time.start.split("T")[1]} to{" "}
                {getLongDate(time.end)}-{time.end.split("T")[1]}
              </div>
            </div>
            <div className="flex items-base gap-2">
              <div>
                <BsGlobe className="mt-2" />
              </div>
              <div className="flex flex-col text-gray-600 text-sm">
                <div className="  ">{venueName}</div>
                <div>{address?.line1}</div>
                <div>
                  {address?.city}, {address?.region} {address?.postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="flex flex-col justify-between gap-4  ">
            <div>{description}</div>
            <div className="flex gap-4  items-center justify-between">
              <div className="m-auto flex flex-col gap-6">
                <a
                  href={`/${slug}`}
                  className="w-28 uppercase bg-[#027da5] flex items-center gap-2  text-sm text-white hover:text-white border-2 border-[#027da5] hover:bg-[#027da5] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-1"
                >
                  <MdOutlineRsvp className="w-6 h-6" />
                  RSVP
                </a>
              </div>
              <div className="m-auto flex flex-col gap-6">
                <a
                  href={`/${slug}`}
                  className="w-28 uppercase bg-[#027da5] flex items-center gap-2  text-sm text-white hover:text-white border-2 border-[#027da5] hover:bg-[#027da5] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-1"
                >
                  <CiShare2 className="w-6 h-6" />
                  Share
                </a>
              </div>
              <a
                href={address ? getDirectionsUrl(address) : "#"}
                className="hover:cursor-pointer  px-3 py-1 border border-[#027da5] flex items-center gap-2 font-bold  text-[#027da5] w-fit hover:underline"
                target="_blank"
              >
                <LiaDirectionsSolid className="w-6 h-6" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
