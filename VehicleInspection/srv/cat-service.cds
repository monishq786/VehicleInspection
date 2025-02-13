using Adnoc.VehicleInsp as Adnoc from '../db/schema';

service CatalogService {
    entity ZSD_T_Customer as projection on Adnoc.ZSD_T_Customer;
    entity  ZSD_T_VEHICLE as projection ON Adnoc.ZSD_T_VEHICLE;
}
