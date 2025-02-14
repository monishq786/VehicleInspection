namespace ADD_VI;
using {managed} from '@sap/cds/common';

entity Zsd_T_Test_Results : managed {

  key  guid : UUID;
    VBELN : String(10);
    POSNR : Int16;
    zTest : Int16;
    zF1 : Boolean;
    zF2 : Boolean;
    zF3 : Boolean;
    zF4 : Boolean;
    zF5 : Boolean;
    zF6 : Boolean;
    zF7 : Boolean;
    zF8 : Boolean;
    zF9 : Boolean;
    zF10 : Boolean;
    zF11 : Boolean;
    zF12 : Boolean;
    zF13 : Boolean;
    zF14 : Boolean;
    zF15 : Boolean;
    zF16 : Boolean;
    zF17 : Boolean;
    zF18 : Boolean;
    zF19 : Boolean;
    zF20 : Boolean;
}
entity Zsd_T_Test_Masters :managed
{
   key guid : UUID;
    zFiledMapping: String(4);
    zTest : Int16;
    zTestText : String(100);
    zTestType : Int16; // numeric with 3 length
    zTestSubType : Int16;
    zTestTypeText :String(100);
    zTestTypeTextAE : String(100);
    zSubTypeText : String(100);
    zSubTypeTextAE : String(100);
    zExaminationMethod : String(20);
    zAllow1 : String(100);
    zAllow2 : String(100);
    zAllow3 : String(100);
    zAllow4 : String(100);
    zValue1 : String(100);
    zValue2  : String(100);
    zValue3 : String(100);
    zValue4 : String(100);

}

