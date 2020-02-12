// rtrEstado.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/estados/add', (req, res, next) => {
    db.query(
      'INSERT INTO Estado (Nombre) VALUES (?)',
      [req.body.nombre],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'Error introduciendo nuevo estado en BD.' });
        } else {
          res.status(200).json({ status: 'Nuevo estado introducida en BD.' });
        }
      }
    );
  });

  router.get('/estados', function (req, res, next) {
    query = `SELECT Id, Nombre FROM Estado WHERE ` + 
             (req.query.nombre != '' ? `Nombre LIKE '%${req.query.nombre}%' AND ` : ``) + 
             `1`;

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo estados de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/estados/:id', function (req, res, next) {
    db.query(
      'SELECT Id, Nombre FROM Estado WHERE Id = ?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo estado de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/estados/update/:id', function (req, res, next) {
    db.query(
      'UPDATE Estado SET Nombre = ? WHERE Id = ?',
      [req.body.nombre, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error actualizando estado en BD.' });
        } else {
          res.status(200).json({ status: 'Estado actualizado en BD.' });
        }
      }
    );
  });

  router.delete('/estados/delete/:id', function (req, res, next) {
    db.query(
      'DELETE FROM Estado WHERE Id = ?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error eliminando estado en BD.' });
        } else {
          res.status(200).json({ status: 'Estado eliminado en BD.' });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;