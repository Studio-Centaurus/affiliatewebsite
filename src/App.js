import "./App.css";
import IMAGES from "./images/index.js";

/* Format: {
    Image link,
    Image alt text,
    Link to website,
    Quick description,
    Refferal code,
    Type of site
}
} */
let data = {
    sites: [
        {
            dotaexpert: {
                image: IMAGES.DOTAEXPERT.img,
                alt: IMAGES.DOTAEXPERT.alt,
                href: "https://dota2expert.com/r/ODcxOTE",
                description: "$0.26",
                refferal: "ODcxOTE",
                type: "gambling",
            },
        },
        {
            freeskins: {
                name: "freeskins",
                image: IMAGES.FREESKINS.img,
                alt: IMAGES.FREESKINS.alt,
                href: "https://freeskins.com/r/FREECODES/",
                description: "+$0.10 bonus",
                refferal: "FREECODES",
                type: "addwall",
            },
        },
        {
            swagbucks: {
                image: IMAGES.SWAGBUCKS.img,
                alt: IMAGES.SWAGBUCKS.alt,
                href: "https://www.swagbucks.com/lp-savings-button?cmp=695&cxid=swagbuttonref&rb=103715075&extRefCmp=1&extRb=103715075",
                description: "300sb bonus",
                refferal: "FREECODESFREE",
            },
        },
        {
            bitskins: {
                name: "BitSkins",
                image: IMAGES.BITSKINS.img,
                alt: IMAGES.BITSKINS.alt,
                href: "bskn.co/?ref_alias=FREECODES",
                description: "5% bonus",
                refferal: "FREECODES",
            },
        },
        {
            stake: {
                image: IMAGES.STAKE.img,
                alt: IMAGES.STAKE.alt,
                href: "https://stake.com/?c=freecodesfree",
                description: "BLANK",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            csgoempire: {
                image: IMAGES.CSGOEMPIRE.img,
                alt: IMAGES.CSGOEMPIRE.alt,
                href: "https://csgoempire.com/r/freecodesfree",
                description: "BLANK",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            csgopolygon: {
                image: IMAGES.CSGOPOLYGON.img,
                alt: IMAGES.CSGOPOLYGON.alt,
                href: "https://csgopolygon.com/",
                description: "BLANK",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            csgo500: {
                image: IMAGES.CSGO500.img,
                alt: IMAGES.CSGO500.alt,
                href: "https://csgo500.com/r/freecodesfree",
                description: "BLANK",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            wtfskins: {
                image: IMAGES.WTFSKINS.img,
                alt: IMAGES.WTFSKINS.alt,
                href: "https://wtfskins.com",
                description: "$.25 Despostet",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            csgolive: {
                image: IMAGES.CSGOLIVE.img,
                alt: IMAGES.CSGOLIVE.alt,
                href: "https://www.csgolive.com/home",
                description: "BLANK",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            idleempire: {
                image: IMAGES.IDLEEMPIRE.img,
                alt: IMAGES.IDLEEMPIRE.alt,
                href: "https://www.idle-empire.com?r=freecodes",
                description: "BLANK",
                refferal: "freecodes",
                type: "adwall",
            },
        },
        {
            hellcase: {
                image: IMAGES.HELLCASE.img,
                alt: IMAGES.HELLCASE.alt,
                href: "https://hellcase.com/ffreecodesfree",
                description: "BLANK",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            datdrop: {
                image: IMAGES.DATDROP.img,
                alt: IMAGES.DATDROP.alt,
                href: "https://datdrop.com/p/freecodesfree",
                description: "5% deposit bonus",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            csgoatse: {
                image: IMAGES.CSGOATSE.img,
                alt: IMAGES.CSGOATSE.alt,
                href: "https://csgoatse.com/#ref=freecodesfree",
                description: "$1 Depostet",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            zorgogames: {
                image: IMAGES.ZORGO.img,
                alt: IMAGES.ZORGO.alt,
                href: "https://zorgo.games/p/freecodesfree",
                description: "BLANK",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            csgoprime: {
                image: IMAGES.CSGOPRIME.img,
                alt: IMAGES.CSGOPRIME.alt,
                href: "https://csgoprime.com/r/freecodes",
                description: "BLANK",
                refferal: "freecodes",
                type: "gambling",
            },
        },
        {
            gamdom: {
                image: IMAGES.GAMDOM.img,
                alt: IMAGES.GAMDOM.alt,
                href: "https://csgoprime.com/r/freecodes",
                description: "Free case up to 50$",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        {
            csgoroll: {
                image: IMAGES.CSGOROLL.img,
                alt: IMAGES.CSGOROLL.alt,
                href: "https://csgoroll.com/r/FREECODESFREE",
                description: "Free 3 Cases",
                refferal: "freecodesfree",
                type: "gambling",
            },
        },
        // {
        // Gain: {
        //     image: IMAGES.gain.img,
        //     alt: IMAGES.gain.alt,
        //     href: "https://gain.gg/r/freecodes",
        //     description: "100c",
        //     refferal: "freecodes",
        //     type: "FREECODES",
        // },
        // },
    ],
};

function buildDiv() {
    const items = [];
    for (var i = 0; i < Object.keys(data.sites).length; i++) {
        var currentContext = data.sites[i][Object.keys(data.sites[i])[0]];
        items.push(
            <div className="cell" key={i}>
                <div className="cellImage">
                    <a href={currentContext.href} rel="noreferrer" target="_blank">
                        <img src={currentContext.image} alt={currentContext.alt} />
                    </a>
                </div>
                <hr />
                <div className="cellDesc">
                    <p>{currentContext.description}</p>
                </div>
                <hr />
                <div className="cellRef">
                    <p>CODE: {currentContext.refferal}</p>
                </div>
            </div>
        );
    }
    return <div className="content"> {items} </div>;
}

buildDiv();

function App() {
    return buildDiv();
}

export default App;
