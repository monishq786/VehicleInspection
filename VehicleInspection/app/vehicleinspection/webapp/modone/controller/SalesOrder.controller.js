sap.ui.define([
	'core/generic/genericentryform',
	'sap/m/MessageToast'
], (genericentryform, MessageToast) => {
	"user strict"

	return genericentryform.extend("modonecontroller.SalesOrder", {

		constructor: function () {

		},

		onInit: async function () {

			genericentryform.prototype.onInit.apply(this, arguments);

		},

		onBeforeShow: async function (oEvent) {

			//this.identifyFormMode(oEvent);
			this.initialize();
			this.setEntryFormDataSourceURLForEditMode('');
			await this.showEntryForm();

		},

		initialize: async function () {

			this.setPageId('salesOrderPage');
			this.setFormTitle('');
			this.setBackwardRoute('RouteADMobility');
			this.setEntryFormDataSourceURLForNewMode('');
			this.setEntryFormDataSourceURLToAddData('');
			this.setEntryFormDataSourceURLToUpdateData('');
			let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/modone/model/SalesOrderModel.json");
			this.getView().setModel(oModel, this.getEntryFormDataSourceModelName());

		},

		getFullWidth: function () {

			return new sap.m.FlexItemData({ growFactor: 1 });

		},

		onBtnPressExit: function () {

			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("RouteADMobility", {}, true);

		},

		getInitialData: {
			columns: [{
				visible: true,
				name: "key1",
				label: "Cash"
			},
			{
				visible: false,
				name: "key2",
				label: "Card"
			},
			{
				visible: false,
				name: "key3",
				label: "Wallet"
			}
			]
		},

		setInitialData: function () {

			const oView = this.getView();
			const oSelectionPanel = oView.byId("columnsPanel");
			oSelectionPanel.setP13nData(this.getInitialData.columns);

		},

		onBtnPressPaymentDialog: function (oEvt) {

			const oView = this.getView();
			const oPopup = oView.byId("p13nPopup");
			if (!this._bIsOpen) {
				this.setInitialData();
				this._bIsOpen = true;
			}
			oPopup.open(oEvt.getSource());

		},

		onBtnPressClose: function (oEvt) {

			const sReason = oEvt.getParameter("reason");
			MessageToast.show("Payment Successfully: " + sReason);
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("RouteSalesOrderPayment", {}, true);

		},

		parseP13nState: function (oEvt) {

			if (oEvt) {
				MessageToast.show("P13n panel change reason:" + oEvt.getParameter("reason"));
			}
			const oView = this.getView();
			const oEditor = oView.byId("p13nEditor");
			const oP13nState = {
				columns: oView.byId("columnsPanel").getP13nData(),
			};
			oEditor.setValue(JSON.stringify(oP13nState, null, '  '));

		}

	})
}) 