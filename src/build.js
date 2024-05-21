const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const replace = require('replace-in-file');

// Cargar variables de entorno
dotenv.config();

const envVariables = {
  'process.env.LOGIN_URL': process.env.LOGIN_URL,
  'process.env.APP_URL': process.env.APP_URL,
};

// Leer el archivo fuente
const srcPath = path.resolve(__dirname, 'src', 'index.js');
const distPath = path.resolve(__dirname, 'dist', 'index.js');

const build = async () => {
  try {
    // Reemplazar las variables de entorno en el archivo fuente
    await replace({
      files: srcPath,
      from: Object.keys(envVariables).map(key => new RegExp(key, 'g')),
      to: Object.values(envVariables),
    });

    // Copiar el archivo resultante al directorio de distribución
    fs.copyFileSync(srcPath, distPath);
    fs.copyFileSync(path.resolve(__dirname, 'src', 'styles.css'), path.resolve(__dirname, 'dist', 'styles.css'));

    console.log('Build completed successfully.');
  } catch (error) {
    console.error('Error during build:', error);
  }
};

build();
