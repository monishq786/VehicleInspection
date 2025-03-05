using {ADD_VI as db} from '../db/schema';

service CatalogService {
     entity Zsd_T_Test_Masters as projection on db.Zsd_T_Test_Masters;
     entity Zsd_T_Test_Results as projection on db.Zsd_T_Test_Results;
      entity Employee as projection on db.Employee;
}
