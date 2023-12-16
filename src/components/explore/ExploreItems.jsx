import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import calculateCountdown from '../utils/CalculateCountdown';
import FetchExploreData from "../utils/FetchExploreData";
import FilterData from "../utils/FilterData";
import AOS from "aos";
import 'aos/dist/aos.css';

const ExploreItems = () => {
  AOS.init({ duration: 1000 });
  const [exploredItems, setExploredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countDowns, setCountDowns] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [filter, setFilter] = useState("")

  useEffect(() => {
    if (filter) {
      setLoading(true);
      async function getFilteredItems() {
        const data = await FilterData(filter);
        console.log(data);
        setExploredItems(data);
      }
      setTimeout(() => {
        getFilteredItems();
        setLoading(false);
      }, 3000);
    }
  }, [filter]);

  useEffect(() => {
    async function getExploredItems() {
      const data = await FetchExploreData()
      setExploredItems(data)
    }
    if (exploredItems.length > 0) {
      const newCountdowns = exploredItems.map((item) => calculateCountdown(item));
      setCountDowns(newCountdowns);

      const intervalId = setInterval(() => {
        
        const newCountdowns = exploredItems.map((item) => calculateCountdown(item));
        setCountDowns(newCountdowns);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    setTimeout(() => {
      getExploredItems()
      setLoading(false)
    }, 2000)
  }, [exploredItems]);

  function loadMoreNftsButton() {
    setDisplayCount(displayCount + 4);
  }

  return (
    <>
      <div>
        <select value={filter} onChange={e => setFilter(e.target.value)} id="filter-items">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" data-aos="fade-up" 
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item loading__explore--item">
            </div>
          </div>)))
        :
        (exploredItems.slice(0, displayCount).map((explored, index) => (
          <div
            key={explored.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${explored.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={explored.authorImage} alt="" />
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
                <Link to={`/item-details/${explored.nftId}`}>
                  <img src={explored.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${explored.nftId}`}>
                  <h4>{explored.title}</h4>
                </Link>
                <div className="nft__item_price">{explored.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{explored.likes}</span>
                </div>
              </div>
            </div>
          </div>)
        ))}
      {displayCount === 16 ?  (<di></di>)
      :
      (<div className="col-md-12 text-center">
        <Link onClick={loadMoreNftsButton} to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>)
       
      }
    </>
  );
};

export default ExploreItems;
