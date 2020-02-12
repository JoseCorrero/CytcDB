// rtrContratante.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/contratantes/add', (req, res, next) => {
    db.query(
      'INSERT INTO Contratante (Nombre) VALUES (?)',
      [req.body.nombre],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'Error introduciendo nueva contratante en BD.' });
        } else {
          res.status(200).json({ status: 'Nueva contratante introducida en BD.' });
        }
      }
    );
  });

  router.get('/contratantes', function (req, res, next) {
    query = `SELECT Id, Nombre FROM Contratante WHERE ` + 
             (req.query.nombre != '' ? `Nombre LIKE '%${req.query.nombre}%' AND ` : ``) + 
             `1`;

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo contratantes de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/contratantes/:id', function (req, res, next) {
    db.query(
      'SELECT Id, Nombre FROM Contratante WHERE Id = ?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo contratante de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/contratantes/update/:id', function (req, res, next) {
    db.query(
      'UPDATE Contratante SET Nombre = ? WHERE Id = ?',
      [req.body.nombre, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error actualizando contratante en BD.' });
        } else {
          res.status(200).json({ status: 'Contratante actualizada en BD.' });
        }
      }
    );
  });

  router.delete('/contratantes/delete/:id', function (req, res, next) {
    db.query(
      'DELETE FROM Contratante WHERE Id = ?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error eliminando contratante en BD.' });
        } else {
          res.status(200).json({ status: 'Contratante eliminada en BD.' });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;