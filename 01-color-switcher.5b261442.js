const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(){if(n)return;n=setInterval(o,1e3),t.disabled=!0})),e.addEventListener("click",(function(){clearInterval(n),n=null,t.disabled=!1}));let n=null;function o(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=t}
//# sourceMappingURL=01-color-switcher.5b261442.js.map
