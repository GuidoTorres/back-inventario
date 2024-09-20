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

const getEquiposInventariados = async (req, res) => {
  try {
    const equipo = await db.equipo.findAll({
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

const actualizarEquiposDesdeExcel = async (filePath) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const allRows = []; // Array para almacenar todas las filas de todas las hojas
    const allEquiposData = [];

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

      // Agregar las filas procesadas al array general
      allRows.push(...formattedData);
    }

    // Procesar cada fila en allRows
    for (const row of allRows) {
      const equipoData = {
        tipo:
          row["TIPO"] === "UNIDAD CENTRAL DE PROCESOS" ? "Cpu" : row["TIPO"],
        subtipo_impresora: row["subtipo"] || null,
        marca: row["MARCA"] || null,
        sbn: row["SBN"] || null,
        sbn_cpu: row["SBN - CPU"] || null,
        procesador:
          row["Procesador y Velocidad (I5, Core2 Dual, P4, P3) (GHZ, MHZ)"] ||
          null,
        generacion_procesador: row["Generacion"] || null,
        capacidad_disco_duro: row["ALMACENAMIENTO"] || null,
        memoria_ram: row["Memoria (GB, MB)"] || null,
        tarjeta_video: row["GRAFICA DEDICADA"] || null,
        descripcion: row["TIPO"] || null,
        trabajador_id: row["TRABAJADOR_ID"] || null,
        modelo: row["MODELO"] || null,
        usuario_actual: row["Usuario (Apellidos, Nombre)"] || null,
        nombre_pc: row["Nombre  PC"] || null,
        tipo_disco_duro: row["TIPO DISCO"] || null,
        almacenamiento: row["ALMACENAMIENTO"] || null,
        unidad_optica: row["UNIDAD OPTICA"] === "SI",
        antivirus: row["ANTIVIRUS"] === "SI",
        windows: row["WINDOWS"] === "SI",
        version_windows: row["WINDOWS"] || null,
        sistema_operativo: row["SISTEMA OPERATIVO"] || null,
        ofimatica: row["OFIMATICA"] || null,
        office: row["OFFICE"] || null,
        mac: row["MAC"] || null,
        suministro: row["SUMINISTRO"] || null,
        tamaño: row["TAMAÑO"] || null,
        ip: row["IP"] || null,
        tecnologia_monitor: row["TECNOLOGIA_MONITOR"] || null,
        pulgadas: row["PULGADAS"] || null,
        anexo: row["ANEXO"] || null,
        sede_id: row["SEDE"] || null,
        modulo_id: row["MODULO"] || null,
        dependencia_id: row["Area"] || null,
        sub_dependencia_id: row["Oficina"] || null,
      };

      // Verificar que 'sbn' tenga un valor
      if (!equipoData.sbn) {
        console.warn(
          `El registro con nombre_pc ${equipoData.nombre_pc} no tiene 'SBN' definido. Se omitirá este registro.`
        );
        continue; // Saltar este registro si 'sbn' es null o undefined
      }

      // Buscar si el registro ya existe
      const equipoExistente = await db.equipo.findOne({
        where: { sbn: equipoData.sbn },
      });

      if (equipoExistente) {
        // Actualizar el registro existente
        await equipoExistente.update(equipoData);
        console.log(`Registro actualizado para SBN: ${equipoData.sbn}`);
      } else {
        // Crear un nuevo registro
        await db.equipo.create(equipoData);
        console.log(`Registro creado para SBN: ${equipoData.sbn}`);
      }

      allEquiposData.push(equipoData);
    }

    console.log("Actualización completa");
    return allEquiposData; // Devolver todos los resultados
  } catch (error) {
    console.error("Error al actualizar los equipos:", error);
    throw error; // Lanzar el error para que pueda ser capturado en el controlador
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
          data: [
            conteos.antivirusHabilitado,
            conteos.antivirusDeshabilitado,
          ],
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
      antivirus_cantidad: antivirus.cantidad
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
  getEstadisticasLincencias
};
