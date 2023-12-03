import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([])
  const sliderRef = useRef(); 

  useEffect(() => {
    async function fetchHotCollections() {
      const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      setHotCollections(data)
    }
    fetchHotCollections()
  }, [])
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
        color: "black !important", 
        background: "white",
        padding: "30px",
        borderRadius: "50%", 
        zIndex: "1",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        border: "1px solid black",
        right: "-50px",
      }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    rtl: true,
    arrows: true,
    swipe: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  //need to work on button styling and position
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider ref={sliderRef} {...settings}>
            {hotCollections.map((collections) => (
              <div key={collections.id} >
                <div className=" col-lg-12 col-md-12 col-xs-12" key={collections.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={collections.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={collections.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collections.title}</h4>
                      </Link>
                      <span>ERC-{collections.code}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
