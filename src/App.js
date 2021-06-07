import "./App.css";
import Modal from "react-modal";
import React, { useState } from "react";
import Parser from "html-react-parser";
import styles from "./modal.css.js";
import { SRLWrapper } from "simple-react-lightbox";

var trendingCells = ["freeskins", "stake", "csgopolygon", "csgoroll"];
var header;
var content = "";
var Clicks = 0;
var imageGallery = "";
const lbOptions = {
  buttons: {
    showAutoplayButton: false,
  },
  caption: {
    showCaption: false,
  },
};

// Take and sort data from the api into an Object
async function componendDidMount() {
  const url = "https://bitcodesapi.herokuapp.com/sites/allsites";
  const response = await fetch(url);
  const data = await response.json();
  const sites = {};
  data.forEach((site) => {
    sites[site.name] = site;
    sites[site.name].gall = [];
    // Adds an image lightbox if there's one present in the context
    site.gallery.forEach((ctx) => {
      sites[site.name].gall.push(
        <div className="popoutImage" key={ctx}>
          <a href={ctx}>
            <img src={ctx} alt={ctx} />
          </a>
        </div>
      );
    });
    if (sites[site.name].gall.length < 1) {
      sites[site.name].gall.push(
        <div className="popoutImage" key="comingsonn">
          <a href="https://i.ibb.co/Snn1jJv/Image-Coming-Soon.png">
            <img src="https://i.ibb.co/yyyM9Vs/Image-Coming-Soon.png" alt="comingsoon" />
          </a>
        </div>
      );
    }
  });
  return sites;
}

var max = 0;
var sites = componendDidMount();

export default function App() {
  var [trending, trendingState] = useState(
    <svg viewBox="0 0 50 50" className="spinner">
      <circle className="ring" cx="25" cy="25" r="22.5" />
      <circle className="line" cx="25" cy="25" r="22.5" />
    </svg>
  );
  var [gambling, gamblingState] = useState(
    <svg viewBox="0 0 50 50" className="spinner">
      <circle className="ring" cx="25" cy="25" r="22.5" />
      <circle className="line" cx="25" cy="25" r="22.5" />
    </svg>
  );
  var [adwall, adwallState] = useState(
    <svg viewBox="0 0 50 50" className="spinner">
      <circle className="ring" cx="25" cy="25" r="22.5" />
      <circle className="line" cx="25" cy="25" r="22.5" />
    </svg>
  );
  var [marketplace, marketplaceState] = useState(
    <svg viewBox="0 0 50 50" className="spinner">
      <circle className="ring" cx="25" cy="25" r="22.5" />
      <circle className="line" cx="25" cy="25" r="22.5" />
    </svg>
  );
  // Update the click value when a site is clicked
  async function sendClick(event) {
    try {
      const url = `https://bitcodesapi.herokuapp.com/sites/patch/id=${sites[event.target.id]._id}`;
      await fetch(url, {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: { clicks: 1 },
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  // Update all the modal values when a modal is opened
  function toggleModal(event) {
    header = event.target.id.charAt(0).toUpperCase() + event.target.id.slice(1);
    if (event.target.id.length !== 0 && event.target.id !== "exit") {
      imageGallery = sites[event.target.id].gall;
      content = Parser(sites[event.target.id].information);
      Clicks = sites[event.target.id].clicks;
    }
    setIsOpen(!isOpen);
  }

  const [isOpen, setIsOpen] = React.useState(false);

  (async () => {
    var categories = {
      trending: [],
      gambling: [],
      adwall: [],
      marketplace: [],
    };
    sites = await sites;
    Object.keys(sites).forEach((key) => {
      var contextCell = (
        <div className="cell" key={key}>
          <div className="cellImage">
            <a href={sites[key].href} rel="noreferrer" target="_blank">
              <img src={sites[key].image} alt={sites[key].alt} onClick={sendClick} id={sites[key].name} />
            </a>
          </div>
          <hr />
          <div className="cellDesc">
            <p>{sites[key].description}</p>
            <button onClick={toggleModal} id={sites[key].name}>
              More
            </button>
          </div>
          <hr />
          <div className="cellRef">
            <p>{sites[key].refferal}</p>
          </div>
        </div>
      );
      categories[sites[key].type].push(contextCell);
      if (trendingCells.indexOf(sites[key].name) !== -1) {
        categories.trending.push(contextCell);
      }
    });
    if (max < 1) {
      trendingState(categories.trending);
      gamblingState(categories.gambling);
      adwallState(categories.adwall);
      marketplaceState(categories.marketplace);
      max += 1;
    }
  })();

  return (
    <div className="content">
      <div className="trending">
        <h1 className="cellHeader" id="trendingHeader">
          Trending
        </h1>
        <div className="trenCells">{trending}</div>
      </div>
      <div className="gambling">
        <div>
          <h1 className="cellHeader" id="gamblingHeader">
            Gambling
          </h1>
        </div>
        <div className="gambCells">{gambling}</div>
      </div>
      <div className="adwall">
        <div>
          <h1 className="cellHeader" id="adwallHeader">
            Earn Money
          </h1>
        </div>
        <div className="adwaCells">{adwall}</div>
      </div>
      <div className="marketplace">
        <div>
          <h1 className="cellHeader" id="marketHeader">
            Marketplace/Trading
          </h1>
        </div>
        <div className="markCells">{marketplace}</div>
      </div>
      <div className="modal">
        <Modal portalClassName="popout" isOpen={isOpen} onRequestClose={toggleModal} ariaHideApp={false} style={styles}>
          <img src="./images/exit.svg" alt="exit" onClick={toggleModal} id="exit" />
          <div id="clicks">Clicks: {Clicks}</div>
          <div id="popoutHead">
            <h1 id="heading">{header}</h1>
          </div>
          <div id="popoutContent">
            <section id="content">
              <div className="cellInfo">{content}</div>
            </section>
            <div className="sliderWrapper">
              <div className="sliderContainer">
                <div className="sliderImage">
                  <SRLWrapper options={lbOptions}>{imageGallery}</SRLWrapper>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
