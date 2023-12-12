import React from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

const LandingIntro = () => {
  AOS.init({duration: 1000});
  return (
    <section id="section-intro" className="no-top no-bottom" data-aos-easing="ease-in">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_wallet" data-aos="fade-up"></i>
              <div className="text">
                <h4 className="" data-aos="fade-up" data-aos-delay="200">Set up your wallet</h4>
                <p data-aos="fade-up" data-aos-delay="200">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_wallet" data-aos="fade-up"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_cloud-upload_alt" data-aos="fade-up"></i>
              <div className="text">
                <h4 className="" data-aos="fade-up" data-aos-delay="200">Add your NFT's</h4>
                <p data-aos="fade-up" data-aos-delay="200">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_cloud-upload_alt" ></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i className="bg-color-2 i-boxed icon_tags_alt" data-aos="fade-up"></i>
              <div className="text">
                <h4 className="" data-aos="fade-up" data-aos-delay="200">Sell your NFT's</h4>
                <p data-aos="fade-up" data-aos-delay="200">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_tags_alt"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
