const db = require("../../app/models/index");
const getEquipo = async (req, res) => {
  try {
    const equipo = await db.equipo.findAll();

    const format = equipo.map((item, i) => {
      return{
        nro: i+1,
        ...item.dataValues
      }
    })
    return res.json({ data: format });
  } catch (error) {
    console.log(error);
  }
};
const getEquipoSelect = async (req, res) => {
  try {
    const equipo = await db.equipo.findAll({

      attributes: ['id', 'sbn']
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
      where: { tipo: tipoEquipo }
    });

    // Contar los estados para el tipo específico
    const conteos = {nuevo: 0, bueno: 0, regular: 0, malo: 0 };

    equiposFiltrados.forEach(({ estado }) => {
      if (['nuevo','bueno', 'regular', 'malo'].includes(estado.toLowerCase())) {
        conteos[estado.toLowerCase()]++;
      }
    });

    // Formatear los datos para Chart.js usando el formato especificado
    const data = {
      labels: ['Nuevo','Bueno', 'Regular', 'Malo'],
      datasets: [{
        label: `Cantidad`,
        data: [conteos.nuevo,conteos.bueno, conteos.regular, conteos.malo],
        backgroundColor: [
          'rgba(91, 141, 196, 0.78)',
          'rgba(120, 201, 150, 0.8)',
          'rgba(228, 228, 125, 0.78)',
          'rgba(145, 53, 73, 0.2)',

        ],
        borderColor: [
          'rgba(91, 141, 196, 0.78)',
          'rgba(120, 201, 150, 0.8)',
          'rgba(228, 228, 125, 0.78)',
          'rgba(145, 53, 73, 0.2)',

        ],
        borderWidth: 1
      }]
    };

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los datos');
  }
};
const getEquiposPorAño = async () => {
  try {
    // Obtener todos los equipos
    const equipos = await db.equipo.findAll();

    // Crear un objeto para contar los equipos por año de ingreso
    const conteosPorAño = {};

    equipos.forEach(({ ingreso }) => {
      const año = ingreso; // Directamente usar el valor del campo ingreso
      if (!conteosPorAño[año]) {
        conteosPorAño[año] = 0; // Inicializar el conteo para ese año si aún no existe
      }
      conteosPorAño[año]++; // Incrementar el conteo para el año
    });

    // Preparar los datos para el gráfico
    const data = {
      labels: Object.keys(conteosPorAño), // Años como texto
      datasets: [{
        label: 'Cantidad de Equipos',
        data: Object.values(conteosPorAño), // Cantidad de equipos por año
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los datos por año de ingreso');
  }
};


// La función getEquipo sigue siendo la misma, llamando a getDatosPorTipo para cada tipo de equipo.


const getEquipoChart = async (req, res) => {
  try {
    // Obtener los datos para 'Impresoras'
    const datosImpresoras = await getDatosPorTipo('Impresora');
    // Obtener los datos para 'CPU'
    const datosCPU = await getDatosPorTipo('Cpu');
    const datosLaptop = await getDatosPorTipo('Laptop');
    const datosMonitor = await getDatosPorTipo('Monitor');
    const equiposAnio = await getEquiposPorAño()
    return res.json({ impresoras: datosImpresoras, cpu: datosCPU, laptop: datosLaptop, monitor: datosMonitor, anio: equiposAnio });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  getEquipo,
  getEquipoChart,
  postEquipo,
  updateEquipo,
  deleteEquipo,
  getEquipoSelect
};
