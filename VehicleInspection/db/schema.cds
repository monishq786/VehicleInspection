namespace Adnoc.VehicleInsp;


entity ZSD_T_Customer{
  key ID : UUID;
  FirstName : String(40);
  LastName : String(40);
  SearchTerm :String(20);
  EmiratesId : Integer;
  MobileNumber : String(10);
  EmailId:String(50);
  Address : String(60);
  Emirates : String(20);
  City : String(20);
  Country : String(20);
  Reference : String(20);
  VEHICLE       : Composition of one ZSD_T_VEHICLE
                                  on VEHICLE.Customer_v = $self;

}




entity ZSD_T_VEHICLE {
  key VehicleGUID : UUID;
  PlateNumber: String(10);
  PlateSourceCode:Int32;
  PlateSource : String(10);
  PlateSourceArabic :String(10);
  PlateColourCode : String(10);
  PlateColour : String(10);
  PlateColourArabic: String(10);
  PlateKindCode: Integer;
  PlateKind: String(10);
  PlateKindArabic : String(10);
  PlateTypeCode: Int32;
  PlateType :String(10);
  PlateTypeArabic : String(10);
  KindCode : Int32;
  Kind : String(15);
  KindArabic: String(15);
  ChassisNumber: String(30);
  EngineNo: String(30);
  PrimaryVIN: String(30);
  SecondaryVIN: String(30);
  CountryCode:String(30);
  Country: String(10);
  Manufacturer:String(10);
  ManufacturerArabic:String(10);
  Model: String(10);
  ModelArabic:String(11);
  RegistrationYear:Int16;
  TypeCode:Int32;
  Type:String(20);
  TypeArabic:String(20);
  BodyColorCode:Int32;
  BodyColor:String(30);
  BodyColourArabic:String(30);
  GearCode:Int32;
  GearType:String(10);
  GearTypeArabic: String(10);
  FuelCode:Int32;
  FuelType:String(10);
  FuelTypeArabic:String(10);
  SteeringCode:Int32;
  SteeringSide: String(10);
  SteeringSideArabic:String(10);
  WeightCode:Int32;
  WeightDisc:String(10);
  WeightDiscArabic:String(10);
  RegistrationDate:Date;
  RegistrationExpiryDate:Date;
  ManufacturingYear:String(10);
  HorsePower:String(10);
  NumberOfAxel: String(10);
  NumberOfCylinders:String(10);
  NumberOfWheels: String(10);
  NumberOfDoors: String(10);
  NoOfPassenger: String(10);
  EmptyWeight: String(10);
  FullWeight : String(10);
  Mileage: String(10);
  CubicCapCity: String(10);
  Customer : String(10);
  CreationDate: Date;
  CreationTime : Date;
  CreatedBy : String(20);
  InsuranceName : String(20);
  InsuranceExpiry : Date;
  InsuranceKind : String(10);
  InsuranceKindArabic : String(10);
  InsurancePoliceNumber : String(20);
  MortgageDescription : String(20);
  MortgageRef : String(20);
  OwnerTCFNumber : String (20);
  OwnerTCFArabicName : String(60);
  OwnerTCFEnglishName : String(60);
  CustomCertificateNumber : String(20);
  CustomCertificateDate : Date;
  CustomCertificateCenterCode : Int32;
  CustomCertificateCenter : String(20);
  RegistrationRemark : String(60);
  NationalityCode : Int32;
  Nationality : String(20);
  NationalityArabic : String (20);
  CustomerReference : String(20);
  Customer_v: Association to one  ZSD_T_Customer;
  

}
