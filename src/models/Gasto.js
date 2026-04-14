import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    monto: {
      type: Number,
      required: true,
      min: 0,
    },
    vencimiento: {
      type: Date,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["mensual", "futuro"],
      default: "mensual",
    },
    estado: {
      type: String,
      enum: ["pendiente", "pagado"],
      default: "pendiente",
    },
    fechaPago: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Gasto = mongoose.model("Gasto", gastoSchema);

export default Gasto;