const cds = require('@sap/cds')
const commonfun = require("./common-function")

module.exports = cds.service.impl(async(srv)=>{

const db = await cds.connect.to("db");
const { CustomerMasters,VehicleMasters} =srv.entities;


 // Before creating a new Customer, check if mobile/email exists
 srv.before('CREATE', CustomerMasters, async (req) => {
    const { mobileNo, emailAddress } = req.data;
    const existingCustomer = await commonfun.getDataFromTable({
        tableName:"CustomerMasters",
        conditions:[
            ["mobileNo","=" ,mobileNo],
            ["emailAddress","=" ,emailAddress]
        ]

    })


    // const existingCustomer = await SELECT.one.from(CustomerMasters)
    //     .where({ or: [{mobileNo: MobileNumber }, { emailAddress: EmailAddress }] });
    console.log(existingCustomer);
    
    if (existingCustomer) {
        // If mobile or email exists, copy existing Vehicles from parent
        // const existingVehicles = await SELECT.from(Vehicle).where({ customersUUID: existingCustomer.customersUUID });

        if (existingCustomer.length > 0) {
            // req.data.Vehicles = existingVehicles.map(vehicle => ({
            //     VehicleNumber: vehicle.VehicleNumber,
            //     Model: vehicle.Model
            // }));
            console.log("=======================>",req.data)
            const VehicleData = req.data.vehicleMasters[0]
            VehicleData.vehicleMasters_vehicleMastersUUID = existingCustomer.customersUUID
            console.log("=======================>",VehicleData)
            await cds.transaction(req).run(
                INSERT.into(VehicleMasters).entries(VehicleData)
            );
        }

        // req.data.CustomerID = existingCustomer.ID; // Map existing parent ID
    }
});
srv.before('CREATE', VehicleMasters, async (req) => {
    console.log("VehicleMasters Create ")
});
    
})