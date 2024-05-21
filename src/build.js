const dotenv = require('dotenv');
const replace = require('replace-in-file');

// Cargar variables de entorno
dotenv.config();

const envVariables = {
  'process.env.LOGIN_URL': process.env.LOGIN_URL,
  'process.env.APP_URL': process.env.APP_URL,
};

// Rutas de los archivos
const bundlePath = './dist/bundle.js';

// Reemplazar las variables de entorno en el archivo bundle.js
replace.sync({
  files: bundlePath,
  from: Object.keys(envVariables).map(key => new RegExp(key, 'g')),
  to: Object.values(envVariables),
});

console.log('Variables de entorno reemplazadas en bundle.js.');
