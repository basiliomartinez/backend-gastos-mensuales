import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectar la base de datos:", error);
    }
};

export default conectarDB;