import mongoose from "mongoose";

const cuotaSchema = new mongoose.Schema(
  {
    articulo: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    precioTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    cantidadCuotas: {
      type: Number,
      required: true,
      min: 1,
    },
    cuotasPagadas: {
      type: Number,
      default: 0,
      min: 0,
    },
    valorCuota: {
      type: Number,
      required: true,
      min: 0,
    },
    estado: {
      type: String,
      enum: ["activa", "finalizada"],
      default: "activa",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Cuota = mongoose.model("Cuota", cuotaSchema);

export default Cuota;