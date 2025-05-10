sap.ui.define([
  "core/generic/genericlistview"
],
  function (genericlistview) {
    "use strict";

    return genericlistview.extend("modonecontroller.EmpListView", {

      onInit: function () {
        genericlistview.prototype.onInit.apply(this, arguments);

      },

      onBeforeShow: function (oEvent) {
        // this.validateAccess();
        this.initialize();
      },

      initialize: async function () {
        this.setPageId("emailtemplatelv");
        this.setFormTitle("Emp List View");
        this.setFormSubTitle('');

        this.setListViewDataSourceProperties("GET", "/odata/v4/catalog/Employee", '', "value");

        this.setListViewDisplayColumns(["Emp GUID", "First Name", "Last Name", "Edit"]);
        this.setListViewDataColumns(["empGuid", "firstName", "LastName", "Edit"]);

        this.setListViewFilterColumn('TempCodeLV', ' firstName', 'Cfl', 'eq', 'String', 'firstName', 'CflForFirstName');

        this.setListViewEditProperty("empGuid");
        this.setForwardRoute("RouteEmpentryform");
        this.setBackwardRoute("RouteLanding");
        this.showListView(this.getPageId());

        await this.pageValidatations();

      },
      CflForFirstName: async function () {

        await this.createNewModelUsingAPI('GET', '/odata/v4/catalog/Employee', '', this.getCflListViewDataSourceModelName());
        this.setCflDisplayColumns(['First Name', 'Last Name']);
        this.setCflDataColumns(['firstName', 'LastName']);
        this.setCflValueAndDisplay('', '', 'TempCodeLV', 'firstName');
        this.showCfl('TempCodeLV', this.getCflListViewDataSourceModelName(), 'value', this.onCloseCflForFirstName.bind(this));


      },
      onCloseCflForFirstName: function () {
        let x = this.getCflObject();
      },

      pageValidatations: function () {
        const configuralModel = this.getOwnerComponent().getModel('configuralModel');
        if (configuralModel) {
          const roledata = configuralModel?.getData();
          localStorage.setItem('roledata', JSON.stringify(roledata));
          console.log('roledata    ', roledata);
          const oTable = this.getListViewTable();
          const sCreateText = this.getView().getModel('i18n').getResourceBundle().getText('CREATE');
          for (const oControl of oTable.getHeaderToolbar().getContent()) {
            console.log("Controll   " + JSON.stringify(oControl.isA('sap.m.Button') && oControl.getText()));
            if (oControl.isA('sap.m.Button') && oControl.getText() === sCreateText) {
              localStorage.setItem('Controll', JSON.stringify(oControl.isA('sap.m.Button') && oControl.getText()));
              oControl.setEnabled(roledata?.Add);
              break;
            }
          }
          this.disableAllEditButtons(roledata?.View);
        } else {
          const roledata = JSON.parse(localStorage.getItem('roledata'));
          const controll = JSON.parse(localStorage.getItem('Controll'));
          console.log("Controll   " + controll);
          console.log("Afshans   " + JSON.stringify(roledata));
          const oTable = this.getListViewTable();
          const sCreateText = this.getView().getModel('i18n').getResourceBundle().getText('CREATE');
          for (const oControl of oTable.getHeaderToolbar().getContent()) {
            console.log("Controll   " + JSON.stringify(oControl.isA('sap.m.Button') && oControl.getText()));
            if (oControl.isA('sap.m.Button') && oControl.getText() === sCreateText) {
              oControl.setEnabled(roledata?.Add);
              break;
            }
          }
          this.disableAllEditButtons(roledata?.View);
        }
      },

      disableAllEditButtons: function (isView) {
        const oTable = this.getListViewTable();
        var aItems = oTable.getItems();
        // Iterate over each item (row)
        aItems.forEach(function (oItem) {
          // Get the cells of the current row (ColumnListItem)
          var aCells = oItem.getCells();
          aCells.forEach(function (oCell) {
            if (oCell instanceof sap.m.HBox) {
              var aItems = oCell.getItems(); // Get the items inside the HBox
              aItems.forEach(function (oItem) {
                if (oItem instanceof sap.m.Button) {
                  if (oItem.getIcon() === "sap-icon://navigation-right-arrow") {
                    oItem.setEnabled(isView);
                  }
                }
              });
            }
          });
        });
      },




    })
  }
);