const par = (typeof parent !== "undefined") && parent;
const win = ( par && par.window ) ? par.window : window;
const doc = ( par && par.document) ? par.document : document;
const kly = ( par && (par.kly || par.kmklabs)) || {};
let site = (kly.site || "").toLowerCase();
if (site === "bola.com") site = "bolacom";
const platform = (kly.platform || "").toLowerCase();
const pageType = (kly.pageType || "").toLowerCase();

async function init(format, config) {
  config = config || {};
  format = (format || "").toLowerCase();
  
  const { Newstag } = await import(/* webpackChunkName: "newstag" */ "./modules/Newstag.js");
  const { SkinAd } = await import(/* webpackChunkName: "skinad" */ "./modules/SkinAd.js");
  const { AdvertorialEmbed } = await import(/* webpackChunkName: "advertorialEmbed" */ "./modules/AdvertorialEmbed.js");

  try {
    switch (format) {
      case "newstag":
        Newstag(config, site, platform, doc);
        break;
      case "skinad":
        SkinAd(config, platform, doc);
        break;
      case "advertorial-embed":
        AdvertorialEmbed(win, doc, config, site, pageType);
        break;
      default:
        console.warn("Unknown format:", format);
    }
  } catch (error) {
    console.error(`Failed to load creative "${format}":`, error);
  }
}

export { init };

