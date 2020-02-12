// rtrInstalacion.js

const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/instalaciones/add', (req, res, next) => {

    query = 'INSERT INTO Instalacion (' +
            'EsBaja, Direccion, Id_Poblacion, Id_Contratante, FechaInstalacion, ' +
            'Agente, Instaladores, Presupuesto, Observaciones, ';

    if(req.body.tipo == 1) // IRC
        query += 'IRC_NumLlaves, IRC_Facturado, ';
    
    else if(req.body.tipo == 2 || req.body.tipo == 3 ||
            req.body.tipo == 4 || req.body.tipo == 5) { // IRIS
        
        query += 'IRIS_Nombre, IRIS_Apellidos, IRIS_Dni, IRIS_Telefonos, ' +
                'IRIS_Cobrado, IRIS_AparatoExistente, IRIS_AparatosVendidos, ';
        
        if(req.body.tipo == 2 || req.body.tipo == 3 || req.body.tipo == 4) {

            query += 'IRISC_Id_Estado, IRISC_FechaContrato, IRISC_Observaciones, ';

            if(req.body.tipo == 2) { // Gas Natural
                query += 'IRISGN_Id_Mercado, IRISGN_FechaPuestaGas, IRISGN_TiposAparato, IRISGN_Piezas, ' +
                        'IRISGN_TiroForzado, IRISGN_SoporteExterior, IRISGN_Idi, IRISGN_Facturado1, IRISGN_Facturado2, ' +
                        'IRISGN_Id_ContCom, IRISGN_Id_ContDist, IRISGN_ContObservaciones, ';
            }
            else if(req.body.tipo == 3 || req.body.tipo == 4) { // Mantenimiento
                query += 'IRISM_FechaMantenimiento, ';

                if(req.body.tipo == 3) { // Butano
                    query += 'IRISB_Id_TipoTrabajo, '
                }
            }
        }
    }

    query += 'Tipo) VALUES (' +
            `${req.body.esBaja}, '${req.body.direccion}', ${req.body.id_poblacion}, ` + 
            `${req.body.id_contratante}, ${req.body.fechaInstalacion}, '${req.body.agente}', ` + 
            `'${req.body.instaladores}', ${req.body.presupuesto}, '${req.body.observaciones}', `;

    if(req.body.tipo == 1) // IRC
        query += `${req.body.irc_numLlaves}, ${req.body.irc_facturado}, `;

    else if(req.body.tipo == 2 || req.body.tipo == 3 ||
            req.body.tipo == 4 || req.body.tipo == 5) { // IRIS
        
        query += `'${req.body.iris_nombre}', '${req.body.iris_apellidos}', '${req.body.iris_dni}', '${req.body.iris_telefonos}', ` + 
                `${req.body.iris_cobrado}, '${req.body.iris_aparatoExistente}', '${req.body.iris_aparatosVendidos}', `;
        
        if(req.body.tipo == 2 || req.body.tipo == 3 || req.body.tipo == 4) {

            query += `${req.body.irisc_id_estado}, ${req.body.irisc_fechaContrato}, '${req.body.irisc_observaciones}', `;

            if(req.body.tipo == 2) { // Gas Natural
                query += `${req.body.irisgn_id_mercado}, ${req.body.irisgn_fechaPuestaGas}, '${req.body.irisgn_tiposAparato}', '${req.body.irisgn_piezas}', ` + 
                        `${req.body.irisgn_tiroForzado}, ${req.body.irisgn_soporteExterior}, ${req.body.irisgn_idi}, ${req.body.irisgn_facturado1}, ${req.body.irisgn_facturado2}, ` + 
                        `${req.body.irisgn_id_contCom}, ${req.body.irisgn_id_contDist}, '${req.body.irisgn_contObservaciones}', `;
            }
            else if(req.body.tipo == 3 || req.body.tipo == 4) { // Mantenimiento
                query += `${req.body.irism_fechaMantenimiento}, `;

                if(req.body.tipo == 3) { // Butano
                    query += `${req.body.irisb_id_tipoTrabajo}, `;
                }
            }
        }
    }

    query += `${req.body.tipo})`;
    
    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'Error introduciendo nueva instalación en BD.' });
        } else {
          res.status(200).json({ status: 'Nueva instalación introducida en BD.',
                                 id: results.insertId });
        }
      }
    );
  });

  router.get('/instalaciones', function (req, res, next) {
    query = 'SELECT Id, EsBaja, Direccion, Id_Poblacion, FechaInstalacion, Id_Contratante, IRIS_Nombre, IRIS_Apellidos, Tipo ' + 
            'FROM Instalacion WHERE ' + 
             (req.query.esBaja != 'null' ? `EsBaja = ${req.query.esBaja} AND ` : ``) + 
             (req.query.direccion != '' ? `Direccion LIKE '%${req.query.direccion}%' AND ` : ``) + 
             (req.query.poblacion != 'null' ? `Id_Poblacion = ${req.query.poblacion} AND ` : ``) + 
             (req.query.preFecha != 'null' ? `FechaInstalacion >= ${req.query.preFecha} AND ` : ``) + 
             (req.query.postFecha != 'null' ? `FechaInstalacion <= ${req.query.postFecha} AND ` : ``) + 
             (req.query.contratante != 'null' ? `Id_Contratante = ${req.query.contratante} AND ` : ``) + 
             (req.query.apellidos != '' ? `IRIS_Apellidos LIKE '%${req.query.apellidos}%' AND ` : ``) + 
             (req.query.tipo ? `Tipo = ${req.query.tipo} AND ` : ``) + 
             '1 ORDER BY Id DESC';    

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          res.status(500).json({ status: 'Error obteniendo instalaciones de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/instalaciones/:id', function (req, res, next) {

    query = 'SELECT Id, ' +
            'EsBaja, Direccion, Id_Poblacion, Id_Contratante, FechaInstalacion, ' +
            'Agente, Instaladores, Presupuesto, Observaciones, ';

    if(req.query.tipo == 1) // IRC
        query += 'IRC_NumLlaves, IRC_Facturado, ';
    
    else if(req.query.tipo == 2 || req.query.tipo == 3 ||
            req.query.tipo == 4 || req.query.tipo == 5) { // IRIS
        
        query += 'IRIS_Nombre, IRIS_Apellidos, IRIS_Dni, IRIS_Telefonos, ' +
                'IRIS_Cobrado, IRIS_AparatoExistente, IRIS_AparatosVendidos, ';
        
        if(req.query.tipo == 2 || req.query.tipo == 3 || req.query.tipo == 4) {

            query += 'IRISC_Id_Estado, IRISC_FechaContrato, IRISC_Observaciones, ';

            if(req.query.tipo == 2) { // Gas Natural
                query += 'IRISGN_Id_Mercado, IRISGN_FechaPuestaGas, IRISGN_TiposAparato, IRISGN_Piezas, ' +
                        'IRISGN_TiroForzado, IRISGN_SoporteExterior, IRISGN_Idi, IRISGN_Facturado1, IRISGN_Facturado2, ' +
                        'IRISGN_Id_ContCom, IRISGN_Id_ContDist, IRISGN_ContObservaciones, ';
            }
            else if(req.query.tipo == 3 || req.query.tipo == 4) { // Mantenimiento
                query += 'IRISM_FechaMantenimiento, ';

                if(req.query.tipo == 3) { // Butano
                    query += 'IRISB_Id_TipoTrabajo, '
                }
            }
        }
    }

    query += `Tipo FROM Instalacion WHERE Id = ${req.params.id}`;

    db.query(
      query,
      [],
      (error, results) => {
        if (error) {
          res.status(500).json({ status: 'Error obteniendo instalación de BD.' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/instalaciones/update/:id', function (req, res, next) {

    query = 'UPDATE Instalacion SET ' +
            `EsBaja = ${req.body.esBaja}, Direccion = '${req.body.direccion}', Id_Poblacion = ${req.body.id_poblacion}, ` + 
            `Id_Contratante = ${req.body.id_contratante}, FechaInstalacion = ${req.body.fechaInstalacion}, Agente = '${req.body.agente}', ` + 
            `Instaladores = '${req.body.instaladores}', Presupuesto = ${req.body.presupuesto}, Observaciones = '${req.body.observaciones}', `;

    if(req.body.tipo == 1) // IRC
        query += `IRC_NumLlaves = ${req.body.irc_numLlaves}, IRC_Facturado = ${req.body.irc_facturado}, `;
    
    else if(req.body.tipo == 2 || req.body.tipo == 3 ||
            req.body.tipo == 4 || req.body.tipo == 5) { // IRIS
        
        query += `IRIS_Nombre = '${req.body.iris_nombre}', IRIS_Apellidos = '${req.body.iris_apellidos}', IRIS_Dni = '${req.body.iris_dni}', IRIS_Telefonos = '${req.body.iris_telefonos}', ` +
                `IRIS_Cobrado = ${req.body.iris_cobrado}, IRIS_AparatoExistente = '${req.body.iris_aparatoExistente}', IRIS_AparatosVendidos = '${req.body.iris_aparatosVendidos}', `;
        
        if(req.body.tipo == 2 || req.body.tipo == 3 || req.body.tipo == 4) { // Completa

            query += `IRISC_Id_Estado = ${req.body.irisc_id_estado}, IRISC_FechaContrato = ${req.body.irisc_fechaContrato}, IRISC_Observaciones = '${req.body.irisc_observaciones}', `;

            if(req.body.tipo == 2) { // Gas Natural
                query += `IRISGN_Id_Mercado = ${req.body.irisgn_id_mercado}, IRISGN_FechaPuestaGas = ${req.body.irisgn_fechaPuestaGas}, IRISGN_TiposAparato = '${req.body.irisgn_tiposAparato}', IRISGN_Piezas = '${req.body.irisgn_piezas}', ` +
                        `IRISGN_TiroForzado = ${req.body.irisgn_tiroForzado}, IRISGN_SoporteExterior = ${req.body.irisgn_soporteExterior}, IRISGN_Idi = ${req.body.irisgn_idi}, IRISGN_Facturado1 = ${req.body.irisgn_facturado1}, IRISGN_Facturado2 = ${req.body.irisgn_facturado2}, ` +
                        `IRISGN_Id_ContCom = ${req.body.irisgn_id_contCom}, IRISGN_Id_ContDist = ${req.body.irisgn_id_contDist}, IRISGN_ContObservaciones = '${req.body.irisgn_contObservaciones}', `;
            }
            else if(req.body.tipo == 3 || req.body.tipo == 4) { // Mantenimiento
                query += `IRISM_FechaMantenimiento = ${req.body.irism_fechaMantenimiento}, `;

                if(req.body.tipo == 3) { // Butano
                    query += `IRISB_Id_TipoTrabajo = ${req.body.irisb_id_tipoTrabajo}, `
                }
            }
        }
    }

    query += `Tipo = ${req.body.tipo} WHERE Id = ${req.params.id}`;
    
    db.query(
      query,
      [],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error actualizando instalación en BD.' });
        } else {
          res.status(200).json({ status: 'Instalación actualizada en BD.' });
        }
      }
    );
  });

  router.delete('/instalaciones/delete/:id', function (req, res, next) {
    db.query(
      'DELETE FROM Instalacion WHERE Id = ?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'Error eliminando instalación en BD.' });
        } else {
          res.status(200).json({ status: 'Instalación eliminada en BD.' });
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;