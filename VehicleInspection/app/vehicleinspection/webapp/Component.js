sap.ui.define([
    "sap/ui/core/UIComponent",
    "adnoc/vi/vehicleinspection/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("adnoc.vi.vehicleinspection.Component", {
        metadata: {
            manifest: "json"
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            
        }
    });
});