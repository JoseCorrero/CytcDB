// rtrMantenimiento.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.get('/mantenimientos', function (req, res, next) {
    query = 'SELECT Id, Direccion, Id_Poblacion, IRIS_Nombre, IRIS_Apellidos, IRISM_FechaMantenimiento, Tipo ' + 
            'FROM Instalacion ' + 
            'WHERE EsBaja = 0 AND (Tipo = 3 OR Tipo = 4) AND IRISM_FechaMantenimiento AND ' + 
            (req.query.fecha != 'null' ? `IRISM_FechaMantenimiento >= ${req.query.fecha} AND ` : ``) + 
            '1 ORDER BY IRISM_FechaMantenimiento ASC';

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo mantenimientos de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;