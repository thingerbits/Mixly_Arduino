'use strict';

var pbc = Py2blockConfig.prototype;

pbc.objectFunctionD.get('init')['SERIAL'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length === 0 && keywords.length === 1) { //uart.init(baudrate=9600)
        if(py2block.identifier(keywords[0].arg) === "baudrate") {
            return [block("serial_begin", func.lineno, {"baudrate": keywords[0].value.n.v}, {}, {
                "inline": "true"
            })];
        }
    }else if(args.length === 0 && keywords.length === 3) { //uart.init(rx=0, tx=1, baudrate=115200)
        var rxblock = null;
        var txblock = null;
        var baudrate = null;
        for (var i = 0; i < keywords.length; i++) {
            var param = keywords[i];
            var key = py2block.identifier(param.arg);
            if (key === "rx") {
                py2block_config.pinType = "pins_serial";
                rxblock = py2block.convert(param.value);
                py2block_config.pinType = null;
            } else if (key === "tx") {
                py2block_config.pinType = "pins_serial";
                txblock = py2block.convert(param.value);
                py2block_config.pinType = null;
            } else if (key === "baudrate") {
                baudrate = param.value.n.v;
            }
        }
        if (rxblock != null && txblock != null && baudrate != null) {
            return [block("serial_softserial", func.lineno, {"baudrate": baudrate}, {
                "RX":rxblock,
                "TX":txblock
            }, {
                "inline": "true"
            })];
        }
    }
    throw new Error("Incorrect number of arguments");
}


pbc.objectFunctionD.get('write')['SERIAL'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 1) {
        throw new Error("Incorrect number of arguments");
    }
    var astname = args[0]._astname;
    if(astname === "Call"){
        if(py2block.identifier(args[0].func.id) === "str"){ //serial.write(str("XXX"))
            return [block("serial_print", func.lineno, {}, {
                    "CONTENT":py2block.convert(args[0].args[0]),
                }, {
                    "inline": "true"
                })];
        }
    }else if(astname === "BinOp"){
        if(args[0].op.name === "Add" && args[0].right._astname === "Str"
            && py2block.identifier(args[0].right.s) === "\r\n"
            && args[0].left._astname === "Call"
            && py2block.identifier(args[0].left.func.id) === "str"
        ){
            if(args[0].left.args[0]._astname === "Str") {//serial.write(str("XX") + "\r\n")
                return [block("serial_println", func.lineno, {}, {
                    "CONTENT": py2block.convert(args[0].left.args[0]),
                }, {
                    "inline": "true"
                })];
            }else if(args[0].left.args[0]._astname === "Call"
                && py2block.identifier(args[0].left.args[0].func.id) === "hex"){ //serial.write(str(hex(XX)) + "\r\n")
                return [block("serial_print_hex", func.lineno, {}, {
                    "CONTENT": py2block.convert(args[0].left.args[0].args[0]),
                }, {
                    "inline": "true"
                })];
            }
        }
    }
    return [block("serial_print", func.lineno, {}, {
            "CONTENT":py2block.convert(args[0]),
        }, {
            "inline": "true"
        })];
}

pbc.objectFunctionD.get('any')['SERIAL'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("serial_any", func.lineno, {}, {
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('read')['SERIAL'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("serial_readstr", func.lineno, {}, {
    }, {
        "inline": "true"
    })];
}


pbc.objectFunctionD.get('readline')['SERIAL'] = function(py2block, func, args, keywords, starargs, kwargs, node){
    if (args.length !== 0) {
        throw new Error("Incorrect number of arguments");
    }
    return [block("serial_readline", func.lineno, {}, {
    }, {
        "inline": "true"
    })];
}
