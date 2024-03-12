const express = require('express')

const trabajadorRouter = require("./trabajadores")
const equipoRouter = require("./equipos")
const cargosRouter = require("./cargos")
const perifericosRouter = require("./perifericos")
const unidadRouter = require("./unidad")
const baseRouter = require("./base")
const usuarioRouter = require("./usuario")
const authRouter = require("./auth")


function routerApi(app){

    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/trabajadores', trabajadorRouter)
    router.use('/equipos', equipoRouter)
    router.use('/cargos', cargosRouter)
    router.use('/perifericos', perifericosRouter)
    router.use('/unidad', unidadRouter)
    router.use('/base', baseRouter)
    router.use('/usuario', usuarioRouter)
    router.use('/auth', authRouter)


    // router.use('/mantenimientos')
    // router.use('/red')
    // router.use('/soporte')

}

module.exports = routerApi