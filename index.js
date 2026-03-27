import app from "./src/app.js";
import conectarDB from "./src/database/db.js";

const PORT = process.env.PORT || 3000;

conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});