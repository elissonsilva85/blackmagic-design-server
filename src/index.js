let fs = require('fs');
let edge = require('edge-js');
let express = require("express");
let app = express();

let ip = "192.168.88.240";

let defaultLumaParameters = {
    inputFill: 3,
    inputKey: 3,
    //
    masked: 0,
    maskTop: 0,
    maskBottom: 0,
    maskRight: 0,
    maskLeft: 0,
    //
    preMultiplied: 0,
    preMultipliedClip: 0.101,
    preMultipliedGain: 1,
    preMultipliedInvertKey: 0,
    //
    fly: 1,
    flySizeX: 1,
    flySizeY: 1,
    flyPositionX: 0,
    flyPositionY: 13.9
}

var __SimpleSwitcher = edge.func({
    source: function () {/*
        using System.Threading.Tasks;
    
        public class Startup
        {
            public async Task<object> Invoke(dynamic input)
            {
                string method = (string)input.method;
                System.Console.WriteLine("method: " + method);

                typeof(Helper).GetMethod(method).Invoke(null, new [] {input.param});

                return true;
            }
        }
    
        static class Helper
        {
            public static void CarregarImagemTemaCulto(dynamic param)
            {
                new SimpleSwitcher.RunCommands().CarregarImagemTemaCulto(param.ip, param.imageIndex);
            }

            public static void ExecutarAberturaCulto(dynamic param)
            {
                new SimpleSwitcher.RunCommands().ExecutarAberturaCulto(param.ip, param.tempoFrames);
            }

            public static void ExecutarEncerramentoCulto(dynamic param)
            {
                new SimpleSwitcher.RunCommands().ExecutarEncerramentoCulto(param.ip, param.indexImagemEncerramento, param.inputEncerramento, param.tempoTransicaoFinal, param.tempoEsperaAntesTerminar);
            }

            public static void ExibirOferta(dynamic param)
            {
                new SimpleSwitcher.RunCommands().ExibirOferta(param.ip, param.indexImagem);
            }

            public static void OcultarOferta(dynamic param)
            {
                new SimpleSwitcher.RunCommands().OcultarOferta(param.ip);
            }

            public static void DefinirSaidaAuxiliar(dynamic param)
            {
                new SimpleSwitcher.RunCommands().DefinirSaidaAuxiliar(param.ip, param.tipoInput, param.inputIndex);
            }

            public static void AtivarLegendaCoral(dynamic param)
            {
                new SimpleSwitcher.RunCommands().AtivarLegendaCoral(param.ip, param.lumaParameters);
            }

            public static void DesativarLegendaCoral(dynamic param)
            {
                new SimpleSwitcher.RunCommands().DesativarLegendaCoral(param.ip);
            }

            public static void DefinirPreview(dynamic param)
            {
                new SimpleSwitcher.RunCommands().DefinirPreview(param.ip, param.tipoInput, param.inputIndex);
            }

            public static void DefinirProgram(dynamic param)
            {
                new SimpleSwitcher.RunCommands().DefinirProgram(param.ip, param.tipoInput, param.inputIndex);
            }

            public static void PerformAutoTransition(dynamic param)
            {
                new SimpleSwitcher.RunCommands().PerformAutoTransition(param.ip);
            }

            public static void ListarSwitcherInputs(dynamic param)
            {
                new SimpleSwitcher.RunCommands().ListarSwitcherInputs(param.ip);
            }

            public static void SwitcherStatus(dynamic param)
            {
                new SimpleSwitcher.RunCommands().SwitcherStatus(param.ip);
            }

        }
    */},
    references: ["SimpleSwitcher.dll"]
});

let RunnableFunctions = {
    carregarImagemCultoEnsino: (recall) => {
        __SimpleSwitcher({
            method: "CarregarImagemTemaCulto", 
            param: {ip: ip, imageIndex: 1}
        }, recall);
    },

    carregarImagemEBD: (recall) => {
        __SimpleSwitcher({
            method: "CarregarImagemTemaCulto", 
            param: {ip: ip, imageIndex: 5}
        }, recall);
    },

    carregarImagemQuartaLibertacao: (recall) => {
        __SimpleSwitcher({
            method: "CarregarImagemTemaCulto", 
            param: {ip: ip, imageIndex: 6}
        }, recall);
    },

    carregarImagemSantaCeia: (recall) => {
        __SimpleSwitcher({
            method: "CarregarImagemTemaCulto", 
            param: {ip: ip, imageIndex: 1}
        }, recall);
    },

    carregarImagemDomingo: (recall) => {
        __SimpleSwitcher({
            method: "CarregarImagemTemaCulto", 
            param: {ip: ip, imageIndex: 7}
        }, recall);
    },

    carregarImagemBatismo: (recall) => {
        __SimpleSwitcher({
            method: "CarregarImagemTemaCulto", 
            param: {ip: ip, imageIndex: 9}
        }, recall);
    },
   
    carregarImagemGenerica: (recall) => {
        __SimpleSwitcher({
            method: "CarregarImagemTemaCulto", 
            param: {ip: ip, imageIndex: 8}
        }, recall);
    },

    carregarImagemAbertura: (recall) => {
        let now = new Date();
        switch(now.getDay())
        {
            case 0:
                // Domingo
		        console.log("Dom");
                if(now.getHours() <= 9)
                    RunnableFunctions.carregarImagemEBD(recall);
                else if (now.getHours() <= 15)
                    RunnableFunctions.carregarImagemBatismo(recall);
                else
                    RunnableFunctions.carregarImagemDomingo(recall);
                break;
            case 1:
                // Segunda
		        console.log("Seg");
		        RunnableFunctions.carregarImagemGenerica(recall);
                break;
            case 2:
                // Terça
                console.log("Ter");
                RunnableFunctions.carregarImagemGenerica(recall);
                break;
            case 3:
                // Quarta
		        console.log("Qua");
                RunnableFunctions.carregarImagemQuartaLibertacao(recall);
                break;
            case 4:
                // Quinta
                console.log("Qui");
                RunnableFunctions.carregarImagemGenerica(recall);
                break;
            case 5:
                // Sexta
		        console.log("Sex");
                RunnableFunctions.carregarImagemCultoEnsino(recall);
                break;
            case 6:
                // Sabado
		        console.log("Sab");
                RunnableFunctions.carregarImagemSantaCeia(recall);
                break;
        }     
    },

    iniciaCulto: (recall) => {
        __SimpleSwitcher({
            method: "ExecutarAberturaCulto", 
            param: {ip: ip, tempoFrames: 60}
        }, recall);
    },

    encerraCulto: (recall) => {
        __SimpleSwitcher({
            method: "ExecutarEncerramentoCulto", 
            param: {
                ip: ip,
                indexImagemEncerramento: 4, 
                inputEncerramento: 6, 
                tempoTransicaoFinal: 60, 
                tempoEsperaAntesTerminar: 8000
            }
        }, recall);
    },

    exibirOferta: (recall) => {
        __SimpleSwitcher({
            method: "ExibirOferta", 
            param: {ip: ip, indexImagem: 11}
        }, recall);
    },

    ocultarOferta: (recall) => {
        __SimpleSwitcher({
            method: "OcultarOferta", 
            param: {ip: ip}
        }, recall);
    },

    ativarLegendaCoral: (recall) => {
        __SimpleSwitcher({
            method: "AtivarLegendaCoral", 
            param: { 
                ip: ip,
                lumaParameters: defaultLumaParameters
            }
        }, recall);
    },

    desativarLegendaCoral: (recall) => {
        __SimpleSwitcher({
            method: "DesativarLegendaCoral", 
            param: { ip: ip }
        }, recall);
    },

    performAutoTransition: (recall) => {
        __SimpleSwitcher({
            method: "PerformAutoTransition", 
            param: { ip: ip }
        }, recall);
    },

    listarSwitcherInputs: (recall) => {
        __SimpleSwitcher({
            method: "ListarSwitcherInputs", 
            param:  { ip: ip }
        }, recall);
    },

    status: (recall) => {
        __SimpleSwitcher({
            method: "SwitcherStatus", 
            param: { ip: ip }
        }, recall);
    },

}

app.get('/', function(req, res) {
    res.send('Olá Mundo!');
});

app.get('/run/:func', function(req, res) {
    if(RunnableFunctions[req.params.func])
    {
        RunnableFunctions[req.params.func](
            function (error, result) {
                if(error) {
                    console.log("erro", error);
                    //
                    fs.writeFile('src/reload.txt',`${new Date().getUTCMilliseconds()}`, function (err,data) {
                        if (err) {
                          return console.log(err);
                        }
                        console.log(data);
                    });
                    //
                    res.redirect(301, 'http://localhost:3000' + req.path);
                    //
                } else {
                    console.log("sucesso");
                    res.send(`OK - ${req.params.func}`);
                }
            });
    }
    else
    {
        res.status(500).send("Nao localizado");
    }
});

app.get('/run/aux/:tipo/:input', function(req, res) {
    __SimpleSwitcher({
        method: "DefinirSaidaAuxiliar", 
        param: {
            ip: ip,
            tipoInput: req.params.tipo,
            inputIndex: parseInt(req.params.input)
        }
    }, function (error, result) {
        if(error) {
            console.log("erro", error);
            //
            fs.writeFile('src/reload.txt',`${new Date().getUTCMilliseconds()}`, function (err,data) {
                if (err) {
                    return console.log(err);
                }
                console.log(data);
            });
            //
            res.redirect(301, 'http://localhost:3000' + req.path);
            //
        } else {
            console.log("sucesso");
            res.send(`OK - ${req.params.func}`);
        }
    });
});

app.get('/run/pgm/:tipo/:input', function(req, res) {
    __SimpleSwitcher({
        method: "DefinirProgram", 
        param: {
            ip: ip,
            tipoInput: req.params.tipo,
            inputIndex: parseInt(req.params.input)
        }
    }, function (error, result) {
        if(error) {
            console.log("erro", error);
            //
            fs.writeFile('src/reload.txt',`${new Date().getUTCMilliseconds()}`, function (err,data) {
                if (err) {
                    return console.log(err);
                }
                console.log(data);
            });
            //
            res.redirect(301, 'http://localhost:3000' + req.path);
            //
        } else {
            console.log("sucesso");
            res.send(`OK - ${req.params.func}`);
        }
    });
});

app.get('/run/prev/:tipo/:input', function(req, res) {
    __SimpleSwitcher({
        method: "DefinirPreview", 
        param: {
            ip: ip,
            tipoInput: req.params.tipo,
            inputIndex: parseInt(req.params.input)
        }
    }, function (error, result) {
        if(error) {
            console.log("erro", error);
            //
            fs.writeFile('src/reload.txt',`${new Date().getUTCMilliseconds()}`, function (err,data) {
                if (err) {
                    return console.log(err);
                }
                console.log(data);
            });
            //
            res.redirect(301, 'http://localhost:3000' + req.path);
            //
        } else {
            console.log("sucesso");
            res.send(`OK - ${req.params.func}`);
        }
    });
});

app.listen(3000, function() {
    console.log('App escutando na porta 3000!');
});

