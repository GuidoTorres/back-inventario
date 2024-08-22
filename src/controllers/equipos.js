const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dayjs = require("dayjs");
const db = require("../../app/models/index");
const getEquipo = async (req, res) => {
  try {
    const equipo = await db.equipo.findAll();

    const format = equipo.map((item, i) => {
      return {
        nro: i + 1,
        ...item.dataValues,
      };
    });
    return res.json({ data: format });
  } catch (error) {
    console.log(error);
  }
};
const getEquipos = async (req, res) => {
  try {
    const equipos = await db.equipo.findAll({
      attributes: [
        "descripcion", // Agrupar por descripción
        [db.Sequelize.fn("LEFT", db.Sequelize.col("sbn"), 8), "prefijo_sbn"], // Ajusta a 8 si necesitas 8 dígitos
        [db.Sequelize.fn("COUNT", db.Sequelize.col("sbn")), "total_equipos"],
        [db.Sequelize.fn("GROUP_CONCAT", db.Sequelize.col("sbn")), "sbn_list"], // Agrupa y muestra todos los SBN correspondientes
      ],
      group: ["descripcion", "prefijo_sbn"], // Agrupar por descripción y prefijo SBN
      order: [[db.Sequelize.literal("total_equipos"), "DESC"]],
      raw: true, // Para que devuelva objetos planos
    });

    // Calcular el total de todos los bienes
    const totalBienes = equipos.reduce(
      (acc, item) => acc + parseInt(item.total_equipos, 10),
      0
    );

    return res.json({
      data: equipos,
      totalBienes, // Incluir la suma total de todos los bienes
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener las agrupaciones",
      error: error.message,
    });
  }
};
const getEquipoSelect = async (req, res) => {
  try {
    const equipo = await db.equipo.findAll({
      attributes: ["id", "sbn"],
    });

    return res.json({ data: equipo });
  } catch (error) {
    console.log(error);
  }
};
const postEquipo = async (req, res) => {
  try {
    await db.equipo.create(req.body);

    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};

const postVariosEquipo = async (req, res) => {
  try {
    await db.equipo.bulkCreate(req.body);

    return res.status(200).json({ msg: "Registrado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo registrar." });
  }
};
const updateEquipo = async (req, res) => {
  try {
    const id = req.params.id;
    await db.equipo.update(req.body, { where: { id: id } });

    return res.status(200).json({ msg: "Actualizado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo actualizar." });
  }
};
const deleteEquipo = async (req, res) => {
  try {
    const id = req.params.id;
    await db.equipo.destroy({ where: { id: id } });

    return res.status(200).json({ msg: "Eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "No se pudo eliminar." });
  }
};

const getDatosPorTipo = async (tipoEquipo) => {
  try {
    // Filtrar los equipos por el tipo específico
    const equiposFiltrados = await db.equipo.findAll({
      where: { tipo: tipoEquipo },
    });

    // Diccionario de mapeo para estado_conserv
    const estadoMap = {
      1: "bueno",
      2: "regular",
      3: "malo",
      4: "muyMalo",
      5: "nuevo",
      6: "chatarra",
      7: "raee",
    };

    // Contar los estados para el tipo específico
    const conteos = {
      nuevo: 0,
      bueno: 0,
      regular: 0,
      malo: 0,
      muyMalo: 0,
      chatarra: 0,
      raee: 0,
    };

    equiposFiltrados.forEach(({ estado_conserv }) => {
      const estadoTexto = estadoMap[estado_conserv];
      if (estadoTexto) {
        conteos[estadoTexto]++;
      }
    });

    // Formatear los datos para Chart.js usando el formato especificado
    const data = {
      labels: [
        "Nuevo",
        "Bueno",
        "Regular",
        "Malo",
        "Muy Malo",
        "Chatarra",
        "RAEE",
      ],
      datasets: [
        {
          label: `Cantidad`,
          data: [
            conteos.nuevo,
            conteos.bueno,
            conteos.regular,
            conteos.malo,
            conteos.muyMalo,
            conteos.chatarra,
            conteos.raee,
          ],
          backgroundColor: [
            "rgba(91, 141, 196, 0.78)", // Nuevo
            "rgba(120, 201, 150, 0.8)", // Bueno
            "rgba(228, 228, 125, 0.78)", // Regular
            "rgba(145, 53, 73, 0.2)", // Malo
            "rgba(255, 99, 132, 0.2)", // Muy Malo
            "rgba(54, 162, 235, 0.2)", // Chatarra
            "rgba(75, 192, 192, 0.2)", // RAEE
          ],
          borderColor: [
            "rgba(91, 141, 196, 1)", // Nuevo
            "rgba(120, 201, 150, 1)", // Bueno
            "rgba(228, 228, 125, 1)", // Regular
            "rgba(145, 53, 73, 1)", // Malo
            "rgba(255, 99, 132, 1)", // Muy Malo
            "rgba(54, 162, 235, 1)", // Chatarra
            "rgba(75, 192, 192, 1)", // RAEE
          ],
          borderWidth: 1,
        },
      ],
    };

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los datos");
  }
};

const getEquiposPorAño = async () => {
  try {
    // Obtener todos los equipos
    const equipos = await db.equipo.findAll();

    // Crear un objeto para contar los equipos por año de ingreso
    const conteosPorAño = {};

    equipos.forEach(({ fecha_ingreso }) => {
      const año = dayjs(fecha_ingreso).format("YYYY"); // Directamente usar el valor del campo ingreso
      if (!conteosPorAño[año] && año > 2009) {
        conteosPorAño[año] = 0; // Inicializar el conteo para ese año si aún no existe
      }
      if (año > 2009) {
        conteosPorAño[año]++; // Incrementar el conteo para el año
      }
    });

    // Preparar los datos para el gráfico
    const data = {
      labels: Object.keys(conteosPorAño), // Años como texto
      datasets: [
        {
          label: "Cantidad de Equipos",
          data: Object.values(conteosPorAño), // Cantidad de equipos por año
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los datos por año de ingreso");
  }
};
const getEquipoChart = async (req, res) => {
  try {
    const datosImpresoras = await getDatosPorTipo("Impresora");
    const datosCPU = await getDatosPorTipo("Cpu");
    const datosLaptop = await getDatosPorTipo("Laptop");
    const datosMonitor = await getDatosPorTipo("Monitor");
    const equiposAnio = await getEquiposPorAño();
    return res.json({
      impresoras: datosImpresoras,
      cpu: datosCPU,
      laptop: datosLaptop,
      monitor: datosMonitor,
      anio: equiposAnio,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const equiposBienesSiga = async (req, res) => {
  try {
    const response = await fetch("http://10.30.1.42:8084/api/v1/bienes/prueba");
    const trabajadores = await db.trabajador.findAll({
      attributes: ["id", "dni", "codigo"],
    });
    const externalData = await response.json();

    const existingData = await db.equipo.findAll();
    const existingMap = new Map(
      existingData.map((item) => [item.secuencia, item])
    );

    // Crear un mapa de trabajadores para una búsqueda rápida
    const trabajadorMap = new Map();
    trabajadores.forEach((trabajador) => {
      trabajadorMap.set(trabajador.codigo, trabajador.id);
    });

    const currentYear = new Date().getFullYear();

    // Lista de prefijos SBN a filtrar
    const sbnPrefixes = [
      "74222358",
      "95228627",
      "74089500",
      "74084100",
      "74088187",
      "74083200",
      "95228287",
      "74089950",
      "95228117",
      "95221467",
      "74081850",
      "95225812",
      "74087700",
      "74080500",
      "74088224",
      "95226644",
      "74083650",
      "95227834",
      "74089556",
      "95226742",
      "74222726",
      "74088037",
      "74084550",
      "74087250",
      "95228363",
      "74229950",
      "95221561",
      "95225815",
      "74080050",
      "95223791",
      "74083875",
      "74085000",
      "74227274",
      "95227536",
      "95221470",
      "74080950",
      "74089200",
      "95225907",
      "95221816",
      "95222166",
      "95226115",
      "74080275",
      "95227044",
    ];

    // Filtrar y preparar los datos para crear o actualizar
    const toCreate = [];
    const toUpdate = [];

    externalData?.data?.forEach((item, index) => {
      const fechaIngreso = new Date(item.fecha_ingreso);
      const trabajadorId = trabajadorMap.get(item.empleado_final) || null;
      const sbnPrefix = item.sbn.slice(0, 8); // Obtener los primeros 8 dígitos del SBN
      const newItem = {
        ...item,
        trabajador_id: trabajadorId,
        estado: item.estado_conserv, // Mapeo directo del estado_conserv del SIGA al estado de tu base de datos
      };

      // Solo considerar los registros con fecha_ingreso en el año actual y que coincidan con los prefijos
      if (
        fechaIngreso.getFullYear() === currentYear &&
        sbnPrefixes.includes(sbnPrefix)
      ) {
        if (existingMap.has(item.secuencia)) {
          const existingItem = existingMap.get(item.secuencia);
          // Verificar si hay cambios en los campos relevantes
          if (
            existingItem.estado !== newItem.estado || // Comparar estado con estado_conserv
            existingItem.trabajador_id !== newItem.trabajador_id // Comparar trabajador_id con empleado_final
          ) {
            // Si hay cambios, agrega a la lista de actualizaciones
            toUpdate.push(newItem);
          }
        } else {
          // Si no existe, agregar a la lista de nuevos registros
          toCreate.push(newItem);
        }
      }
    });

    const dataToCreate = toCreate
      .sort((a, b) => {
        const dateDiff = new Date(b.fecha_ingreso) - new Date(a.fecha_ingreso);
        if (dateDiff !== 0) {
          return dateDiff; // Ordenar por fecha_ingreso si son diferentes
        }
        return b.secuencia - a.secuencia; // Si las fechas son iguales, ordenar por secuencia
      })
      .map((item, index) => {
        return {
          id: index + 1,
          ...item,
        };
      });

    // Devolver los registros nuevos filtrados por año y prefijo SBN
    return res.json({
      data: dataToCreate,
    });
  } catch (error) {
    // Manejar errores
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

const asignarBienesTrabajador = async (req, res) => {
  try {
    const bienes = await db.equipo.findAll({
      attributes: ["id", "empleado_final", "descripcion"],
    });
    const trabajadores = await db.trabajador.findAll({
      attributes: ["id", "dni", "codigo"],
    });

    console.log(`Total bienes recuperados: ${bienes.length}`);
    console.log(`Total trabajadores recuperados: ${trabajadores.length}`);

    // Crear un mapa de trabajadores para una búsqueda rápida
    const trabajadorMap = new Map();
    trabajadores.forEach((trabajador) => {
      trabajadorMap.set(trabajador.codigo, trabajador.id);
    });

    // Almacenar las asignaciones propuestas
    const asignaciones = [];
    // Iterar sobre los bienes y asignar trabajador_id cuando corresponda
    bienes.forEach((bien) => {
      const trabajadorId = trabajadorMap.get(bien.empleado_final);
      if (trabajadorId) {
        asignaciones.push({
          bienId: bien.id,
          descripcion: bien.descripcion,
          trabajadorId: trabajadorId,
        });
      }
    });

    console.log(`Total asignaciones: ${asignaciones.length}`);

    // Devolver las asignaciones propuestas
    res.status(200).json({ asignaciones });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

module.exports = {
  getEquipo,
  getEquipoChart,
  postEquipo,
  postVariosEquipo,
  updateEquipo,
  deleteEquipo,
  getEquipoSelect,
  equiposBienesSiga,
  asignarBienesTrabajador,
};
