import { CardProps } from "@yext/search-ui-react";
import Event from "../types/events";
import { BsClock, BsGlobe } from "react-icons/bs";
const EventCard = ({ result }: CardProps<Event>) => {
  const { name } = result;
  const {
    description,
    slug,
    c_heroImage,
    c_photo,
    time,
    venueName,
    landingPageUrl,
  } = result.rawData;
  const getLongDate = (input: string) => {
    let currDate = new Date(input);
    const month = currDate.toLocaleString("default", {
      month: "long",
    });

    return `${currDate.getDate()} ${month} ${currDate.getFullYear()}`;
  };
  return (
    <div className="border flex  justify-between gap-4 p-4">
      <div className="flex flex-col ">
        <div className="flex w-full">
          <div className="flex flex-col justify-between gap-2 ">
            <a href={landingPageUrl} className="text-lg text-[#348daf]">
              {name}
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
            <div className="flex items-center gap-2">
              <div>
                <BsGlobe />
              </div>
              <div className="  text-gray-600">{venueName}</div>
            </div>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="flex flex-col justify-between gap-2 ">
            <div>{description}</div>
            <div className="flex   gap-4 w-1/4">
              <div className="m-auto flex flex-col gap-6">
                <a
                  href={`/${slug}`}
                  className="w-28 uppercase bg-[#027da5] text-sm text-white hover:text-white border-2 border-[#027da5] hover:bg-[#027da5] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-1"
                >
                  RSVP
                </a>
              </div>{" "}
              <div className="m-auto flex flex-col gap-6">
                <a
                  href={`/${slug}`}
                  className="w-28 uppercase bg-[#027da5] text-sm text-white hover:text-white border-2 border-[#027da5] hover:bg-[#027da5] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-1"
                >
                  Share
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
