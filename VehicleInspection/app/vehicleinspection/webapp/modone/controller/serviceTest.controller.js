sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
    "user strict"
    return Controller.extend("modonecontroller.serviceTest", {
        onInit() {

        },
        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        }

    })

})