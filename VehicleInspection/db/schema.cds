namespace Adnoc.VehicleInsp;


using {  managed} from '@sap/cds/common';



entity CustomerMasters : managed {
    key customersUUID  : UUID;
        customerNo     : Integer64;
        emiratesId     : String(100);
        firstName      : String(100);
        lastName       : String(100);
        mobileNo       : String(100);
        region         : String(100);
        BPGrouping     : String(100);
        extReference   : String(100);
        emailAddress   : String(100);
        vehicleMasters : Composition of many VehicleMasters
                             on vehicleMasters.customerMasters = $self;
}
 
entity VehicleMasters : managed {
    key vehicleMastersUUID          : UUID;
        plateNumber                 : String(100);
        plateSourceCode             : String(100);
        plateSource                 : String(100);
        plateSourceArabic           : String(100);
        plateColorCode              : String(100);
        plateColor                  : String(100);
        plateColorArabic            : String(100);
        plateKindCode               : String(100);
        plateKind                   : String(100);
        plateKindArabic             : String(100);
        plateTypeCode               : String(100);
        plateType                   : String(100);
        plateTypeArabic             : String(100);
        kindCode                    : String(100);
        kind                        : String(100);
        kindArabic                  : String(100);
        chasisNumber                : String(100);
        engineNumber                : String(100);
        primaryVin                  : String(100);
        secondaryVin                : String(100);
        countryCode                 : String(100);
        country                     : String(100);
        manfacturerCode             : String(100);
        manfacturer                 : String(100);
        manfacturerArabic           : String(100);
        modelCode                   : String(100);
        model                       : String(100);
        modelArabic                 : String(100);
        registrationYear            : String(100);
        typeCode                    : String(100);
        type                        : String(100);
        typeArabic                  : String(100);
        bodyColorCode               : String(100);
        bodyColor                   : String(100);
        bodyColorArabic             : String(100);
        gearCode                    : String(100);
        gearType                    : String(100);
        gearTypeArabic              : String(100);
        fuelCode                    : String(100);
        fuelType                    : String(100);
        fuelTypeArabic              : String(100);
        steeringCode                : String(100);
        steeringSide                : String(100);
        steeringSideArabic          : String(100);
        weightCode                  : String(100);
        weightDisc                  : String(100);
        weightDiscArabic            : String(100);
        registrationDate            : DateTime;
        registrationExpiryDate      : DateTime;
        manufacturingYear           : String(100);
        horsePower                  : String(100);
        numberOfAxel                : String(100);
        numberOfWheels              : String(100);
        numberOfCylinders           : String(100);
        numberOfDoors               : String(100);
        numberOfPassengers          : String(100);
        emptyWeight                 : String(100);
        fullWeight                  : String(100);
        mileage                     : String(100);
        cubicCapacity               : String(100);
        customer                    : String(100);
        insuranceName               : String(100);
        insuranceExpiry             : String(100);
        insuranceKind               : String(100);
        insuranceKindArabic         : String(100);
        insurancePolicyNumber       : String(100);
        mortgageDescription         : String(100);
        mortgageReference           : String(100);
        ownerTcfNumber              : String(100);
        ownerTcfEnglishName         : String(100);
        ownerTcfArabicName          : String(100);
        customCertificateNumber     : String(100);
        customCertificateDate       : DateTime;
        customCertificateCenterCode : String(100);
        customCertificateCenter     : String(100);
        registrationRemarks         : String(100);
        nationalityCode             : String(100);
        nationality                 : String(100);
        nationalityArabic           : String(100);
        customerMasters             : Association to one CustomerMasters;
}
