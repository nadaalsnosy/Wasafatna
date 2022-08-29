import Slider from "react-slick";

const IconsSlider = () => {

  var settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="bg-light-warning py-4">
      <Slider className="container" {...settings}>
        {(() => {
          let imgs = [];
          for (let i = 1; i <= 45; i++) {
            imgs.push(
              <img className="h-100 sliderImg" src={require(`../images/img${i}.png`)} alt="img1" />
            );
          }
          return imgs;
        })()}
      </Slider>
    </div>
  );
};

export default IconsSlider;
