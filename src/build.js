const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

const envVariables = {
  "process.env.LOGIN_URL": process.env.LOGIN_URL,
  "process.env.APP_URL": process.env.APP_URL,
};

// Rutas de los archivos
const sourceFilePath = "dist/bundle.js";
const environment = process.argv[2] || "dev";
const destinationDirectory = `dist/${environment}`;
const destinationFilePath = path.join(destinationDirectory, "bundle.js");

// Verificar si la carpeta de destino existe y crearla si es necesario
if (!fs.existsSync(destinationDirectory)) {
  fs.mkdirSync(destinationDirectory, { recursive: true });
}

// Leer el contenido del archivo de origen
fs.readFile(sourceFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo de origen:", err);
    return;
  }

  // Reemplazar las variables de entorno en el contenido
  const modifiedContent = data.replace(
    new RegExp(Object.keys(envVariables).join("|"), "g"),
    (match) => envVariables[match]
  );

  // Escribir el contenido modificado en el archivo de destino
  fs.writeFile(destinationFilePath, modifiedContent, "utf8", (err) => {
    if (err) {
      console.error("Error al escribir en el archivo de destino:", err);
      return;
    }

    console.log("Reemplazo completado con éxito.");
  });
});
