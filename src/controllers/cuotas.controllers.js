import Cuota from "../models/Cuota.js";
import conectarDB from "../database/db.js";

export const listarCuotas = async (req, res) => {
  try {
    await conectarDB();

    const cuotas = await Cuota.find().sort({ createdAt: -1 });

    const cuotasCalculadas = cuotas.map((cuota) => {
      const cuotasPendientes = cuota.cantidadCuotas - cuota.cuotasPagadas;
      const deudaPendiente = cuotasPendientes * cuota.valorCuota;

      return {
        ...cuota.toObject(),
        cuotasPendientes,
        deudaPendiente,
      };
    });

    res.status(200).json(cuotasCalculadas);
  } catch (error) {
    console.error("Error al listar cuotas:", error.message);
    res.status(500).json({ mensaje: "Error al listar cuotas" });
  }
};

export const crearCuota = async (req, res) => {
  try {
    await conectarDB();

    const { articulo, precioTotal, cantidadCuotas, cuotasPagadas, valorCuota } =
      req.body;

    const nuevaCuota = new Cuota({
      articulo,
      precioTotal,
      cantidadCuotas,
      cuotasPagadas,
      valorCuota,
    });

    await nuevaCuota.save();

    const cuotaCreada = nuevaCuota.toObject();
    cuotaCreada.cuotasPendientes =
      cuotaCreada.cantidadCuotas - cuotaCreada.cuotasPagadas;
    cuotaCreada.deudaPendiente =
      cuotaCreada.cuotasPendientes * cuotaCreada.valorCuota;

    res.status(201).json({
      mensaje: "Cuota creada correctamente",
      cuota: cuotaCreada,
    });
  } catch (error) {
    console.error("Error al crear cuota:", error.message);
    res.status(500).json({ mensaje: "Error al crear cuota" });
  }
};

export const pagarCuota = async (req, res) => {
  try {
    await conectarDB();

    const { id } = req.params;

    const cuota = await Cuota.findById(id);

    if (!cuota) {
      return res.status(404).json({ mensaje: "Cuota no encontrada" });
    }

    if (cuota.cuotasPagadas >= cuota.cantidadCuotas) {
      return res.status(400).json({ mensaje: "La cuota ya está finalizada" });
    }

    cuota.cuotasPagadas += 1;

    if (cuota.cuotasPagadas === cuota.cantidadCuotas) {
      cuota.estado = "finalizada";
    }

    await cuota.save();

    const cuotaActualizada = cuota.toObject();
    cuotaActualizada.cuotasPendientes =
      cuotaActualizada.cantidadCuotas - cuotaActualizada.cuotasPagadas;
    cuotaActualizada.deudaPendiente =
      cuotaActualizada.cuotasPendientes * cuotaActualizada.valorCuota;

    res.status(200).json({
      mensaje: "Se registró el pago de una cuota",
      cuota: cuotaActualizada,
    });
  } catch (error) {
    console.error("Error al pagar cuota:", error.message);
    res.status(500).json({ mensaje: "Error al pagar cuota" });
  }
};

export const eliminarCuota = async (req, res) => {
  try {
    await conectarDB();

    const { id } = req.params;

    const cuotaEliminada = await Cuota.findByIdAndDelete(id);

    if (!cuotaEliminada) {
      return res.status(404).json({ mensaje: "Cuota no encontrada" });
    }

    const cuotaRespuesta = cuotaEliminada.toObject();
    cuotaRespuesta.cuotasPendientes =
      cuotaRespuesta.cantidadCuotas - cuotaRespuesta.cuotasPagadas;
    cuotaRespuesta.deudaPendiente =
      cuotaRespuesta.cuotasPendientes * cuotaRespuesta.valorCuota;

    res.status(200).json({
      mensaje: "Cuota eliminada correctamente",
      cuota: cuotaRespuesta,
    });
  } catch (error) {
    console.error("Error al eliminar cuota:", error.message);
    res.status(500).json({ mensaje: "Error al eliminar cuota" });
  }
};