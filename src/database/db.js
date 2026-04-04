import mongoose from "mongoose";

let isConnected = false;

const conectarDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB);
    isConnected = db.connections[0].readyState === 1;
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectar la base de datos:", error.message);
    throw error;
  }
};

export default conectarDB;