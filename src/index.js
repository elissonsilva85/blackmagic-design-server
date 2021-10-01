let fs = require('fs');
let edge = require('edge-js');
let express = require("express");
let app = express();

let ip = "192.168.88.240";

let defaultLumaParameters = {
    onAir: 0,
    //
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
            private static SimpleSwitcher.RunCommands run = new SimpleSwitcher.RunCommands();

            public static void CarregarImagemTemaCulto(dynamic param)
            {
                run.CarregarImagemTemaCulto(param.ip, param.imageIndex);
            }

            public static void ExecutarAberturaCulto(dynamic param)
            {
                run.ExecutarAberturaCulto(param.ip, param.tempoFrames);
            }

            public static void ExecutarEncerramentoCulto(dynamic param)
            {
                run.ExecutarEncerramentoCulto(param.ip, param.indexImagemEncerramento, param.inputEncerramento, param.tempoTransicaoFinal, param.tempoEsperaAntesTerminar);
            }

            public static void ExibirOferta(dynamic param)
            {
                run.ExibirOferta(param.ip, param.indexImagem);
            }

            public static void OcultarOferta(dynamic param)
            {
                run.OcultarOferta(param.ip);
            }

            public static void DefinirSaidaAuxiliar(dynamic param)
            {
                run.DefinirSaidaAuxiliar(param.ip, param.tipoInput, param.inputIndex);
            }

            public static void AtivarLegendaCoral(dynamic param)
            {
                run.AtivarLegendaCoral(param.ip, param.lumaParameters);
            }

            public static void DesativarLegendaCoral(dynamic param)
            {
                run.DesativarLegendaCoral(param.ip);
            }

            public static void AtivarUpstream1(dynamic param)
            {
                run.AtivarUpstream1(param.ip, param.lumaParameters);
            }

            public static void DefinirPreview(dynamic param)
            {
                run.DefinirPreview(param.ip, param.tipoInput, param.inputIndex);
            }

            public static void DefinirProgram(dynamic param)
            {
                run.DefinirProgram(param.ip, param.tipoInput, param.inputIndex);
            }

            public static void PerformAutoTransition(dynamic param)
            {
                run.PerformAutoTransition(param.ip);
            }

            public static void ListarSwitcherInputs(dynamic param)
            {
                run.ListarSwitcherInputs(param.ip);
            }

            public static void SwitcherStatus(dynamic param)
            {
                run.SwitcherStatus(param.ip);
            }

        }
    */},
    references: ["SimpleSwitcher.dll"]
});

let RunnableFunctions = {
    carregarImagemCultoEnsino: (recall) => {
        __SimpleSwitcher({
            method: "CarregarImagemTemaCulto", 
            param: {ip: ip, imageIndex: 3}
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

app.get('/run/upstream/:input', function(req, res) {
    __SimpleSwitcher({
        method: "ExibirOferta", 
        param: {
            ip: ip,
            indexImagem: 19
        }
    }, () => {
        __SimpleSwitcher({
            method: "AtivarUpstream1", 
            param: { 
                ip: ip,
                lumaParameters: {
                    onAir: 1,
                    //
                    inputFill: parseInt(req.params.input),
                    inputKey: parseInt(req.params.input),
                    //
                    masked: 0,
                    maskTop: 0,
                    maskBottom: 0,
                    maskRight: 0,
                    maskLeft: 0,
                    //
                    preMultiplied: 0,
                    preMultipliedClip: 0,
                    preMultipliedGain: 1,
                    preMultipliedInvertKey: 0,
                    //
                    fly: 1,
                    flySizeX: 0.65,
                    flySizeY: 0.65,
                    flyPositionX: 5.3,
                    flyPositionY: 0.65
                    }
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

