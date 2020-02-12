// rtrContCom.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/contComs/add', (req, res, next) => {
    query = 'INSERT INTO ContratoComercializadora (' + 
            'Subvencion, NumeroSolicitud, Facturado, NumeroCertificacion) ' + 
            'VALUES (' + 
            `${req.body.subvencion}, '${req.body.numeroSolicitud}', ` + 
            `${req.body.facturado}, '${req.body.numeroCertificacion}')`;

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'Error introduciendo nuevo contCom en BD.' });
        } else {
          res.status(200).json({ status: 'Nuevo contCom introducida en BD.',
                                  id: results.insertId });
        }
      }
    );
  });

  router.get('/contComs', function (req, res, next) {
    query = `SELECT Id, Subvencion, NumeroSolicitud, Facturado, NumeroCertificacion ` + 
            `FROM ContratoComercializadora WHERE ` + 
             (req.query.numeroSolicitud != '' ? `NumeroSolicitud LIKE '%${req.query.numeroSolicitud}%' AND ` : ``) + 
             (req.query.numeroCertificacion != '' ? `NumeroCertificacion LIKE '%${req.query.numeroCertificacion}%' AND ` : ``) + 
             `1`;

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo contComs de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/contComs/:id', function (req, res, next) {
    db.query(
      'SELECT Id, Subvencion, NumeroSolicitud, Facturado, NumeroCertificacion ' + 
      'FROM ContratoComercializadora WHERE Id = ?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo contCom de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/contComs/update/:id', function (req, res, next) {
    query = 'UPDATE ContratoComercializadora SET ' + 
            `Subvencion = ${req.body.subvencion}, NumeroSolicitud = '${req.body.numeroSolicitud}', ` +
            `Facturado = ${req.body.facturado}, NumeroCertificacion = '${req.body.numeroCertificacion}' ` + 
            `WHERE Id = ${req.params.id}`;

    db.query(
      query,
      [],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error actualizando contCom en BD.' });
        } else {
          res.status(200).json({ status: 'ContCom actualizado en BD.' });
        }
      }
    );
  });

  router.delete('/contComs/delete/:id', function (req, res, next) {
    db.query(
      'DELETE FROM ContratoComercializadora WHERE Id = ?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error eliminando contCom en BD.' });
        } else {
          res.status(200).json({ status: 'ContCom eliminado en BD.' });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;