import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import FetchAuthorData from "../components/utils/FetchAuthorData";

const Author = () => {
const { authorId } = useParams()
const [author, setAuthor] = useState([null])
const [followers, setFollowers] = useState(0)
const [isfollowing, setIsFollowing] = useState(false)

useEffect(() => {
async function getAuthor() {
  const data = await FetchAuthorData(authorId)
  setAuthor(data)
}
getAuthor()
}, [])

function handleFollowers() {
  if (!isfollowing){
    author.followers = author.followers + 1
  }
  else{
    author.followers = author.followers - 1
  }
  setIsFollowing(!isfollowing)
}
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                      <Link to="#" onClick={handleFollowers} 
                        
                      className="btn-main">
                        {isfollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftCollection={author.nftCollection} authorImage={author.authorImage}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
