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
			RoleInfo = this.getRoleDetails();
			LoginInfo = this.getLoginInfo();
			formMode = this.getFormMode();
			this.setPageId('salesOrderPage');
			this.setFormTitle('');

			this.setBackwardRoute('RouteADMobility');

			this.setEntryFormDataSourceURLForNewMode('');

			this.setEntryFormDataSourceURLToAddData('');
			this.setEntryFormDataSourceURLToUpdateData('');

			let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/modone/model/multitests.json");
			
			this.getView().setModel(oModel, this.getEntryFormDataSourceModelName());
		},
		
		backToLanding: function () {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("RouteADMobility", {}, true);
		},
		getFullWidth: function () {
			return new sap.m.FlexItemData({ growFactor: 1 });
		},
		onExitPress: function () {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("RouteADMobility", {}, true);
		},

		_initialData: {
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

		_setInitialData: function () {
			const oView = this.getView();

			const oSelectionPanel = oView.byId("columnsPanel");



			oSelectionPanel.setP13nData(this._initialData.columns);


		},

		onPaymentDialogOpen: function (oEvt) {
			const oView = this.getView();
			const oPopup = oView.byId("p13nPopup");
			if (!this._bIsOpen) {
				this._setInitialData();
				this._bIsOpen = true;
			}

			oPopup.open(oEvt.getSource());
		},

		onClose: function (oEvt) {
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