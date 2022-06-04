{
  const url = "http://127.0.0.1:6768";
  const body = document.body;
  //   window.app.style.marginTop = "25px";

  const bar = document.createElement("div");
  bar.style.position = "absolute";
  bar.style.left = 0;
  bar.style.top = 0;
  bar.style.zIndex = 100;
  const scripts = [
    "https://cdn.jsdelivr.net/gh/open-wa/wa-automate-nodejs/src/lib/wapi.js",
  ];
  bar.innerHTML = `<input type="checkbox" id="RODA_ROBO" />`;

  const sendM = async () => {
    if (window.oldScript) window.oldScript.remove();

    if (!window.interval) window.interval = [20000, 20000];
    const interval = window.interval[0] + Math.random() * window.interval[1];
    console.log(`VOLTA DAQUI ${Math.round(interval / 1000)} SEGUNDOS`);
    setTimeout(sendM, interval);

    if (!RODA_ROBO.checked) return;

    const el2 = document.createElement("script");
    el2.src = url + "/customer/new_script?_=" + new Date().getTime();
    document.body.appendChild(el2);
    window.oldScript = el2;
  };

  setTimeout(() => {
    var elt2 = document.createElement("script");
    elt2.innerHTML =
      "window.webpackChunkbuild = window.webpackChunkwhatsapp_web_client;";
    document.head.appendChild(elt2);

    var elt2 = document.createElement("script");
    elt2.src =
      "https://cdn.jsdelivr.net/gh/open-wa/wa-automate-nodejs/src/lib/wapi.js";
    document.head.appendChild(elt2);

    var elt3 = document.createElement("script");
    elt3.src = url + "/wpp.js";
    document.head.appendChild(elt3);

    sendM();
  }, 5000);

  body.appendChild(bar);
}
