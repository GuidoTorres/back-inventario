const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dayjs = require("dayjs");
const db = require("../../app/models/index");
const XLSX = require("xlsx");
const path = require("path");
const { Op } = require("sequelize");
const fechaComparar = "2024-08-27 00:00:00";

const getEquipo = async (req, res) => {
  try {
    const equipo = await db.equipo.findAll({});

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

const getEquipoSede = async (req, res) => {
  try {
    const equipo = await db.equipo.findAll({
      where: {
        [Op.or]: [
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
    });

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

// const getEquipo = async (req, res) => {
//   try {

//     const data = ['740805000153',
//       '740805000152',
//       '740899500575',
//       '740805000142',
//       '740805000154',
//       '740899500632',
//       '740899500640',
//       '740899506017',
//       '740899500639',
//       '740899500644',
//       '740899500645',
//       '740899500333',
//       '740899500548',
//       '740899500594',
//       '740899500514',
//       '740899500422',
//       '740805000060',
//       '740899500515',
//       '740899500423',
//       '740899500351',
//       '740805000139',
//       '740805000180',
//       '740899500623',
//       '740899500605',
//       '740899500579',
//       '740805000061',
//       '740805000102',
//       '740805000158',
//       '740899500571',
//       '740805000114',
//       '740899500565',
//       '740899500526',
//       '740805000101',
//       '740899500569',
//       '740805000090',
//       '740805000124',
//       '740899500555',
//       "P-0075",
//       '740899500539',
//       '740899500641',
//       '740899500598',
//       '740899500440',
//       '740899500557',
//       '740899500602',
//       '740899500599',
//       '740899500449',
//       '740899500519',
//       '740899500581',
//       '740899500578',
//       '740805000099',
//       '740805000156',
//       '740899500611',
//       '740899500580',
//       '740805000080',
//       '740899500616',
//       '740805000176',
//       '740805000091',
//       '740899500576',
//       '740805000107',
//       '740899500591',
//       '740899500551',
//       '740805000104',
//       '740805000183',
//       '740899500540',
//       '740805000127',
//       '740899500592',
//       '740805000079',
//       '740805000089',
//       '740805000078',
//       '740805000143',
//       '740899500615',
//       '740899500572',
//       '740805000160',
//       '740899500445',
//       '740899500410',
//       '740899500582',
//       '740899500457',
//       '740899500017',
//       '740805000092',
//       '740805000172',
//       '740899500482',
//       '740899500537',
//       '740899500538',
//       '740899500509',
//       '740805000112',
//       '740899500637',
//       '740899500608',
//       '740899500335',
//       '740899500590',
//       '740899500518',
//       '740899500404',
//       '740899500630',
//       '740899500425',
//       '740899500531',
//       '740899500621',
//       '740899500463',
//       '740899500612',
//       '740899500506',
//       '740899500507',
//       '740899500467',
//       '74899500628',
//       '740899500462',
//       '740899500585',
//       '740899500479',
//       '740899500487',
//       '740805000105',
//       '740899500607',
//       '740899500454',
//       '740899500480',
//       '740899500452',
//       '740899500542',
//       '740899500606',
//       '740899500629',
//       '740899500427',
//       '740805000157',
//       '740899500601',
//       '740899500442',
//       '740899500443',
//       '740899500564',
//       '740899500431',
//       '740899500444',
//       '740899500492',
//       '740899500441',
//       '740805000137',
//       '740899500583',
//       '740899500627',
//       '740899500593',
//       '740899500499',
//       '740899500524',
//       '740899500589',
//       '740899500626',
//       '740899500501',
//       '740899500497',
//       '740899500619',
//       '740899500426',
//       '740805000173',
//       '740899500563',
//       '740899500560',
//       '740899500532',
//       '740845500122',
//       '740899500446',
//       '740899500570',
//       '740899500498',
//       '740899500625',
//       '740899500559',
//       '740899500558',
//       '740899500496',
//       '740899500556',
//       '740899500541',
//       '740805000085',
//       '740805000599',
//       '740899500437',
//       '740899500468',
//       '740899500329',
//       '740899500453',
//       '740805000171',
//       '740805000170',
//       '740805000168',
//       '740899500448',
//       '740899500462',
//       '740805000135',
//       '740899500458',
//       '740899500503',
//       '740805000178',
//       '740899500639',
//       '740899500522',
//       '740899500613',
//       '740805000108',
//       '740899500554',
//       '740805000144',
//       '740899500618',
//       '740899500490',
//       '740899500386',
//       '740805000138',
//       '710899500520',
//       '740899500450',
//       '740805000145',
//       '740899500483',
//       '740899500371',
//       '740805000069',
//       '740899500513',
//       '740899500596',
//       '740899500544',
//       '74080500169',
//       '740899500597',
//       '740805000129',
//       '740899500389',
//       '740899500543',
//       '740899500549',
//       '740805000095',
//       '740899500484',
//       '740805000119',
//       '740899500584',
//       "L-021",
//       '740805000164',
//       '740899500488',
//       '740899500451',
//       '740805000042',
//       '740899500400',
//       '740805000122',
//       '740899500636',
//       '740899500552',
//       '740899500419',
//       '740899500392',
//       '740899500493',
//       '740899500362',
//       '740805000075',
//       '740899500370',
//       '740899500609',
//       '740899500360',
//       '740899500550',
//       '740899500420',
//       '740805000020',
//       '740899500349',
//       '740899500407',
//       '740899500486',
//       '740899500414',
//       '740805000166',
//       '740805000165',
//       '740899500390',
//       '740805000167',
//       '740899500318',
//       '740899500587',
//       '740899500586',
//       '740899500428',
//       '740899500588',
//       '740805000161']
//       const equipoEncontrado = await db.equipo.findAll({
//         where: {
//           sbn: { [Op.in]: data }
//         }
//       });

//       // Obtener solo los valores de `sbn` que están en la base de datos
//       const sbnsEncontrados = equipoEncontrado.map(item => item.sbn);

//       // Paso 2: Filtrar los valores de `data` que no están en la base de datos
//       const sbnsNoEncontrados = data.filter(sbn => !sbnsEncontrados.includes(sbn));

//       // Paso 3: Formatear los resultados para los que están en la BD
//       const format = equipoEncontrado.map((item, i) => {
//         return {
//           nro: i + 1,
//           ...item.dataValues,
//         };
//       });

//       // Devolver los resultados al frontend
//       return res.json({
//         noEncontrados: sbnsNoEncontrados,  // Elementos que no están en la BD
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

const getEquiposInventariados = async (req, res) => {
  try {
    // Consulta para obtener los registros creados
    const equiposCreados = await db.equipo.findAll({
      where: {
        [Op.or]: [
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
    });

    // Formatear los datos antes de enviarlos como respuesta
    const format = equiposCreados.map((item, i) => {
      return {
        nro: i + 1,
        ...item.dataValues,
      };
    });

    return res.json({ data: format });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener los equipos" });
  }
};

const actualizarEquiposDesdeExcel = async (filePath) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const allRows = [];
    const allEquiposData = [];

    // Contadores y arrays para almacenar los SBNs actualizados y creados
    let contadorActualizados = 0;
    let contadorCreados = 0;
    let sbnsActualizados = []; // Array para almacenar los SBN actualizados

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];

      // Convertir la hoja a JSON utilizando la segunda fila como encabezado
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = data[1]; // Segunda fila como encabezados
      const rows = data.slice(2); // Resto de las filas como datos

      // Convertir cada fila en un objeto utilizando los encabezados
      const formattedData = rows
        .map((row) => {
          let obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        })
        .filter((row) =>
          Object.values(row).some(
            (value) => value !== undefined && value !== null && value !== ""
          )
        );

      allRows.push(...formattedData);
    }

    // Procesar cada fila en allRows
    for (const row of allRows) {
      const equipoData = {
        sbn: row["Cod. Patrimonio"] || null,
        usuario_actual: row["USUARIO FINAL"] || null,
      };

      if (!equipoData.sbn) {
        console.warn(
          `El registro con nombre_pc ${equipoData.nombre_pc} no tiene 'SBN' definido. Se omitirá este registro.`
        );
        continue;
      }

      // Buscar si el registro ya existe
      const equipoExistente = await db.equipo.findOne({
        where: { sbn: equipoData.sbn },
      });

      if (equipoExistente) {
        // Actualizar el registro existente
        await equipoExistente.update(equipoData);
        console.log(`Registro actualizado para SBN: ${equipoData.sbn}`);
        contadorActualizados++; // Aumentar el contador de actualizados
        sbnsActualizados.push(equipoData.sbn); // Guardar el SBN actualizado
      } else {
        // Crear un nuevo registro
        await db.equipo.create(equipoData);
        console.log(`Registro creado para SBN: ${equipoData.sbn}`);
        contadorCreados++; // Aumentar el contador de creados
      }

      allEquiposData.push(equipoData);
    }

    console.log("Actualización completa");
    console.log(`Registros creados: ${contadorCreados}`);
    console.log(`Registros actualizados: ${contadorActualizados}`);
    console.log(`SBNs actualizados: ${sbnsActualizados.join(", ")}`);

    return {
      equipos: allEquiposData, // Devolver todos los equipos procesados
      creados: contadorCreados, // Devolver el número de registros creados
      actualizados: contadorActualizados, // Devolver el número de registros actualizados
      sbnsActualizados, // Devolver los SBNs actualizados
    };
  } catch (error) {
    console.error("Error al actualizar los equipos:", error);
    throw error;
  }
};

const excelEquipos = async (req, res) => {
  try {
    // Verifica si el archivo fue subido
    if (!req.file) {
      return res.status(400).send("No se ha subido ningún archivo.");
    }

    // Asegúrate de que el path es un string
    const filePath = req.file.path;

    // Llamar a la función para actualizar los equipos desde Excel
    const data = await actualizarEquiposDesdeExcel(filePath);

    // Devolver todos los datos procesados como respuesta
    res.json({
      cantidad: data.length,
      data: data,
      message: "Equipos actualizados con éxito.",
    });
  } catch (error) {
    console.error("Error en el controlador excelEquipos:", error);
    res.status(500).json({
      message: "Error al procesar el archivo Excel",
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
    const equiposFiltrados = await db.equipo.findAll({
      where: {
        tipo: tipoEquipo,
        [Op.or]: [
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
    });

    // Diccionario de mapeo para estado_conserv
    const estadoMap = {
      1: "bueno",
      2: "regular",
      3: "malo",
      4: "nuevo",
    };

    // Contar los estados para el tipo específico
    const conteos = {
      nuevo: 0,
      bueno: 0,
      regular: 0,
      malo: 0,
      otros: 0, // Agregamos una categoría "otros" para estados no mapeados
    };

    equiposFiltrados.forEach(({ estado_conserv }) => {
      const estadoTexto = estadoMap[estado_conserv] || "otros";
      conteos[estadoTexto]++;
    });

    // Formatear los datos para Chart.js usando el formato especificado
    const data = {
      labels: [
        "Nuevo",
        "Bueno",
        "Regular",
        "Malo",
        "Sin estado", // Agregamos "Otros" al gráfico
      ],
      datasets: [
        {
          label: `Cantidad`,
          data: [
            conteos.nuevo,
            conteos.bueno,
            conteos.regular,
            conteos.malo,
            conteos.otros, // Incluimos la categoría "Otros" en los datos
          ],
          backgroundColor: [
            "rgba(91, 141, 196, 0.78)", // Nuevo
            "rgba(120, 201, 150, 0.8)", // Bueno
            "rgba(228, 228, 125, 0.78)", // Regular
            "rgba(145, 53, 73, 0.35)", // Malo
            "rgba(255, 159, 64, 0.6)",
          ],
          borderColor: [
            "rgba(91, 141, 196, 1)", // Nuevo
            "rgba(120, 201, 150, 1)", // Bueno
            "rgba(228, 228, 125, 1)", // Regular
            "rgba(145, 53, 73, 0.50)", // Malo
            "rgba(255, 159, 64, 1)", // Naranja
          ],
          borderWidth: 1,
        },
      ],
    };

    return { data, cantidad: equiposFiltrados.length };
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los datos");
  }
};

const normalizarTexto = (texto) => {
  return texto ? texto.trim().toUpperCase() : null;
};

const getImpresorasPorTipo = async (tipoEquipo, campoContar, label) => {
  try {
    // Obtener todos los registros filtrados por el tipo específico
    const equiposFiltrados = await db.equipo.findAll({
      where: {
        tipo: tipoEquipo,
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      attributes: [campoContar], // Traer solo el campo que queremos contar
    });
    const conteos = {};

    equiposFiltrados.forEach((equipo) => {
      let valorCampoContar = normalizarTexto(equipo[campoContar]);

      if (tipoEquipo === "Monitor" && campoContar === "tecnologia_monitor") {
        if (valorCampoContar === null) {
          valorCampoContar = "LED";
        }
      }
      if (tipoEquipo === "Impresora" && campoContar === "subtipo_impresora") {
        if (valorCampoContar === null) {
          valorCampoContar = "IMPRESORAS";
        }
      }
      if (valorCampoContar) {
        conteos[valorCampoContar] = (conteos[valorCampoContar] || 0) + 1;
      }
    });

    // Definir colores predefinidos
    const predefinedColors = [
      "rgba(91, 141, 196, 0.78)", // Azul claro
      "rgba(120, 201, 150, 0.8)", // Verde claro
      "rgba(228, 228, 125, 0.78)", // Amarillo claro
      "rgba(145, 53, 73, 0.35)", // Rojo oscuro
      "rgba(255, 99, 132, 0.5)", // Rosa
      "rgba(54, 162, 235, 0.5)", // Azul
      "rgba(75, 192, 192, 0.5)", // Verde agua
      "rgba(153, 102, 255, 0.5)", // Púrpura
      "rgba(255, 159, 64, 0.5)", // Naranja
    ];

    const borderColorVariants = predefinedColors.map((color) =>
      color.replace("0.5", "1")
    );
    const totalEquipos = equiposFiltrados.length;
    // Preparar los datos para Chart.js
    const data = {
      labels: Object.keys(conteos), // Valores únicos del campo a contar
      datasets: [
        {
          label: label,
          data: Object.values(conteos), // Cantidades correspondientes
          backgroundColor: predefinedColors.slice(
            0,
            Object.keys(conteos).length
          ),
          borderColor: borderColorVariants.slice(
            0,
            Object.keys(conteos).length
          ),
          borderWidth: 1,
        },
      ],
    };

    return { data, cantidad: equiposFiltrados.length };
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los datos");
  }
};

const getProcesadoresPorGeneracion = async (tipoEquipo, campoContar, label) => {
  try {
    // Obtener todos los registros filtrados por el tipo específico
    const equiposFiltrados = await db.equipo.findAll({
      where: {
        tipo: {
          [Op.in]: ["Cpu", "Laptop"], // Incluir tanto Cpu como Laptop
        },
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      attributes: [campoContar], // Traer solo el campo que queremos contar
    });
    const conteos = {};

    equiposFiltrados.forEach((equipo) => {
      let valorCampoContar = normalizarTexto(equipo[campoContar]);

      if (tipoEquipo === "Monitor" && campoContar === "tecnologia_monitor") {
        if (valorCampoContar === null) {
          valorCampoContar = "LED";
        }
      }
      if (tipoEquipo === "Impresora" && campoContar === "subtipo_impresora") {
        if (valorCampoContar === null) {
          valorCampoContar = "IMPRESORAS";
        }
      }
      if (valorCampoContar) {
        conteos[valorCampoContar] = (conteos[valorCampoContar] || 0) + 1;
      }
    });

    // Definir colores predefinidos
    const predefinedColors = [
      "rgba(91, 141, 196, 0.78)", // Azul claro
      "rgba(120, 201, 150, 0.8)", // Verde claro
      "rgba(228, 228, 125, 0.78)", // Amarillo claro
      "rgba(145, 53, 73, 0.35)", // Rojo oscuro
      "rgba(255, 99, 132, 0.5)", // Rosa
      "rgba(54, 162, 235, 0.5)", // Azul
      "rgba(75, 192, 192, 0.5)", // Verde agua
      "rgba(153, 102, 255, 0.5)", // Púrpura
      "rgba(255, 159, 64, 0.5)", // Naranja
    ];

    const borderColorVariants = predefinedColors.map((color) =>
      color.replace("0.5", "1")
    );
    const totalEquipos = equiposFiltrados.length;
    // Preparar los datos para Chart.js
    const data = {
      labels: Object.keys(conteos), // Valores únicos del campo a contar
      datasets: [
        {
          label: label,
          data: Object.values(conteos), // Cantidades correspondientes
          backgroundColor: predefinedColors.slice(
            0,
            Object.keys(conteos).length
          ),
          borderColor: borderColorVariants.slice(
            0,
            Object.keys(conteos).length
          ),
          borderWidth: 1,
        },
      ],
    };

    return { data, cantidad: equiposFiltrados.length };
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

const getEstadisticasProcesadores = async () => {
  try {
    // Obtener todos los registros
    const equipos = await db.equipo.findAll({
      where: {
        tipo: {
          [Op.in]: ["Cpu", "Laptop"], // Incluir tanto Cpu como Laptop
        },
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      attributes: ["procesador"],
    });

    // Diccionario para almacenar los conteos
    const conteos = {};

    equipos.forEach(({ procesador }) => {
      // Normalizar el nombre del procesador si es necesario
      const procesadorNormalizado = normalizarProcesador(procesador);

      // Crear un identificador único combinando procesador y generación
      const identificador = `${procesadorNormalizado}`;

      // Contar las ocurrencias
      conteos[identificador] = (conteos[identificador] || 0) + 1;
    });

    const predefinedColors = [
      "rgba(91, 141, 196, 0.78)", // Azul claro
      "rgba(120, 201, 150, 0.8)", // Verde claro
      "rgba(228, 228, 125, 0.78)", // Amarillo claro
      "rgba(145, 53, 73, 0.35)", // Rojo oscuro
      "rgba(255, 99, 132, 0.5)", // Rosa
      "rgba(54, 162, 235, 0.5)", // Azul
      "rgba(75, 192, 192, 0.5)", // Verde agua
      "rgba(153, 102, 255, 0.5)", // Púrpura
      "rgba(255, 159, 64, 0.5)", // Naranja
    ];

    const borderColorVariants = predefinedColors.map((color) =>
      color.replace("0.5", "1")
    );

    // Preparar los datos para Chart.js
    const data = {
      labels: Object.keys(conteos), // Combinación de procesador y generación
      datasets: [
        {
          label: `Cantidad`,
          data: Object.values(conteos), // Cantidades correspondientes
          backgroundColor: predefinedColors.slice(
            0,
            Object.keys(conteos).length
          ),
          borderColor: predefinedColors.slice(0, Object.keys(conteos).length),
          borderWidth: 1,
        },
      ],
    };

    return { data, cantidad: equipos.length };
  } catch (error) {
    console.error("Error al obtener estadísticas de procesadores:", error);
    throw new Error("Error al obtener los datos");
  }
};

const getEstadisticasLincencias = async () => {
  try {
    // Obtener todos los registros
    const equipos = await db.equipo.findAll({
      where: {
        tipo: {
          [Op.in]: ["Cpu", "Laptop"], // Incluir tanto Cpu como Laptop
        },
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      attributes: ["sistema_operativo"],
    });

    // Diccionario para almacenar los conteos
    const conteos = {};

    equipos.forEach(({ sistema_operativo }) => {
      // Normalizar el nombre del procesador si es necesario
      const procesadorNormalizado = normalizarProcesador(sistema_operativo);

      // Crear un identificador único combinando procesador y generación
      const identificador = `${procesadorNormalizado}`;

      // Contar las ocurrencias
      conteos[identificador] = (conteos[identificador] || 0) + 1;
    });

    const predefinedColors = [
      "rgba(91, 141, 196, 0.78)", // Azul claro
      "rgba(120, 201, 150, 0.8)", // Verde claro
      "rgba(228, 228, 125, 0.78)", // Amarillo claro
      "rgba(145, 53, 73, 0.35)", // Rojo oscuro
      "rgba(255, 99, 132, 0.5)", // Rosa
      "rgba(54, 162, 235, 0.5)", // Azul
      "rgba(75, 192, 192, 0.5)", // Verde agua
      "rgba(153, 102, 255, 0.5)", // Púrpura
      "rgba(255, 159, 64, 0.5)", // Naranja
    ];

    const borderColorVariants = predefinedColors.map((color) =>
      color.replace("0.5", "1")
    );

    // Preparar los datos para Chart.js
    const data = {
      labels: Object.keys(conteos), // Combinación de procesador y generación
      datasets: [
        {
          label: `Cantidad`,
          data: Object.values(conteos), // Cantidades correspondientes
          backgroundColor: predefinedColors.slice(
            0,
            Object.keys(conteos).length
          ),
          borderColor: predefinedColors.slice(0, Object.keys(conteos).length),
          borderWidth: 1,
        },
      ],
    };

    return { data, cantidad: equipos.length };
  } catch (error) {
    console.error("Error al obtener estadísticas de procesadores:", error);
    throw new Error("Error al obtener los datos");
  }
};

const getEstadisticasAntivirus = async () => {
  try {
    // Obtener todos los registros
    const equipos = await db.equipo.findAll({
      where: {
        tipo: {
          [Op.in]: ["Cpu", "Laptop"], // Incluir tanto Cpu como Laptop
        },
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      attributes: ["antivirus"],
    });

    const conteos = {
      antivirusHabilitado: 0,
      antivirusDeshabilitado: 0,
    };

    equipos.forEach(({ antivirus }) => {
      if (antivirus) {
        conteos.antivirusHabilitado += 1; // Contar los que tienen antivirus habilitado (true)
      } else {
        conteos.antivirusDeshabilitado += 1; // Contar los que tienen antivirus deshabilitado (false)
      }
    });

    const predefinedColors = [
      "rgba(75, 192, 192, 0.8)", // Verde para habilitado
      "rgba(255, 99, 132, 0.8)", // Rojo para deshabilitado
    ];

    const borderColorVariants = predefinedColors.map((color) =>
      color.replace("0.5", "1")
    );

    // Preparar los datos para Chart.js
    const data = {
      labels: ["Con Antivirus", "Sin Antivirus"], // Combinación de procesador y generación
      datasets: [
        {
          label: `Cantidad`,
          data: [conteos.antivirusHabilitado, conteos.antivirusDeshabilitado],
          backgroundColor: predefinedColors.slice(
            0,
            Object.keys(conteos).length
          ),
          borderColor: predefinedColors.slice(0, Object.keys(conteos).length),
          borderWidth: 1,
        },
      ],
    };

    return { data, cantidad: equipos.length };
  } catch (error) {
    console.error("Error al obtener estadísticas de procesadores:", error);
    throw new Error("Error al obtener los datos");
  }
};

// Ejemplo de función para normalizar el nombre del procesador
const normalizarProcesador = (procesador) => {
  if (!procesador) return "Sin Procesar";

  // Normalización básica: convertir a mayúsculas y eliminar espacios adicionales
  return procesador.trim().toUpperCase();
};

const getEquipoChart = async (req, res) => {
  try {
    const datosImpresoras = await getDatosPorTipo("Impresora");
    const datosCPU = await getDatosPorTipo("Cpu");
    const datosLaptop = await getDatosPorTipo("Laptop");
    const datosMonitor = await getDatosPorTipo("Monitor");
    const datosTeclado = await getDatosPorTipo("Teclado");
    const datosMouse = await getDatosPorTipo("Mouse");
    const equiposAnio = await getEquiposPorAño();
    const tipoImpresora = await getImpresorasPorTipo(
      "Impresora",
      "subtipo_impresora",
      "Cantidad"
    );
    const tipoImpresoraSuministro = await getImpresorasPorTipo(
      "Impresora",
      "suministro",
      "Cantidad"
    );
    const tipoMonitor = await getImpresorasPorTipo(
      "Monitor",
      "tecnologia_monitor",
      "Cantidad"
    );
    const monitorporPulgadas = await getImpresorasPorTipo(
      "Monitor",
      "pulgadas",
      "Cantidad"
    );

    const cpusPorGeneracion = await getProcesadoresPorGeneracion(
      "Cpu",
      "generacion_procesador",
      "Cantidad"
    );
    const procesadores = await getEstadisticasProcesadores();
    const sistema_operativo = await getEstadisticasLincencias();
    const antivirus = await getEstadisticasAntivirus();

    return res.json({
      monitorporPulgadas: monitorporPulgadas.data,
      tipoImpresoraSuministro: tipoImpresoraSuministro.data,
      procesadores: procesadores.data,
      tipoMonitor: tipoMonitor.data,
      tipoImpresora: tipoImpresora.data,
      impresoras: datosImpresoras.data,
      cpu: datosCPU.data,
      laptop: datosLaptop.data,
      monitor: datosMonitor.data,
      mouse: datosMouse.data,
      anio: equiposAnio,
      teclado: datosTeclado.data,
      cantidadTeclado: datosTeclado.cantidad,
      cantidadMouse: datosMouse.cantidad,
      cpusPorGeneracion: cpusPorGeneracion.data,
      impresorasCantidad: datosImpresoras.cantidad,
      cpuCantidad: datosCPU.cantidad,
      laptopCantidad: datosLaptop.cantidad,
      monitorCantidad: datosMonitor.cantidad,
      tipoImpresoraCantidad: tipoImpresora.cantidad,
      tipoImpresoraSuministroCantidad: tipoImpresoraSuministro.cantidad,
      tipoMonitorCantidad: tipoMonitor.cantidad,
      monitorporPulgadasCantidad: monitorporPulgadas.cantidad,
      cpusPorGeneracionCantidad: cpusPorGeneracion.cantidad,
      procesadoresCantidad: procesadores.cantidad,
      sistema_operativo: sistema_operativo.data,
      sistema_operativo_cantidad: sistema_operativo.cantidad,
      antivirus: antivirus.data,
      antivirus_cantidad: antivirus.cantidad,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//para el actualizar de los equipos nuevos y subirlos al inventario
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

      // Verificar si sbn existe antes de usar slice
      const sbnPrefix = item.sbn ? item.sbn.slice(0, 8) : null;

      const newItem = {
        ...item,
        trabajador_id: trabajadorId,
        estado_conserv: item.estado_conserv, // Mapeo directo del estado_conserv del SIGA al estado de tu base de datos
      };

      // Solo considerar los registros con fecha_ingreso en el año actual y que coincidan con los prefijos
      if (
        fechaIngreso.getFullYear() === currentYear &&
        sbnPrefix &&
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

const equiposBienesSigaComparar = async (req, res) => {
  try {
    const response = await fetch("http://10.30.1.42:8084/api/v1/bienes/prueba");
    const externalData = await response.json();

    const existingData = await db.equipo.findAll({
      attributes: ["id", "sbn", "fecha_ingreso"],
    });

    // Crear un mapa de los registros existentes en la tabla db.equipo usando el sbn
    const existingMap = new Map(
      existingData.map((item) => [
        item.sbn,
        { id: item.id, fecha_ingreso: item.fecha_ingreso },
      ])
    );

    // Lista para almacenar los registros que están en el response y en la tabla db.equipo,
    // pero que no tienen fecha_ingreso en la base de datos
    const registrosActualizar = [];

    externalData?.data?.forEach((item) => {
      const sbn = item.sbn;
      const fechaIngreso = new Date(item.fecha_ingreso);

      // Verificar si el registro existe en la base de datos y no tiene fecha_ingreso
      if (sbn && existingMap.has(sbn)) {
        const { id, fecha_ingreso: fechaIngresoDb } = existingMap.get(sbn);

        // Si el registro en la base de datos no tiene fecha_ingreso pero en el response sí
        if (!fechaIngresoDb && fechaIngreso) {
          registrosActualizar.push({ id, fecha_ingreso: fechaIngreso });
        }
      }
    });

    // Actualizar los registros en la base de datos
    for (const registro of registrosActualizar) {
      await db.equipo.update(
        { fecha_ingreso: registro.fecha_ingreso },
        { where: { id: registro.id } }
      );
    }

    // Devolver los registros que fueron actualizados
    return res.json({
      cantidad: registrosActualizar.length,
      data: registrosActualizar,
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

const getEquiposActualizados = async (req, res) => {
  try {
    const fechaComparar = new Date("2024-08-26T00:00:00");

    const equipos = await db.equipo.findAll({
      where: {
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
    });
    return res.json({ contador: equipos.length, data: equipos });
  } catch (error) {
    console.log(error);
  }
};
const getEstadisticasPorDependencia = async (req, res) => {
  try {
    const fechaComparar = "2024-08-26 00:00:00"; // Ajusta según la fecha que necesites

    // Total por tipo
    const totalPorTipo = await db.equipo.findAll({
      attributes: [
        "tipo",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "cantidad"],
      ],
      where: {
        tipo: { [Op.ne]: null },

        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      group: ["tipo"],
      raw: true,
    });

    // Total por dependencia
    const totalPorDependencia = await db.equipo.findAll({
      attributes: [
        [db.Sequelize.col("dependencia.nombre"), "nombre_dependencia"],
        [db.Sequelize.fn("COUNT", db.Sequelize.col("equipo.id")), "cantidad"],
      ],
      include: [
        {
          model: db.dependencias,
          attributes: [],
        },
      ],
      where: {
        dependencia_id: { [Op.ne]: null },
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      group: ["dependencia.nombre"],
      raw: true,
    });

    // Total por tipo agrupado por dependencia
    const totalPorTipoPorDependencia = await db.equipo.findAll({
      attributes: [
        [db.Sequelize.col("dependencia.nombre"), "nombre_dependencia"],
        "tipo",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("equipo.id")), "cantidad"],
      ],
      include: [
        {
          model: db.dependencias,
          attributes: [],
        },
      ],
      where: {
        dependencia_id: { [Op.ne]: null },
        tipo: { [Op.ne]: null },
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      group: ["dependencia.nombre", "tipo"],
      order: [[db.Sequelize.col("dependencia.nombre"), "ASC"]], // Ordena por nombre de la dependencia en orden ascendente
    });

    res.json({
      totalPorTipo,
      totalPorDependencia,
      totalPorTipoPorDependencia: totalPorTipoPorDependencia,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};

const getEstadisticasPorSubDependencia = async (req, res) => {
  try {
    const fechaComparar = "2024-08-26 00:00:00"; // Ajusta según la fecha que necesites

    // Total por tipo
    const totalPorTipo = await db.equipo.findAll({
      attributes: [
        "tipo",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("id")), "cantidad"],
      ],
      where: {
        sbn: { [Op.not]: null },
        tipo: {
          [Op.in]: ["Cpu", "Laptop"], // Incluir tanto Cpu como Laptop
        },
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      group: ["tipo"],
      // order: [[db.Sequelize.col("sub_dependencia.nombre"), "ASC"]],
      raw: true,
    });

    // Total por subdependencia
    const totalPorSubDependencia = await db.equipo.findAll({
      attributes: [
        [db.Sequelize.col("sub_dependencia.nombre"), "nombre_sub_dependencia"],
        [db.Sequelize.fn("COUNT", db.Sequelize.col("equipo.id")), "cantidad"],
      ],
      include: [
        {
          model: db.sub_dependencias, // Aquí referencia al modelo de sub_dependencias
          as: "sub_dependencia", // Alias que se usa para la relación
          attributes: [], // No necesitamos otros atributos de sub_dependencia
        },
      ],
      where: {
        sub_dependencia_id: { [Op.ne]: null }, // Asegurarse de que haya una sub_dependencia
        tipo: {
          [Op.in]: ["Cpu", "Laptop"], // Incluir tanto Cpu como Laptop
        },
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      group: ["sub_dependencia.nombre"], // Agrupar por el nombre de la subdependencia
      order: [[db.Sequelize.col("sub_dependencia.nombre"), "ASC"]], // Ordenar alfabéticamente (ascendente)
      raw: true,
    });

    // Total por tipo agrupado por subdependencia
    const totalPorTipoPorSubDependencia = await db.equipo.findAll({
      attributes: [
        [db.Sequelize.col("sub_dependencia.nombre"), "nombre_sub_dependencia"],
        "tipo",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("equipo.id")), "cantidad"],
      ],
      include: [
        {
          model: db.sub_dependencias, // Relacionar con sub_dependencias
          as: "sub_dependencia", // Alias correcto para la relación
          attributes: [],
        },
      ],
      where: {
        sub_dependencia_id: { [Op.ne]: null },
        tipo: {
          [Op.in]: ["Cpu", "Laptop"], // Incluir tanto Cpu como Laptop
        },
        [Op.or]: [
          {
            updatedAt: {
              [Op.gte]: fechaComparar,
            },
          },
          {
            createdAt: {
              [Op.gte]: fechaComparar,
            },
          },
        ],
      },
      group: ["sub_dependencia.nombre", "tipo"], // Agrupar por nombre de subdependencia y tipo
      order: [[db.Sequelize.col("sub_dependencia.nombre"), "ASC"]], // Ordenar por nombre de la subdependencia
      raw: true,
    });

    // Responder con los resultados obtenidos
    res.json({
      totalPorTipo,
      totalPorSubDependencia,
      totalPorTipoPorSubDependencia: totalPorTipoPorSubDependencia,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};

// const getEstadisticasPorSubDependencia = async (req, res) => {
//   try {
//     const fechaComparar = "2024-08-27 00:00:00";  // Asegúrate de definir esta variable
//     const equipos = await db.equipo.findAll({
//       attributes: [
//         "procesador",
//         [db.Sequelize.fn("COUNT", db.Sequelize.col("equipo.id")), "cantidad"],  // Especificar tabla `equipo.id`
//       ],
//       include: [
//         {
//           model: db.sedes, // Asegúrate que este sea el nombre correcto del modelo para "sedes"
//           attributes: ["nombre"],
//           as: "sede",
//         },
//         {
//           model: db.sub_dependencias, // Verifica que este sea el nombre correcto del modelo para "sub_dependencias"
//           attributes: ["nombre"],
//           as: "sub_dependencia",
//         },
//       ],
//       where: {
//         sbn: { [Op.not]: null },
//         tipo: {
//           [Op.in]: ["Cpu", "Laptop"], // Incluir tanto Cpu como Laptop
//         },
//         [Op.or]: [
//           {
//             updatedAt: {
//               [Op.gte]: fechaComparar,
//             },
//           },
//           {
//             createdAt: {
//               [Op.gte]: fechaComparar,
//             },
//           },
//         ],
//         sede_id: { [Op.ne]: null }, // Asegura que solo se incluyan equipos con sede
//         sub_dependencia_id: { [Op.ne]: null }, // Asegura que solo se incluyan equipos con subdependencia
//       },
//       group: ["sede.nombre", "sub_dependencia.nombre", "procesador", "equipo.id"], // Asegurarse de agrupar por `equipo.id`
//       order: [
//         [db.Sequelize.col("sede.nombre"), "ASC"],
//         [db.Sequelize.col("sub_dependencia.nombre"), "ASC"],
//       ],
//       raw: true,
//     });
//     let tabla = {};

//     equipos.forEach((item) => {
//       let sede = item["sede.nombre"];
//       let sub_dependencia = item["sub_dependencia.nombre"];
//       let procesador = item.procesador;
//       let cantidad = item.cantidad;

//       if (!tabla[sede]) {
//         tabla[sede] = {};
//       }

//       if (!tabla[sede][sub_dependencia]) {
//         tabla[sede][sub_dependencia] = {
//           "DUAL CORE": 0,
//           "CORE 2 DUO": 0,
//           "CORE 2 QUAD": 0,
//           "CORE I3": 0,
//           "CORE I5": 0,
//           "CORE I7": 0,
//           TOTAL: 0,
//         };
//       }

//       if (tabla[sede][sub_dependencia][procesador] !== undefined) {
//         tabla[sede][sub_dependencia][procesador] += cantidad;
//         tabla[sede][sub_dependencia]["TOTAL"] += cantidad;
//       }
//     });

//     console.log(tabla);
//     res.json(tabla);
//   } catch (error) {
//     console.error("Error al obtener estadísticas:", error);
//     res.status(500).json({ error: "Error al obtener estadísticas" });
//   }
// };

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
  excelEquipos,
  getEquiposActualizados,
  getImpresorasPorTipo,
  getEstadisticasPorDependencia,
  equiposBienesSigaComparar,
  getEquiposInventariados,
  getEstadisticasLincencias,
  getEstadisticasPorSubDependencia,
  getEquipoSede,
};
