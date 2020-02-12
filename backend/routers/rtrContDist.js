// rtrContDist.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/contDists/add', (req, res, next) => {
    query = 'INSERT INTO ContratoDistribuidora (' + 
            'Campana, FechaGrabCont, FechaGrabCert, Cups, Regularizacion, NumCertRegul, ' + 
            'Subvencion, SubvFacturada, CobradoSubv, NumCertSubv, ' + 
            'Colaboracion, ColabFacturada, CobradoColab, NumCertColab, ' + 
            'NumSolicitudZeus, SubvencionIdi, IdiFacturado, ' + 
            'Tipo) ' + 
            'VALUES (' + 
            `'${req.body.campana}', ${req.body.fechaGrabCont}, ${req.body.fechaGrabCert}, ` + 
            `'${req.body.cups}', ${req.body.regularizacion}, '${req.body.numCertRegul}', ` + 
            `${req.body.subvencion}, ${req.body.subvFacturada}, ${req.body.cobradoSubv}, '${req.body.numCertSubv}', ` + 
            `${req.body.colaboracion}, ${req.body.colabFacturada}, ${req.body.cobradoColab}, '${req.body.numCertColab}', ` + 
            `'${req.body.numSolicitudZeus}', ${req.body.subvencionIdi}, ${req.body.idiFacturado}, ` + 
            `${req.body.tipo})`;         
        
    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'Error introduciendo nuevo contDist en BD.' });
        } else {
          res.status(200).json({ status: 'Nuevo contDist introducida en BD.',
                                  id: results.insertId });
        }
      }
    );
  });

  router.get('/contDists', function (req, res, next) {
    query = `SELECT Id, ` + 
            `Campana, FechaGrabCont, FechaGrabCert, Cups, Regularizacion, NumCertRegul, ` + 
            `Subvencion, SubvFacturada, CobradoSubv, NumCertSubv, ` + 
            `Colaboracion, ColabFacturada, CobradoColab, NumCertColab, ` + 
            `NumSolicitudZeus, SubvencionIdi, IdiFacturado, ` + 
            `Tipo ` + 
            `FROM ContratoDistribuidora WHERE ` + 
             (req.query.campana != '' ? `Campana LIKE '%${req.query.campana}%' AND ` : ``) + 
             (req.query.cups != '' ? `Cups LIKE '%${req.query.cups}%' AND ` : ``) + 
             `1`;

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo contDists de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/contDists/:id', function (req, res, next) {
    db.query(
      'SELECT Id, ' + 
      'Campana, FechaGrabCont, FechaGrabCert, Cups, Regularizacion, NumCertRegul, ' + 
      'Subvencion, SubvFacturada, CobradoSubv, NumCertSubv, ' + 
      'Colaboracion, ColabFacturada, CobradoColab, NumCertColab, ' + 
      'NumSolicitudZeus, SubvencionIdi, IdiFacturado, ' + 
      'Tipo ' + 
      'FROM ContratoDistribuidora WHERE Id = ?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'Error obteniendo contDist de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/contDists/update/:id', function (req, res, next) {
    query = 'UPDATE ContratoDistribuidora SET ' + 
            `Campana = '${req.body.campana}', FechaGrabCont = ${req.body.fechaGrabCont}, FechaGrabCert = ${req.body.fechaGrabCert}, ` + 
            `Cups = '${req.body.cups}', Regularizacion = ${req.body.regularizacion}, NumCertRegul = '${req.body.numCertRegul}', ` + 
            `Subvencion = ${req.body.subvencion}, SubvFacturada = ${req.body.subvFacturada}, CobradoSubv = ${req.body.cobradoSubv}, NumCertSubv = '${req.body.numCertSubv}', ` + 
            `Colaboracion = ${req.body.colaboracion}, ColabFacturada = ${req.body.colabFacturada}, CobradoColab = ${req.body.cobradoColab}, NumCertColab = '${req.body.numCertColab}', ` + 
            `NumSolicitudZeus = '${req.body.numSolicitudZeus}', SubvencionIdi = ${req.body.subvencionIdi}, IdiFacturado = ${req.body.idiFacturado}, ` + 
            `Tipo = ${req.body.tipo} ` + 
            `WHERE Id = ${req.params.id}`;

    db.query(
      query,
      [],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error actualizando contDist en BD.' });
        } else {
          res.status(200).json({ status: 'ContDist actualizado en BD.' });
        }
      }
    );
  });

  router.delete('/contDists/delete/:id', function (req, res, next) {
    db.query(
      'DELETE FROM ContratoDistribuidora WHERE Id = ?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error eliminando contDist en BD.' });
        } else {
          res.status(200).json({ status: 'ContDist eliminado en BD.' });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;