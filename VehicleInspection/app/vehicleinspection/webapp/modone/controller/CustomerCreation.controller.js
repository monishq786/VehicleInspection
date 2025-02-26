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
            this.setFormMode(3);



            this.setEntryFormDataSourceURLToAddData("/odata/v4/catalog/CustomerMasters");
            this.setEntryFormDataSourceURLToUpdateData("/odata/v4/catalog/CustomerMasters");
            this.setListViewFilterColumn();
            let oMenuModel = new sap.ui.model.json.JSONModel();
            oMenuModel.loadData('modone/model/CustomerCreateEntryForm.json', null, false);
            // let oPath = jQuery.sap.getModulePath(
            //     "vehicleinspection",
            //     "/modone/model/CustomerCreateEntryForm.json", // Edit Response Model
            // );

            // getMenuModel: function () {
            //     let oMenuModel = new sap.ui.model.json.JSONModel();
            //     oMenuModel.loadData('model/menuData.json', null, false);
            //     this.getView().setModel(oMenuModel, 'menuModel');
            //   },


            // let oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oMenuModel, this.getEntryFormDataSourceModelName());
            console.log("oMenuModel", oMenuModel)
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
        validateCustomerData: function (customerData) {
            let isValid = true;
            let errorMessages = [];
        
            function isInvalid(value) {
                return value === null || value === undefined || value.trim() === "";
            }
        
            // Validate firstName
            if (isInvalid(customerData.firstName)) {
                isValid = false;
                errorMessages.push("First Name is required.");
            }
        
            // Validate lastName
            if (isInvalid(customerData.emailAddress)) {
                isValid = false;
                errorMessages.push("email is required.");
            }
        
            // Validate mobileNo (must be a 10-digit number)
            var mobileRegex = /^[0-9]{10}$/;
            if (isInvalid(customerData.mobileNo) || !mobileRegex.test(customerData.mobileNo)) {
                isValid = false;
                errorMessages.push("Valid 10-digit Mobile No is required.");
            }

            if (isInvalid(customerData.vehicleMasters[0].chasisNumber)) {
                isValid = false;
                errorMessages.push("Valid Chassis Number is required.");
            }
        
            return { isValid, errorMessages };
        },        




            onSaveCustomerCreate: async function () {

               // let y = this.getView().getModel(this.getEntryFormDataSourceModelName())
                let srcObject = this.getView().getModel(this.getEntryFormDataSourceModelName()).getData();
                let trgObject = this.getView().getModel("CustomerCreateSaveRequest").getData();


                const validateCustomerData = this.validateCustomerData(srcObject)

                if(!validateCustomerData.isValid){
                    
                    MessageToast.show(validateCustomerData.errorMessages);

                }
                else{

                
                this.transferObjectValues(srcObject, trgObject);
                console.log('requestObject', trgObject)
                console.log('requestObject', srcObject)
                await this.onPressOfEntryFormSaveButton(srcObject);
                let response = this.getApiResponseObject();
                if (response) {
                    MessageToast.show("Customer Created successfully " + response.message);

                     setTimeout(function () {
                         this.router.navTo(this.getBackwardRoute());
                 }.bind(this), 500);
                }}

            },

            onReset: function () {
                var oView = this.getView();
                if (!oView) {
                    console.error("View is not available.");
                    return;
                }
    
                // Get the model
                let oModel = oView.getModel(this.getEntryFormDataSourceModelName());
    
                if (!oModel) {
                    console.error("Model not found.");
                    return;
                }
    
                // 🔹 Step 1: Get Original Data from Model
                let originalData = JSON.parse(JSON.stringify(oModel.getData())); // Deep copy original data
    
                // 🔹 Step 2: Set Data to Null (Clear the Model)
                oModel.setData({});  // Clears the model data
                oModel.refresh(true); // Refresh UI
    
                // 🔹 Step 3: Restore Original Data (If Needed)
                // setTimeout(() => {
                //     oModel.setData(originalData);
                //     oModel.refresh(true);
                // }, 500); // Delay to simulate data fetching
    
                sap.m.MessageToast.show("Form reset successfully.");
    
    
    
            },
    


        // onSaveCustomerCreate: async function () {
        //     var oView = this.getView(); // Fix: Defined oView reference
        //     var isValid = true;

        //     // Get input fields
        //     var oName = oView.byId("firstName");
        //     var oEmail = oView.byId("emailAddress");
        //     var oChassis = oView.byId("chasisNumber");
        //     var oEngine = oView.byId("engineNumber");
        //     var oMobile = oView.byId("mobileNo");

        //     // Get field values
        //     var sName = oName?.getValue().trim() || "";
        //     var sEmail = oEmail?.getValue().trim() || "";
        //     var sChassis = oChassis?.getValue().trim() || "";
        //     var sEngine = oEngine?.getValue().trim() || "";
        //     var sMobile = oMobile?.getValue().trim() || "";

        //     // Validation Rules
        //     if (!sName) {
        //         oName.setValueState("Error");
        //         oName.setValueStateText("Name is required");
        //         isValid = false;
        //     } else {
        //         oName.setValueState("None");
        //     }

        //     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //     if (!emailRegex.test(sEmail)) {
        //         oEmail.setValueState("Error");
        //         oEmail.setValueStateText("Invalid Email Address");
        //         isValid = false;
        //     } else {
        //         oEmail.setValueState("None");
        //     }

        //     var chassisRegex = /^[A-Z0-9]+$/i;
        //     if (!sChassis || !chassisRegex.test(sChassis)) {
        //         oChassis.setValueState("Error");
        //         oChassis.setValueStateText("Invalid Chassis No");
        //         isValid = false;
        //     } else {
        //         oChassis.setValueState("None");
        //     }

        //     var engineRegex = /^[A-Z0-9]+$/i;
        //     if (!sEngine || !engineRegex.test(sEngine)) {
        //         oEngine.setValueState("Error");
        //         oEngine.setValueStateText("Invalid Engine No");
        //         isValid = false;
        //     } else {
        //         oEngine.setValueState("None");
        //     }

        //     var mobileRegex = /^[0-9]{10}$/;
        //     if (!mobileRegex.test(sMobile)) {
        //         oMobile.setValueState("Error");
        //         oMobile.setValueStateText("Enter a valid 10-digit Mobile No");
        //         isValid = false;
        //     } else {
        //         oMobile.setValueState("None");
        //     }

        //     // Stop execution if validation fails
        //     if (!isValid) {
        //         sap.m.MessageToast.show("Please correct errors before saving.");
        //         return;
        //     }

        //     // Fetch model data after validation
        //     let srcObject = oView.getModel(this.getEntryFormDataSourceModelName()).getData();
        //     let trgObject = oView.getModel("CustomerCreateSaveRequest").getData();

        //     this.transferObjectValues(srcObject, trgObject);
        //     console.log("Request Object:", trgObject);
        //     console.log("Source Object:", srcObject);

        //     // API call (await response before proceeding)
        //     await this.onPressOfEntryFormSaveButton(srcObject);
        //     let response = this.getApiResponseObject();

        //     if (response) {
        //         MessageToast.show("Customer Created successfully: " + response.message);

        //         // Navigate after a delay (Fix: Preserve 'this' context in setTimeout)
        //         setTimeout(() => {
        //             this.router.navTo(this.getBackwardRoute());
        //         }, 500);
        //     }
        // },



        onCancel: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },

        onChassisChange: function (oEvent) {
            var oModel = this.getView().getModel(this.getEntryFormDataSourceModelName()).getData()
            if (!oModel.vehicleMasters[0].chasisNumber) {
                oModel.vehicleMasters[0].chasisNumber = "                 "; // Ensure MobileNumber exists
            }

            var sCurrentOTP = oModel.vehicleMasters[0].chasisNumber;




            var oSource = oEvent.getSource();
            var sValue = oEvent.getParameter("value");

            // Find the input field index (otp1 -> 0, otp2 -> 1, etc.)
            var sId = oSource.getId();
            var iIndex = parseInt(sId.charAt(sId.length - 2) + sId.charAt(sId.length - 1), 10) - 1;
            // var iIndex = parseInt(sId.charAt(sId.length - 2), 10) - 1;
            console.log("Index- " + iIndex)

            // Update the respective index in the OTP string
            var aOTPArray = sCurrentOTP.split("");
            aOTPArray[iIndex] = sValue; // Replace only that index
            var sUpdatedOTP = aOTPArray.join("");

            // Update model with new OTP value
            // oModel.setProperty("/mobileNo", sUpdatedOTP);
            oModel.vehicleMasters[0].chasisNumber = sUpdatedOTP
            // Move focus to next input field
            var oNextInput = this.getView().byId("otp" + (iIndex + 2));
            if (oNextInput) {
                oNextInput.focus();
            }
        },

        onSubmitOTP: function () {
            var data = this.getView().getModel(this.getEntryFormDataSourceModelName()).getData()
            console.log("================================>", data);

            var sOTP = this.getView().getModel(this.getEntryFormDataSourceModelName()).getData();
            sap.m.MessageToast.show("Entered OTP: " + sOTP.chasisNumber);
        },



        onEngineChange: function (oEvent) {
            var oModel = this.getView().getModel(this.getEntryFormDataSourceModelName()).getData()
            if (!oModel.vehicleMasters[0].engineNumber) {
                oModel.vehicleMasters[0].engineNumber = ""; // Ensure MobileNumber exists
            }

            var sCurrentOTP = oModel.vehicleMasters[0].engineNumber;




            var oSource = oEvent.getSource();
            var sValue = oEvent.getParameter("value");

            // Find the input field index (otp1 -> 0, otp2 -> 1, etc.)
            var sId = oSource.getId();
            var iIndex = parseInt(sId.charAt(sId.length - 1), 18) - 1;

            // Update the respective index in the OTP string
            var aOTPArray = sCurrentOTP.split("");
            aOTPArray[iIndex] = sValue; // Replace only that index
            var sUpdatedOTP = aOTPArray.join("");

            // Update model with new OTP value
            // oModel.setProperty("/mobileNo", sUpdatedOTP);
            oModel.vehicleMasters[0].engineNumber = sUpdatedOTP
            // Move focus to next input field
            var oNextInput = this.getView().byId("otp" + (iIndex + 2));
            if (oNextInput) {
                oNextInput.focus();
            }
        },

    })
}) 