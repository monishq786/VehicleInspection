sap.ui.define([
    "core/generic/genericentryform",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
], function (genericentryform, JSONModel, MessageToast) {
    "use strict";

    return genericentryform.extend("modonecontroller.CustomerCreation", {
        onInit: function () {
            genericentryform.prototype.onInit.apply(this, arguments);
            this.initialize();
        

        },

        initialize: function () {
            this.setPageId("useref"); // costing one pager entry form == copef
            this.setFormTitle("CustomerCreateForm");

            this.setBackwardRoute("RouteNameStageConstantConfiguration");

            this.setEntryFormDataSourceURLForNewMode("");



            this.setEntryFormDataSourceURLToAddData("/odata/v4//catalog/ZSD_T_Customer");
            this.setEntryFormDataSourceURLToUpdateData("/odata/v4//catalog/ZSD_T_Customer");
            this.setListViewFilterColumn();
            let oPath = jQuery.sap.getModulePath(
                "vehicleinspection",
                "/modone/model/CustomerCreateEntryForm.json", // Edit Response Model
            );
            const data = 
            {
              "Address": null,
              "City": null,
              "Country": null,
              "Emirates": null,
              "EmiratesId":null,
              "FirstName": null,
              "ID": null,
              "LastName":null,
              "MobileNumber": null,
              "Reference":null,
              "SearchTerm":null,
              "VEHICLE": [
                {
                  "BodyColor": null,
                  "BodyColorCode": null,
                  "BodyColourArabic": null,
                  "ChassisNumber": null,
                  "Country": null,
                  "CountryCode":null,
                  "CreatedBy": null,
                  "CreationDate": null,
                  "CreationTime":null,
                  "CubicCapCity":null,
                  "CustomCertificateCenter": null,
                  "CustomCertificateCenterCode": null,
                  "CustomCertificateDate": null,
                  "CustomCertificateNumber": null,
                  "Customer":null,
                  "CustomerReference": null,
                  "Customer_v_ID":null,
                  "EmptyWeight":null,
                  "EngineNo": null,
                  "FuelCode":null,
                  "FuelType": null,
                  "FuelTypeArabic": null,
                  "FullWeight":null,
                  "GearCode": null,
                  "GearType": null,
                  "GearTypeArabic":null,
                  "HorsePower":null,
                  "InsuranceExpiry":null,
                  "InsuranceKind":null,
                  "InsuranceKindArabic": null,
                  "InsuranceName":null,
                  "InsurancePoliceNumber":null,
                  "Kind":null,
                  "KindArabic": null,
                  "KindCode": null,
                  "Manufacturer":null,
                  "ManufacturerArabic":null,
                  "ManufacturingYear": null,
                  "Mileage": null,
                  "Model": null,
                  "ModelArabic": null,
                  "MortgageDescription":null,
                  "MortgageRef":null,
                  "Nationality":null,
                  "NationalityArabic":null,
                  "NationalityCode": null,
                  "NoOfPassenger": null,
                  "NumberOfAxel": null,
                  "NumberOfCylinders":null,
                  "NumberOfDoors":null,
                  "NumberOfWheels": null,
                  "OwnerTCFArabicName": null,
                  "OwnerTCFEnglishName": null,
                  "OwnerTCFNumber": null,
                  "PlateColour": null,
                  "PlateColourArabic": null,
                  "PlateColourCode":null,
                  "PlateKind": null,
                  "PlateKindArabic": null,
                  "PlateKindCode":null,
                  "PlateNumber": null,
                  "PlateSource":null,
                  "PlateSourceArabic":null,
                  "PlateSourceCode": null,
                  "PlateType": null,
                  "PlateTypeArabic": null,
                  "PlateTypeCode":null,
                  "PrimaryVIN": null,
                  "RegistrationDate": null,
                  "RegistrationExpiryDate":null,
                  "RegistrationRemark":null,
                  "RegistrationYear":null,
                  "SecondaryVIN":null,
                  "SteeringCode":null,
                  "SteeringSide":null,
                  "SteeringSideArabic": null,
                  "Type": null,
                  "TypeArabic": null,
                  "TypeCode":null,
                  "VehicleGUID":null,
                  "WeightCode":null,
                  "WeightDisc":null,
                  "WeightDiscArabic": null
                }
               
              ]
            }
          
        

            let oModel = new sap.ui.model.json.JSONModel(data);
            this.getView().setModel(oModel, this.getEntryFormDataSourceModelName());

            let oPathSaveReq = jQuery.sap.getModulePath(
                "stoneman",
                "/modone/model/CustomerCreateSaveRequest.json", //Save Request Model
            );
            let oModelSaveRequest = new sap.ui.model.json.JSONModel(data);
            this.getView().setModel(oModelSaveRequest, "CustomerCreateSaveRequest");

            //this.loadStaticDropdownModel();



        },


        onBeforeShow: async function (oEvent) {
            this.identifyFormMode(oEvent);
            this.initialize();
            this.setEntryFormDataSourceURLForEditMode("");
            await this.showEntryForm();

        },




        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        },
        onSaveCustomerCreate: function () {

            
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },


        onSaveCustomerCreate: async function () {
            let srcObject = this.getView().getModel(this.getEntryFormDataSourceModelName()).getData();
            let trgObject = this.getView().getModel("CustomerCreateSaveRequest").getData();

            this.transferObjectValues(srcObject, trgObject);
            console.log('requestObject', trgObject)
            console.log('requestObject', srcObject)
            await this.onPressOfEntryFormSaveButton(trgObject);
            let response = this.getApiResponseObject();
            if (response) {
                MessageToast.show("Customer Created successfully " + response.StageConstant);
                
                 setTimeout(function () {
                     this.router.navTo(this.getBackwardRoute());
             }.bind(this), 500);
            }

        },

        onCancel:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        }
    })
}) 