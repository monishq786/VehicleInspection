sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
    "user strict"

    return Controller.extend("modonecontroller.CustomerCreation", {
        onInit() {

        },
        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        },
        onSaveCustomerCreate: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },
        onCancel:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        }
    })
}) 