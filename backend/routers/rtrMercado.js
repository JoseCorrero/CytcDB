// rtrMercado.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/mercados/add', (req, res, next) => {
    db.query(
      'INSERT INTO Mercado (Nombre) VALUES (?)',
      [req.body.nombre],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'Error introduciendo nuevo mercado en BD.' });
        } else {
          res.status(200).json({ status: 'Nuevo mercado introducida en BD.' });
        }
      }
    );
  });

  router.get('/mercados', function (req, res, next) {
    query = `SELECT Id, Nombre FROM Mercado WHERE ` + 
             (req.query.nombre != '' ? `Nombre LIKE '%${req.query.nombre}%' AND ` : ``) + 
             `1`;

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo mercados de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/mercados/:id', function (req, res, next) {
    db.query(
      'SELECT Id, Nombre FROM Mercado WHERE Id = ?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo mercado de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/mercados/update/:id', function (req, res, next) {
    db.query(
      'UPDATE Mercado SET Nombre = ? WHERE Id = ?',
      [req.body.nombre, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error actualizando mercado en BD.' });
        } else {
          res.status(200).json({ status: 'Mercado actualizado en BD.' });
        }
      }
    );
  });

  router.delete('/mercados/delete/:id', function (req, res, next) {
    db.query(
      'DELETE FROM Mercado WHERE Id = ?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error eliminando mercado en BD.' });
        } else {
          res.status(200).json({ status: 'Mercado eliminado en BD.' });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;