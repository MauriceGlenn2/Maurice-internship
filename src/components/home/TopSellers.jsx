import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  AOS.init({ duration: 1000 });
  const [topSellers, setTopSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopSellers() {
      const { data } = await axios.get(' https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
      setTopSellers(data)
      console.log(data)
    }
    setTimeout(() => {
      fetchTopSellers()
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <section id="section-popular" className="pb-5" data-aos-easing="ease-in" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                  <div className="top__sell--loading--wrapper" key={index}>
                    <span>{index + 1}.</span>
                    <div className="author_list_pp loading__auth--pp--wrapper">
                      <div className="lazy pp-author top__sell--loading--img"></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info top__sell--text--loading ">
                      <span className="top__sell--auth--loading"></span>
                      <span className="top__sell--loading--price"></span>
                    </div>
                  </div>
                ))
              ) : (
                topSellers.map((seller, index) => (
                  <li key={index}>
                    <div className="author_list_pp" >
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>)
                ))}

            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
