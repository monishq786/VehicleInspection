sap.ui.define([
    "core/generic/genericentryform",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
], function (genericentryform, JSONModel, MessageToast) {
    "use strict";

    return genericentryform.extend("modonecontroller.CustomerCreation", {
        onInit: function () {
            genericentryform.prototype.onInit.apply(this, arguments);
           
        

        },

        initialize: function () {
            this.setPageId("useref"); // costing one pager entry form == copef
            this.setFormTitle("CustomerCreateForm");

            this.setBackwardRoute("RouteNameStageConstantConfiguration");

            this.setEntryFormDataSourceURLForNewMode("");



            this.setEntryFormDataSourceURLToAddData("/odata/v4/catalog/ZSD_T_Customer");
            this.setEntryFormDataSourceURLToUpdateData("/odata/v4//catalog/ZSD_T_Customer");
            this.setListViewFilterColumn();
            let oPath = jQuery.sap.getModulePath(
                "vehicleinspection",
                "/modone/model/CustomerCreateEntryForm.json", // Edit Response Model
            );
           
          
        

            let oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel, this.getEntryFormDataSourceModelName());

            let oPathSaveReq = jQuery.sap.getModulePath(
                "vehicleinspection",
                "/modone/model/CustomerCreateSaveRequest.json", //Save Request Model
            );
            let oModelSaveRequest = new sap.ui.model.json.JSONModel(oPathSaveReq);
            this.getView().setModel(oModelSaveRequest, "CustomerCreateSaveRequest");

            //this.loadStaticDropdownModel();



        },


        onBeforeShow: async function (oEvent) {
            //this.identifyFormMode(oEvent);
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
           // let y = this.getView().getModel(this.getEntryFormDataSourceModelName())
            let srcObject = this.getView().getModel(this.getEntryFormDataSourceModelName()).getData();
            let trgObject = this.getView().getModel("CustomerCreateSaveRequest").getData();

            this.transferObjectValues(srcObject, trgObject);
            console.log('requestObject', trgObject)
            console.log('requestObject', srcObject)
            await this.onPressOfEntryFormSaveButton(srcObject);
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