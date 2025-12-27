var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import initAfterLoad from "../initAfterLoad.js";
function fetchSaneadora(url, alertError) {
    return __awaiter(this, void 0, void 0, function () {
        var alertErrorElement, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alertErrorElement = document.querySelector(alertError);
                    if (!alertErrorElement)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url, {
                            method: "GET",
                        })];
                case 2:
                    response = _a.sent();
                    alertErrorElement.textContent = "Matrícula Aberta com Sucesso";
                    alertErrorElement.classList.add("show");
                    setTimeout(function () {
                        alertErrorElement.classList.remove("show", "error");
                    }, 1500);
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!(data === null || data === void 0 ? void 0 : data.length))
                        throw new Error("Nenhuma matricula encontrada");
                    return [2 /*return*/, data];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    alertErrorElement.textContent =
                        "Erro ao Abrir Matricula, tente novamente mais tarde...";
                    alertErrorElement.classList.add("error");
                    setTimeout(function () {
                        alertErrorElement.classList.remove("show", "error");
                    }, 1500);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export default function initSaneadoraDocument(url, tableCadastro, tableOnus, tableNumeros, tableEstremacao, contentFinalText, buttonSave, alertError) {
    return __awaiter(this, void 0, void 0, function () {
        var tables, data, buttonSaveElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!tableCadastro || !tableOnus || !tableNumeros || !tableEstremacao || !contentFinalText)
                        return [2 /*return*/];
                    tables = {
                        tableCadastro: document.querySelector(tableCadastro),
                        tableOnus: document.querySelector(tableOnus),
                        tableNumeros: document.querySelector(tableNumeros),
                        tableEstremacao: document.querySelector(tableEstremacao),
                        contentTextFinal: document.querySelector(contentFinalText),
                    };
                    if (!url)
                        return [2 /*return*/];
                    return [4 /*yield*/, fetchSaneadora(url, alertError)];
                case 1:
                    data = _a.sent();
                    buttonSaveElement = document.querySelector(buttonSave);
                    if (!tables.tableCadastro ||
                        !tables.tableOnus ||
                        !tables.tableNumeros ||
                        !tables.tableEstremacao ||
                        !tables.contentTextFinal ||
                        !buttonSaveElement)
                        return [2 /*return*/];
                    tables.tableCadastro.innerHTML = "";
                    tables.tableOnus.innerHTML = "";
                    tables.tableNumeros.innerHTML = "";
                    tables.tableEstremacao.innerHTML = "";
                    tables.contentTextFinal.innerHTML = "";
                    if (!(data === null || data === void 0 ? void 0 : data.length))
                        return [2 /*return*/];
                    buttonSaveElement.setAttribute("data-id", data[data.length - 1].id.toString());
                    tables.tableCadastro.innerHTML = data[data.length - 1].tableCadastro;
                    tables.tableOnus.innerHTML = data[data.length - 1].tableOnus;
                    tables.tableNumeros.innerHTML = data[data.length - 1].tableNumbers;
                    tables.tableEstremacao.innerHTML = data[data.length - 1].tableEstremacao;
                    tables.contentTextFinal.innerHTML = data[data.length - 1].textSaneadora;
                    initAfterLoad();
                    return [2 /*return*/];
            }
        });
    });
}
