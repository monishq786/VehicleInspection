sap.ui.define([
	'core/generic/genericentryform',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
		"sap/ui/core/syncStyleClass"
], (genericentryform, MessageToast,Fragment,syncStyleClass) => {
	"user strict"

	return genericentryform.extend("modonecontroller.SalesOrder", {
		
		constructor: function () {

		},

		onInit: async function () {

			genericentryform.prototype.onInit.apply(this, arguments);
			let oData = {
				ProductCollection: [
					{ EnglishName: "Chassis durability and wheel alignment and ball joint", ArabicDesc: "متانة الهيكل ومحاذاة العجلات والمفصل الكروي", selected: false },
					{ EnglishName: "Radiator and air filter compatible with the region's weather", ArabicDesc: "المبرد وفلتر الهواء المتوافق مع طقس المنطقة", selected: false },
					{ EnglishName: "All lights, signals, and horn in working order", ArabicDesc: "جميع الأضواء والإشارات والبوق في حالة عمل", selected: false },
					{ EnglishName: "Brakes and brake fluid in proper condition", ArabicDesc: "الفرامل وسائل الفرامل بحالة مناسبة", selected: false },
					{ EnglishName: "Tire condition and pressure check", ArabicDesc: "حالة الإطارات وفحص الضغط", selected: false },
					{ EnglishName: "Seat belts and airbags functionality", ArabicDesc: "أحزمة الأمان وعمل الوسائد الهوائية", selected: false },
					{ EnglishName: "Windshield and wipers in proper working order", ArabicDesc: "الزجاج الأمامي والمساحات بحالة تشغيل جيدة", selected: false },
					{ EnglishName: "Engine oil and coolant levels are adequate", ArabicDesc: "مستويات زيت المحرك وسائل التبريد مناسبة", selected: false },
					{ EnglishName: "Fuel system and exhaust emissions check", ArabicDesc: "فحص نظام الوقود وانبعاثات العادم", selected: false },
					{ EnglishName: "Steering system and suspension stability", ArabicDesc: "نظام التوجيه واستقرار نظام التعليق", selected: false }
				]
				
			};
		
			// Create JSON model and set data
			let oModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(oModel);

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

		},
		// onBtnPressESMA: function () {
		// 	var that = this;
		
		// 	if (!this._pDialog) {
		// 		this._pDialog = this.loadFragment({
		// 			name: "adnoc.vi.vehicleinspection.modone.fragment.salesorder.EsmaTest"
		// 		}).then(function (oDialog) {
		// 			that._oDialog = oDialog;
		// 			that.getView().addDependent(oDialog);
		// 			return oDialog;
		// 		});
		// 	}
		
		// 	this._pDialog.then(function (oDialog) {
		// 		oDialog.open(); // Now the fragment contains a Dialog, so it can be opened
		// 	});
		// },
		onBtnPressESMA: async function () {
			await this.createNewModelUsingAPI(
			  'GET',
			  '/odata/v4/catalog/Zsd_T_Test_Masters',
			  null,
			  this.getCflListViewDataSourceModelName()
			);
			this.setCflTitle('ESMA Check List');
			this.setCflDisplayColumns(['English Description', 'Arabic Description']);
			this.setCflDataColumns(['zTestTypeText', 'zTestTypeTextAE']);
			this.setCflValueAndDisplay('/zTestTypeText', 'zTestTypeTextAE', '', '');
			this.setCflSearchProperty('BusinessPartnerName');
			this.setCflMultiSelect(true);

			
			this.showCfl('user', this.getCflListViewDataSourceModelName(), 'value', this.onClosecflForUser.bind(this));
		  },
	
		  onClosecflForUser: async function () {
			const oUserRes = this.getCflObject();
			const oSelectList = this.getCflObjectList();
					console.log(oSelectList);

					var body = {
						"VBELN": "1234567890",
						"POSNR": 10,
						"zTest": 5,
						"zF1": oSelectList[0].zTestTypeText,
						"zF2": false,
						"zF3": true,
						"zF4": false,
						"zF5": true,
						"zF6": false,
						"zF7": true,
						"zF8": false,
						"zF9": true,
						"zF10": false,
						"zF11": true,
						"zF12": false,
						"zF13": true,
						"zF14": false,
						"zF15": true,
						"zF16": false,
						"zF17": true,
						"zF18": false,
						"zF19": true,
						"zF20": false
					  }
					  

			await this.createNewModelUsingAPI(
			  'POST',
			  `/odata/v4/catalog/Zsd_T_Test_Results`,
			  body,
			  'TestResultModel'
			);
			
			// await this.createNewModelUsingAPI('POST', '/odata/v4/stoneman-crf/EnableAndDisable', body, 'myModel');
			// let myModel = this.getView().getModel('myModel');
			// let datamodel = myModel.getData();


			const oUserSetData = this.getView().getModel(this.getEntryFormDataSourceModelName());
			const oUserSetDept = this.getView().getModel('TestResultModel').getData();
	
			if (oUserSetDept.value.length > 0) {
			  oUserSetData.setProperty('/DepartmentName', oUserSetDept.value[0].CostCenterName);
			  oUserSetData.setProperty('/DepartmentCode', oUserSetDept.value[0].CostCenter);
			}
			let test = "test";
			oUserSetData.setProperty('/VBELN', test);
			// oUserSetData.setProperty('/UserName', oUserRes.BusinessPartnerFullName);
			// oUserSetData.setProperty('/UserGuid', oUserRes.BusinessPartnerUUID);
			// oUserSetData.setProperty('/FirstName', oUserRes.FirstName);
			// oUserSetData.setProperty('/LastName', oUserRes.LastName);
			// oUserSetData.setProperty('/SubDepartmentCode', oUserRes.CostCenter);
			// oUserSetData.setProperty('/SubDepartmentName', oUserRes.CostCenterDescription);
		  }

	})
}) 