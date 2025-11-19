export function SkinAd(config, platform, doc) {
  try {
    const {
      skinWidth = config.skinWidth || 120,
      // skinHeight = config.skinHeight || 600,
      imageLeft = "",
      imageRight = "",
      landingPage = "#"
    } = config;

    const d = doc || document;
    const win = d.defaultView || window;
    const parentWin = win.parent || win;
    const parentDoc = parentWin.document;

    function getDomain() {
      const h = win.location.hostname;
      const s2 = h.substring(h.indexOf(".") + 1);
      return s2.substring(0, s2.indexOf(".")); 
    }

    const channel = getDomain();

    const container = parentDoc.createElement("div");
    container.innerHTML = `
      <div id="dfp-skinad-left">
        <div id="left-lp" style="cursor:pointer;">
          <img src="${imageLeft}" style="max-width:${skinWidth}px;">
        </div>
      </div>

      <div id="dfp-skinad-right">
        <div id="right-lp" style="cursor:pointer;">
          <img src="${imageRight}" style="max-width:${skinWidth}px;">
        </div>
      </div>
    `;

    parentDoc.body.appendChild(container);
    const contentWidth = (() => {
      const el = parentDoc.querySelector(".container");
      if (el) return el.clientWidth;
      if (channel === "dream" || channel === "fimela") return 1024;
      return 996;
    })();

    const half = contentWidth / 2;
    let leftOffset = half + skinWidth;
    let rightOffset = half;

    if (channel === "liputan6") {
      leftOffset += 6;
      rightOffset += 6;
    } else if (channel === "fimela") {
      leftOffset += 5;
      rightOffset += 5;
    }

    const leftDiv = parentDoc.getElementById("dfp-skinad-left");
    const rightDiv = parentDoc.getElementById("dfp-skinad-right");

    if (leftDiv) {
      leftDiv.style.cssText = `
        width:${skinWidth}px;
        height:100vh;
        position:fixed;
        z-index:9999;
        top:0;
        left:50%;
        margin-left:-${leftOffset}px;
      `;
    }

    if (rightDiv) {
      rightDiv.style.cssText = `
        width:${skinWidth}px;
        height:100vh;
        position:fixed;
        z-index:9999;
        top:0;
        left:50%;
        margin-left:${rightOffset}px;
      `;
    }

    const leftLp = parentDoc.getElementById("left-lp");
    const rightLp = parentDoc.getElementById("right-lp");

    const clickHandler = () => parentWin.open(landingPage, "_blank");

    if (leftLp) leftLp.onclick = clickHandler;
    if (rightLp) rightLp.onclick = clickHandler;

    if (["merdeka", "otosia", "dream"].includes(channel)) {
      parentDoc.querySelectorAll("div[id^='dfp-skinad']").forEach((el) => {
        el.style.marginTop = "4rem";
      });
    }

    return true;
  } catch (err) {
    console.error("[SkinAd] error:", err);
    return false;
  }
}
