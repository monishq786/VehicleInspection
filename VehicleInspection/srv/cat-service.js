const cds = require('@sap/cds')


module.exports = cds.service.impl(async(service)=>{

const db = await cds.connect.to("db");
const { ZSD_T_Customer,ZSD_T_VEHICLE} =service.entities;

    
})