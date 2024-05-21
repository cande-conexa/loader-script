// ENV CONFIG
const envLogin = 'process.env.LOGIN_URL';
const envApp = 'process.env.APP_URL';

const styles = `
  :root {
    --cyan-100: #09c;
    --cyan-50: #b3e0ff;
}
.containerOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loaderContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center !important;
    align-content: center !important;
    align-items: center !important;
    align-self: center !important;
}
.root {
    --size: 32px;
    --maxBorder: 3px;
    width: var(--size, 32px);
    height: var(--size, 32px);
    border-radius: 50%;
    display: inline-block;
    border-top: var(--maxBorder, 3px) solid var(--cyan-100, #09c);
    border-right: var(--maxBorder, 3px) solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    margin: 0 auto;
    position: relative;
}
.root::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: var(--size, 32px);
    height: var(--size, 32px);
    border-radius: 50%;
    border-left: var(--maxBorder, 3px) solid var(--cyan-50, #b3e0ff);
    border-bottom: var(--maxBorder, 3px) solid transparent;
    animation: rotation 0.5s linear infinite reverse;
}
@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
  `;
// cargar stylesheet
const style = document.createElement('style');
style.innerHTML = styles;
document.head.appendChild(style);

// append loader to body overlay
const container = document.createElement('div');
container.classList.add('containerOverlay');
container.innerHTML =
  '<div class="root loaderContainer"><span class="loader" /></div>';
document.body.appendChild(container);

// COOKIES CONFIG
const cookiesString = document.cookie;

// Cookies to object
const cookies = Object.fromEntries(
  cookiesString.split('; ').map((cookie) => {
    const [key, value] = cookie.split('=');
    return [key, decodeURIComponent(value)];
  })
);

const userCookie = cookies['connect.sid'];

// Si no hay cookie de usuario, redirigir a la página de login
if (!userCookie) {
  window.location.href = `${envLogin}/login`;
}

// Si hay cookie de usuario apagar loader
container.style.display = 'none';
