import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import ethereum from "../images/ethereum.svg";

const ItemDetails = () => {
  const { nftId } = useParams()
  const [itemDetails, setItemDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getItemDetails(nftId) {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
      console.log(data)
      setItemDetails(data);
      setLoading(false)
    }
    setTimeout(() => {
      getItemDetails(nftId)
    }, 3000)
     
    window.scrollTo(0, 0);
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
                <div className="row">
                  <div className="col-md-6 text-center">
                  <div className="item--loading--img"></div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                    <span className="item__para--loading--title"></span>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                        <span className="item__para--loading--icons"></span>
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                        <span className="item__para--loading--icons"></span>
                        </div>
                      </div>
                      <span className="item__para--loading"></span>
                      <span className="item__para--loading"></span>
                      <span className="item__para--loading"></span>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                                <img className="lazy" src='' alt="" />
                            </div>
                          <span className="author_list_info author_list_info--loading">
                            </span>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                            </div>
                          <span className="author_list_info author_list_info--loading">
                            </span>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                      <span className="author_list_info author_list_info--loading">
                        </span> 
                      </div>
                    </div>
                  </div>
                </div>
            ) : (
            <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={itemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{itemDetails.title}</h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetails.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetails.likes}
                      </div>
                    </div>
                    <p>
                     {itemDetails.description}
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              <img className="lazy" src={itemDetails.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.ownerId}`}>{itemDetails.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              <img className="lazy" src={itemDetails.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.creatorId}`}>{itemDetails.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={ethereum} alt="" />
                        <span>{itemDetails.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
