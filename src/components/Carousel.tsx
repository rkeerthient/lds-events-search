
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages-components";
import Cta from "./cta";
import HoursText from "./HoursText";
import { BsPhone } from "react-icons/bs";

const Carousel = (props: any) => {
  const { data } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: props.slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data &&
        data.map((item: any, index: any) => (
          <div key={index} className="p-4 border flex flex-row">
            <div className="textClass flex-col flex justify-between leading-6 font-normal">
              <div className=" text-left text-sm ">
                {item.c_locationName && (
                  <div className="mt-4 font-semibold ">
                    {item.c_locationName.toUpperCase()}
                  </div>
                )}
                <div className="mt-4">
                  <div>{item.address.line1}</div>
                  <div>
                    {item.address.city}, {item.address.region} -{" "}
                    {item.address.postalCode}
                  </div>
                  <div className="underline hover:cursor-pointer">
                    {item.mainPhone &&
                      item.mainPhone
                        .replace("+1", "")
                        .replace(/\D+/g, "")
                        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                  </div>
                  {item.services && (
                    <ul className="servList mt-4 flex flex-row">
                      {item.services.map((nItem: any, index: number) => (
                        <li key={index}>{nItem}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-4">
                  {<HoursText document={item}></HoursText>}
                </div>
                <div className="mt-4">
                  <Cta
                    buttonText={"View Store Details"}
                    url={""}
                    style="secondary-cta"
                  ></Cta>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default Carousel;
