// rtrProvincia.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/provincias/add', (req, res, next) => {
    db.query(
      'INSERT INTO Provincia (Nombre) VALUES (?)',
      [req.body.nombre],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'Error introduciendo nueva provincia en BD.' });
        } else {
          res.status(200).json({ status: 'Nueva provincia introducida en BD.' });
        }
      }
    );
  });

  router.get('/provincias', function (req, res, next) {
    query = `SELECT Id, Nombre FROM Provincia WHERE ` + 
             (req.query.nombre != '' ? `Nombre LIKE '%${req.query.nombre}%' AND ` : ``) + 
             '1 ORDER BY Nombre ASC';

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo provincias de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/provincias/:id', function (req, res, next) {
    db.query(
      'SELECT Id, Nombre FROM Provincia WHERE Id = ?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo provincia de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/provincias/update/:id', function (req, res, next) {
    db.query(
      'UPDATE Provincia SET Nombre = ? WHERE Id = ?',
      [req.body.nombre, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error actualizando provincia en BD.' });
        } else {
          res.status(200).json({ status: 'Provincia actualizada en BD.' });
        }
      }
    );
  });

  router.delete('/provincias/delete/:id', function (req, res, next) {
    db.query(
      'DELETE FROM Provincia WHERE Id = ?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error eliminando provincia en BD.' });
        } else {
          res.status(200).json({ status: 'Provincia eliminada en BD.' });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;