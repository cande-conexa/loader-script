(()=>{(()=>{const e=document.createElement("link");e.rel="stylesheet",e.href="src/styles.css",document.head.appendChild(e)})();const e=document.createElement("div");e.classList.add("containerOverlay"),e.innerHTML='<div class="root loaderContainer"><span class="loader" /></div>',document.body.appendChild(e);const n=document.cookie;Object.fromEntries(n.split("; ").map((e=>{const[n,t]=e.split("=");return[n,decodeURIComponent(t)]})))["connect.sid"]||(window.location.href="https://example.com/login"),e.style.display="none"})();