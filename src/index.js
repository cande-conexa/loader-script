// ENV CONFIG
const envLogin = 'process.env.LOGIN_URL';
const envApp = 'process.env.APP_URL';

// cargar stylesheet
const loadStyles = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${envApp}/src/styles.css`;
  document.head.appendChild(link);
};

loadStyles();

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
