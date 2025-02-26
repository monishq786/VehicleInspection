using Adnoc.VehicleInsp as Adnoc from '../db/schema';

service CatalogService {
    entity CustomerMasters as projection on Adnoc.CustomerMasters;
    entity  VehicleMasters as projection ON Adnoc.VehicleMasters;
}
