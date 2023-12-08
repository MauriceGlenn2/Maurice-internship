import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const NewItems = () => {
  const [newItems, setNewItems] = useState([])
  const [countDowns, setCountDowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef();


  useEffect(() => {
    async function fetchNewItems() {
      const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      setNewItems(data)
    }
    function calculateCountdown(item) {
      const currentTime = Date.now();
      const timeDifferenceMillisLeft = item.expiryDate - currentTime;

      if (timeDifferenceMillisLeft <= 0) {
        return "00h 00m 00s";
      }
      const seconds = Math.floor(timeDifferenceMillisLeft / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      const secondsText = seconds % 60;
      const minutesText = minutes % 60;
      const hoursText = hours % 24;

      return `
      ${hoursText.toString().padStart(2, "0")}h 
      ${minutesText.toString().padStart(2, "0")}m 
      ${secondsText.toString().padStart(2, "0")}s`;
    }

    if (newItems.length > 0) {
      const newCountdowns = newItems.map((item) => calculateCountdown(item));
      setCountDowns(newCountdowns);

      const intervalId = setInterval(() => {
        const newCountdowns = newItems.map((item) => calculateCountdown(item));
        setCountDowns(newCountdowns);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    setTimeout(() => {
      fetchNewItems()
      setLoading(false)
    }, 10000)
  }, [newItems])

  //Slider Settings
  const next = () => {
    sliderRef.current.slickNext();
  }

  const previous = () => {
    sliderRef.current.slickPrev();
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: true,
    arrows: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: false,

        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <button className="slider__button--left" onClick={previous}><FontAwesomeIcon icon="fa-solid fa-chevron-left" /></button>
            <Slider ref={sliderRef} {...settings}>
              {loading ? (
                new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-12 col-md-12 col-xs-12" key={index}>
                  <div className="nft__item">
                        <div className="skeleton-box-img"></div>
                      <i className="fa fa-check loading__check--img--newI"></i>
                    <div className="nft__item_wrap nft__item_wrap--skeleton">
                      <div className="nft__item_extra">
                      </div>
                    </div>
                    <div className="nft__item_info">
                    <div className="skeleton-box--title"></div>
                      <div className=" nft__item_price skeleton-price"></div>
                      <div className="nft__item_like skeleton-heart"></div>
                    </div>
                  </div>
                </div>
             ) )): ( 
              newItems.map((items, index) => (
                <div className="col-lg-12 col-md-12 col-xs-12" key={items.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={items.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">{countDowns[index]}</div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <img
                          src={items.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{items.title}</h4>
                      </Link>
                      <div className="nft__item_price">{items.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{items.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )))
              
              }
            </Slider>
            <button className="slider__button--right" onClick={next}><FontAwesomeIcon icon="fa-solid fa-chevron-right" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
