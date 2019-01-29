'use strict';

goog.provide('Blockly.Arduino.display');

goog.require('Blockly.Arduino');



Blockly.Arduino.group_lcd_init = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_LiquidCrystal_I2C'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_'+varName] = 'LiquidCrystal_I2C '+varName+'('+device+','+TYPE+');';
  Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
  Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';  
  return '';
};

Blockly.Arduino.group_lcd_init2 = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_SoftI2CMaster'] = '#include <SoftI2CMaster.h>';
  Blockly.Arduino.definitions_['include_LiquidCrystal_SoftI2C'] = '#include <LiquidCrystal_SoftI2C.h>';
  Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] = 'LiquidCrystal_SoftI2C ' + varName + '(' + device + ',' + TYPE + ',' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
  Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
  Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';    
  return '';
};

Blockly.Arduino.group_lcd_init3 = function () {
    var varName = this.getFieldValue('VAR');
    var TYPE = this.getFieldValue('TYPE');
    var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin3 = Blockly.Arduino.valueToCode(this, 'PIN3', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin4 = Blockly.Arduino.valueToCode(this, 'PIN4', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin5 = Blockly.Arduino.valueToCode(this, 'PIN5', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin6 = Blockly.Arduino.valueToCode(this, 'PIN6', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.definitions_['include_LiquidCrystal'] = '#include <LiquidCrystal.h>';
    Blockly.Arduino.definitions_['var_LiquidCrystal' + varName] = 'LiquidCrystal ' + varName + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_pin3 + ',' + dropdown_pin4 + ',' + dropdown_pin5 + ',' + dropdown_pin6 + ');';
    Blockly.Arduino.setups_['setup_lcd_begin_' + varName] = varName + '.begin('+TYPE+');';
   
    return '';
};

Blockly.Arduino.group_lcd_print = function() {
  var varName = this.getFieldValue('VAR');
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';

  var code = varName+'.setCursor(0, 0);\n'
  code+=varName+'.print('+str1+');\n';
  code+=varName+'.setCursor(0, 1);\n';
  code+=varName+'.print('+str2+');\n';  
  //code+=varName+'.setCursor(0, 2);\n';
  //code+=varName+'.print('+str3+');\n';
  //code+=varName+'.setCursor(0, 3);\n';
  //code+=varName+'.print('+str4+');\n';
  return code;
};

Blockly.Arduino.group_lcd_print2 = function() {
  var varName = this.getFieldValue('VAR');
  var str = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';
  var row = Blockly.Arduino.valueToCode(this, 'row', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var column = Blockly.Arduino.valueToCode(this, 'column', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var code = varName+'.setCursor('+column+'-1, '+row+'-1);\n'
  code+=varName+'.print('+str+');\n';
  return code;
};

Blockly.Arduino.group_lcd_power = function() {
  var varName = this.getFieldValue('VAR');
  var dropdown_stat = this.getFieldValue('STAT');
  var code = varName+'.'+dropdown_stat+'();\n'
  return code;
};

Blockly.Arduino.lp2i_u8g_draw_4strings = function () {
    var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    Blockly.Arduino.definitions_["include_U8glib"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + '  do {\n'
      + '      u8g.setFont(u8g_font_unifont);\n'
      + '  } while( u8g.nextPage());\n'
      + '  delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    + 'do {\n'
    + '    u8g.setPrintPos(0,14);\n'
    + '    u8g.print(' + value_text_line1 + ');\n'
    + '    u8g.setPrintPos(0,30);\n'
    + '    u8g.print(' + value_text_line2 + ');\n'
    + '    u8g.setPrintPos(0,46);\n'
    + '    u8g.print(' + value_text_line3 + ');\n'
    + '    u8g.setPrintPos(0,62);\n'
    + '    u8g.print(' + value_text_line4 + ');\n'
    + '}\n'
    +'while( u8g.nextPage() );\n';
    return code;
};

Blockly.Arduino.lp2i_u8g_print = function () {
    var value_n = Blockly.Arduino.valueToCode(this, 'N', Blockly.Arduino.ORDER_ATOMIC);
    var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["include_U8glib"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
      'u8g.firstPage();\n'
      + '  do {\n'
      + '      u8g.setFont(u8g_font_unifont);\n'
      + '  } while( u8g.nextPage());\n'
      + '  delay(1000);\n';
    var code =
      'u8g.firstPage();\n'
    code += '   do {\n'
    code += '       u8g.setPrintPos(' + x + ', ' + y + ');\n'
    code += '       u8g.print(' + value_n + ');\n'
    code += '   }\n while( u8g.nextPage() );\n';
    return code;
};
Blockly.Arduino.lp2i_u8g_4draw_print = function () {
    var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_n1 = Blockly.Arduino.valueToCode(this, 'N1', Blockly.Arduino.ORDER_ATOMIC);
    var value_n2 = Blockly.Arduino.valueToCode(this, 'N2', Blockly.Arduino.ORDER_ATOMIC);
    var value_n3 = Blockly.Arduino.valueToCode(this, 'N3', Blockly.Arduino.ORDER_ATOMIC);
    var value_n4 = Blockly.Arduino.valueToCode(this, 'N4', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["include_U8glib"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + '   do {\n'
      + '       u8g.setFont(u8g_font_unifont);\n'
      + '       u8g.drawStr( 0, 22, "Bonjour !");\n'
      + '   } while( u8g.nextPage());\n'
      + '   delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    code += '   do {\n'
    code += '       u8g.drawStr(0, 12, ' + value_text_line1 + ');\n'
    code += '       u8g.setPrintPos(100, 12 );\n'
    code += '       u8g.print(' + value_n1 + ');\n'
    code += '       u8g.drawStr(0, 28, ' + value_text_line2 + ');\n'
    code += '       u8g.setPrintPos(100, 28 );\n'
    code += '       u8g.print(' + value_n2 + ');\n'
    code += '       u8g.drawStr(0, 44, ' + value_text_line3 + ');\n'
    code += '       u8g.setPrintPos(100, 44 );\n'
    code += '       u8g.print(' + value_n3 + ');\n'
    code += '       u8g.drawStr(0, 60, ' + value_text_line4 + ');\n'
    code += '       u8g.setPrintPos(100, 60 );\n'
    code += '       u8g.print(' + value_n4 + ');\n'
    code += '   }\n while( u8g.nextPage() );\n';
    return code;
};

Blockly.Arduino.display_4digitdisplay_power=function(){
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_TM1650'] = '#include <TM1650.h>';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.'+stat+'();\n';
}
Blockly.Arduino.display_4digitdisplay_displayString=function(){
	var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_TM1650'] = '#include <TM1650.h>';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.displayString('+value+');\n';
}
Blockly.Arduino.display_4digitdisplay_showDot=function(){
	var no=this.getFieldValue("NO");
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_TM1650'] = '#include <TM1650.h>';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.setDot('+no+','+stat+');\n';
}
var tm1637_DIO;
var tm1637_CLK;

Blockly.Arduino.display_TM1637_init = function () {
 tm1637_CLK = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  tm1637_DIO= Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_SevenSegmentTM1637'] = '#include <SevenSegmentTM1637.h>';
  
  Blockly.Arduino.definitions_['var_SevenSegmentTM1637'] = 'SevenSegmentTM1637  display(' + tm1637_CLK + ',' + tm1637_DIO + ');';
  Blockly.Arduino.setups_['setup_ display.begin()'] = ' display.begin();\n';
  return '';
};

Blockly.Arduino.display_TM1637_displyPrint = function () {
    //var Speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
    var VALUE = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'display.print(' + VALUE + ');' + '\n';
    return code;
  };

  Blockly.Arduino.display_TM1637_displayTime = function () {
    Blockly.Arduino.definitions_['include_SevenSegmentExtended'] = '#include <SevenSegmentExtended.h>';
    Blockly.Arduino.definitions_['var_SevenSegmentTM1637'] = 'SevenSegmentExtended  display(' + tm1637_CLK + ',' + tm1637_DIO + ');';
    var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
    var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'display.printTime(' + hour + ',' + minute +',true);\n';
    return code;
  };
   Blockly.Arduino.display_TM1637_clearDisplay = function () {
    var code = 'display.clear();\n';
    return code;
  };


  Blockly.Arduino.display_TM1637_Brightness = function () {
    var BRIGHTNESS = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'display.setBacklight(' + BRIGHTNESS + ');\n';
    return code;
  };
Blockly.Arduino.display_Matrix_Init = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var matrixName = this.getFieldValue('matrixName');
  Blockly.Arduino.definitions_['include_Matrix'] = '#include <Matrix.h>';
  Blockly.Arduino.definitions_[matrixName] = 'Matrix '+ matrixName +'('+SDA+','+SCL+');';
  Blockly.Arduino.setups_['setup_' + matrixName] = matrixName + '.begin(0x70); \n';
  var code= matrixName+'.clear();\n';
  return code;
};
Blockly.Arduino.display_Matrix_POS = function() {
  var pos_x = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var pos_y = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var matrixName = this.getFieldValue('matrixName');
  var dropdown_type = this.getFieldValue('DrawPixel_TYPE');
  var code = matrixName + '.drawPixel('+pos_x+'-1,'+pos_y+'-1,'+dropdown_type+');\n'
      code+= matrixName + '.writeDisplay();\n';
  return code;
};
Blockly.Arduino.display_Matrix_Rotation = function() {
  var matrixName = this.getFieldValue('matrixName');
  var dropdown_type = this.getFieldValue('Rotation_TYPE');
  var code = matrixName + '.setRotation('+dropdown_type+');\n'
  return code;
};
Blockly.Arduino.display_Matrix_TEXT = function() {
  var matrixName = this.getFieldValue('matrixName');
  var textString = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ASSIGNMENT);
  var code = matrixName + '.drawStr('+textString+');\n'
  return code;
};
//执行器_点阵屏显示_显示图案
Blockly.Arduino.display_Matrix_DisplayChar = function() {
  var matrixName = this.getFieldValue('matrixName');
  var dotMatrixArray = Blockly.Arduino.valueToCode(this, 'LEDArray', Blockly.Arduino.ORDER_ASSIGNMENT);
  Blockly.Arduino.definitions_['LEDArray'] = 'uint8_t  LEDArray[8];';
//  var code='Matrix_'+SDA+'_'+SCL+'.clear()dotMatrix;\n';
  var code='';
  code+='for(int i=0; i<8; i++)\n';
  code+='{\n'
  code+='  LEDArray[i]='+dotMatrixArray+'[i];\n';
  code+='  for(int j=0; j<8; j++)\n'
  //code+='  for(int j=7; j>=0; j--)\n'
  code+='  {\n'
  code+='    if((LEDArray[i]&0x01)>0)\n';
  code+='    	'+	matrixName +'.drawPixel(j, i,1);\n';
  code+='    	LEDArray[i] = LEDArray[i]>>1;\n';
  code+='  }  \n'
  code+='}\n'
  code+= matrixName+'.writeDisplay();\n'
  return code;
};
//执行器_点阵屏显示_点阵数组
Blockly.Arduino.display_Matrix_LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 9; j++) {
      a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = '{';
  for (var i = 1; i < 9; i++) {
    var tmp = ""
    for (var j = 1; j < 9; j++) {
      tmp += a[i][j];
    }
    tmp = (parseInt(tmp, 2)).toString(16)
    if (tmp.length == 1) tmp = "0" + tmp;
    code += '0x' + tmp + ((i != 8) ? ',' : '');
  }
  code += '};';
  //Blockly.Arduino.definitions_[this.id] = "byte LedArray_"+clearString(this.id)+"[]="+code;
  Blockly.Arduino.definitions_[varName] = "uint8_t " + varName + "[8]=" + code;
  //return ["LedArray_"+clearString(this.id), Blockly.Arduino.ORDER_ATOMIC];
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.display_Matrix_CLEAR = function() {
  var matrixName = this.getFieldValue('matrixName');
  var code = matrixName + '.clear();\n'
  code += matrixName +'.writeDisplay();\n';
  return code;
};

//Max7219初始化
Blockly.Arduino.MAX7219_init = function() {
 var pin_cs = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
 var hDisplays = Blockly.Arduino.valueToCode(this, 'hDisplays', Blockly.Arduino.ORDER_ATOMIC);
 var vDisplays = Blockly.Arduino.valueToCode(this, 'vDisplays', Blockly.Arduino.ORDER_ATOMIC);
 Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
 Blockly.Arduino.definitions_['include_Adafruit_GFX'] = '#include <Adafruit_GFX.h>';
 Blockly.Arduino.definitions_['include_Max72xxPanel'] = '#include <Max72xxPanel.h>';
 Blockly.Arduino.definitions_['define_Max72xxPanel'] = 'Max72xxPanel matrix = Max72xxPanel('+pin_cs+','+hDisplays+','+ vDisplays+');';
 var code = '';
 return code;
};
//MAX7219设置亮度
Blockly.Arduino.MAX7219_Brightness = function () {
  var BRIGHTNESS = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'matrix.setIntensity(' + BRIGHTNESS + ');\n';
  return code;
};
//MA7219设置单点
Blockly.Arduino.MAX7219_drawPixel = function() {
  var pos_x = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var pos_y = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var dropdown_type = this.getFieldValue('DrawPixel_TYPE');
  var code = 'matrix.drawPixel('+pos_x+','+pos_y+','+dropdown_type+');\n'
  code+= ' matrix.write();\n';
  return code;
};
//MA7219全亮/全灭/关闭/开启
Blockly.Arduino.MAX7219_fillScreen = function() {
  var FILLSCREEN_TYPE = this.getFieldValue('FILLSCREEN_TYPE');
  var code = 'matrix.'+FILLSCREEN_TYPE+';\n'
  code+= ' matrix.write();\n';
  return code;
};

Blockly.Arduino.MAX7219_Rotation = function() {
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ASSIGNMENT);
  var dropdown_type = this.getFieldValue('Rotation_TYPE');
  var code = 'matrix.setRotation('+NUM+','+dropdown_type+');\n'
  return code;
};

//
Blockly.Arduino.LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 9; j++) {
      a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = '{';
  for (var i = 1; i < 9; i++) {
    var tmp = ""
    for (var j = 1; j < 9; j++) {
      tmp += a[i][j];
    }
    tmp = (parseInt(tmp, 2)).toString(16)
    if (tmp.length == 1) tmp = "0" + tmp;
    code += '0x' + tmp + ((i != 8) ? ',' : '');
  }
  code += '};\n';
  Blockly.Arduino.definitions_[varName] = "byte " + varName + "[]=" + code;
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.MAX7219_DisplayChar = function() {
  var dotMatrixArray = Blockly.Arduino.valueToCode(this, 'LEDArray', Blockly.Arduino.ORDER_ASSIGNMENT);
  Blockly.Arduino.definitions_['LEDArray'] = 'uint8_t  LEDArray[8];';
  var code='';
  code+='for(int i=0; i<8; i++)\n';
  code+='{\n'
  code+='  LEDArray[i]='+dotMatrixArray+'[i];\n';
  code+='  for(int j=0; j<8; j++)\n'
  code+='  {\n'
  code+='    if((LEDArray[i]&0x01)>0)\n';
  code+='     matrix.drawPixel(j, i,1);\n';
  code+='     LEDArray[i] = LEDArray[i]>>1;\n';
  code+='  }  \n'
  code+='}\n'
  code+= 'matrix.write();\n'
  return code;
};
//
Blockly.Arduino.MAX7219_scrollMessage = function() {
   var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
  
  var speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  code += 'matrix.scrollMessage('+value+', ' + speed + ');\n';
  return code;
};

//
Blockly.Arduino.Matrix_img = function() {
  var dropdown_img_ = this.getFieldValue('img_');
  var code = '"' + dropdown_img_ + '"';
  code = '{';
  for (var i = 0; i < 15; i += 2) {
    code += '0x' + dropdown_img_.substr(i, 2) + ((i != 14) ? ',' : '');
  }
  code += '};\n';
  Blockly.Arduino.definitions_['matrix_img_' + dropdown_img_] = "byte " + 'matrix_img_' + dropdown_img_ + "[]=" + code;
  return ['matrix_img_' + dropdown_img_, Blockly.Arduino.ORDER_ATOMIC];
};
