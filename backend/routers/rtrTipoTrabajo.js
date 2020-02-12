// rtrTipoTrabajo.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/tipos-trabajo/add', (req, res, next) => {
    db.query(
      'INSERT INTO TipoTrabajo (Nombre) VALUES (?)',
      [req.body.nombre],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'Error introduciendo nuevo tipo de trabajo en BD.' });
        } else {
          res.status(200).json({ status: 'Nuevo tipo de trabajo introducida en BD.' });
        }
      }
    );
  });

  router.get('/tipos-trabajo', function (req, res, next) {
    query = `SELECT Id, Nombre FROM TipoTrabajo WHERE ` + 
             (req.query.nombre != '' ? `Nombre LIKE '%${req.query.nombre}%' AND ` : ``) + 
             `1`;

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo tipos de trabajo de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/tipos-trabajo/:id', function (req, res, next) {
    db.query(
      'SELECT Id, Nombre FROM TipoTrabajo WHERE Id = ?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo tipo de trabajo de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/tipos-trabajo/update/:id', function (req, res, next) {
    db.query(
      'UPDATE TipoTrabajo SET Nombre = ? WHERE Id = ?',
      [req.body.nombre, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error actualizando tipo de trabajo en BD.' });
        } else {
          res.status(200).json({ status: 'Tipo de trabajo actualizado en BD.' });
        }
      }
    );
  });

  router.delete('/tipos-trabajo/delete/:id', function (req, res, next) {
    db.query(
      'DELETE FROM TipoTrabajo WHERE Id = ?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error eliminando tipo de trabajo en BD.' });
        } else {
          res.status(200).json({ status: 'Tipo de trabajo eliminado en BD.' });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;