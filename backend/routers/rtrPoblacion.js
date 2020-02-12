// rtrPoblacion.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/poblaciones/add', (req, res, next) => {
    db.query(
      'INSERT INTO Poblacion (Id_Provincia, Nombre) VALUES (?,?)',
      [req.body.id_provincia, req.body.nombre],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'Error introduciendo nueva población en BD.' });
        } else {
          res.status(200).json({ status: 'Nueva población introducida en BD.' });
        }
      }
    );
  });

  router.get('/poblaciones', function (req, res, next) {
    query = `SELECT Id, Id_Provincia, Nombre FROM Poblacion WHERE ` + 
             (req.query.id_provincia != 'null' ? `Id_Provincia = ${req.query.id_provincia} AND ` : ``) +
             (req.query.nombre != '' ? `Nombre LIKE '%${req.query.nombre}%' AND ` : ``) + 
             '1 ORDER BY Nombre ASC';
             
    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo poblaciones de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/poblaciones/:id', function (req, res, next) {
    db.query(
      'SELECT Id, Id_Provincia, Nombre FROM Poblacion WHERE Id = ?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo población de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/poblaciones/update/:id', function (req, res, next) {
    db.query(
      'UPDATE Poblacion SET Id_Provincia = ?, Nombre = ? WHERE Id = ?',
      [req.body.id_provincia, req.body.nombre, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error actualizando población en BD.' });
        } else {
          res.status(200).json({ status: 'Población actualizada en BD.' });
        }
      }
    );
  });

  router.delete('/poblaciones/delete/:id', function (req, res, next) {
    db.query(
      'DELETE FROM Poblacion WHERE Id = ?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error eliminando población en BD.' });
        } else {
          res.status(200).json({ status: 'Población eliminada en BD.' });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;