import "./App.css";
import Modal from "react-modal";
import React, { useState } from "react";
import Parser from "html-react-parser";
import styles from "./modal.css.js";
import { SRLWrapper } from "simple-react-lightbox";

var header;
var content = "";
var Clicks = 0;
var imageGallery = "";
var blacklistedCells = [];
var trendingCells = [];
var awaitlimit = 0;
const restrictedValues = ["N/A", "Click and Register"];

const lbOptions = {
    buttons: {
        showAutoplayButton: false,
        showThumbnailsButton: false,
        showFullscreenButton: false,
        iconColor: "rgb(1, 215, 112)",
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    caption: {
        showCaption: false,
    },
    thumbnails: {
        showThumbnails: false,
    },
};

function view() {
    const url = "https://h56f7ezpse.execute-api.us-west-2.amazonaws.com/dev/other/patch/type=visits";
    fetch(url, {
        method: "PATCH",
    }).catch((err) => {
        console.log("Visit request 24 hour limit reached");
    });
}

async function getSort() {
    const url = "https://h56f7ezpse.execute-api.us-west-2.amazonaws.com/dev/other/alldata";
    const request = await fetch(url);
    const data = await request.json();
    return data;
}

// Take and sort data from the api into an Object
async function componendDidMount() {
    const url = "https://h56f7ezpse.execute-api.us-west-2.amazonaws.com/dev/sites/allsites";
    const response = await fetch(url);
    let data = await response.json();
    data = data.sort((a, b) => b.clicks - a.clicks);
    const sites = {};
    data.forEach((site) => {
        sites[site.name] = site;
        sites[site.name].gall = [];
        // Adds an image lightbox if there's one present in the context
        site.gallery.forEach((ctx) => {
            let title = ctx.split("/");
            title = title[title.length - 1].split(".")[0];
            sites[site.name].gall.push(
                <a href={ctx} title={title} key={title}>
                    <img src={ctx} alt={ctx} />
                </a>
            );
        });
        if (sites[site.name].gall.length < 1) {
            sites[site.name].gall.push(
                <div className="popoutImage" key="comingsonn">
                    <a href="https://i.ibb.co/Snn1jJv/Image-Coming-Soon.png" title="comingsoon">
                        <img src="https://i.ibb.co/yyyM9Vs/Image-Coming-Soon.png" alt="comingsoon" />
                    </a>
                </div>
            );
        }
    });
    return sites;
}

var sorting = getSort();
var max = 0;
var sites = componendDidMount();
view();

export default function App() {
    var [opacity, opacityState] = useState("0");
    var [copied, copyState] = useState("Copied");
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
            const url = `https://h56f7ezpse.execute-api.us-west-2.amazonaws.com/dev/sites/patch/id=${sites[event.target.id]._id}`;
            await fetch(url, {
                method: "PATCH",
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

    function copy(event) {
        let className = event.target.className;
        navigator.clipboard.writeText(className);
        opacityState("1");
        copyState(`'${className}' Copied`);
        setTimeout(() => {
            opacityState("0");
        }, 3000);
    }

    const [isOpen, setIsOpen] = React.useState(false);
    (async () => {
        var categories = {
            trending: [],
            gambling: [],
            adwall: [],
            marketplace: [],
        };
        if (awaitlimit < 1) {
            sorting = await sorting;
            blacklistedCells = await sorting[0].blacklist;
            trendingCells = await sorting[0].trending;
            sites = await sites;
        }
        awaitlimit += 1;
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
                        <p
                            onClick={restrictedValues.indexOf(sites[key].refferal) === -1 ? copy : null}
                            id={sites[key].name}
                            className={sites[key].refferal}
                        >
                            {sites[key].refferal}
                        </p>
                    </div>
                </div>
            );
            if (blacklistedCells.indexOf(sites[key].name) === -1) {
                categories[sites[key].type].push(contextCell);
                if (trendingCells.indexOf(sites[key].name) !== -1) {
                    categories.trending.push(contextCell);
                }
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
                        <div className="scrollContainer">
                            <div className="popoutImage">
                                <SRLWrapper options={lbOptions}>{imageGallery}</SRLWrapper>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="copied" style={{ opacity: opacity }}>
                <h1>{copied}</h1>
            </div>
        </div>
    );
}
