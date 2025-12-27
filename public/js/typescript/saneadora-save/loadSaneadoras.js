var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import DeleteSaneadora from "./DeleteSaneadora.js";
var LoadMatriculas = /** @class */ (function (_super) {
    __extends(LoadMatriculas, _super);
    function LoadMatriculas(buttonView, modal, buttonClose, url, contentLoad, notificationSaveSaneadora, modalAlert, buttonCloseAlert, buttonAcceptAlert) {
        return _super.call(this, buttonView, modal, buttonClose, url, contentLoad, notificationSaveSaneadora, modalAlert, buttonCloseAlert, buttonAcceptAlert) || this;
    }
    LoadMatriculas.prototype.addMatriculas = function (data) {
        var _this = this;
        var _a, _b, _c;
        if (!data)
            return;
        var matriculasLi = data.map(function (matricula) {
            return _this.createMatricula(matricula);
        });
        if (!this.contentMatriculas) {
            var contentMatriculas = document.createElement("ul");
            contentMatriculas.classList.add("list-matriculas");
            contentMatriculas.setAttribute("data-content", "matriculas");
            this.contentMatriculas = contentMatriculas;
        }
        this.contentMatriculas.innerHTML = "";
        (_a = this.contentMatriculas) === null || _a === void 0 ? void 0 : _a.append.apply(_a, matriculasLi);
        (_c = (_b = this.contentLoad) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.insertBefore(this.contentMatriculas, this.contentLoad);
        this.addEventDelete();
    };
    LoadMatriculas.prototype.openModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _super.prototype.openModal.call(this);
                        // passar com await para resolver a promisse antes de passa como parâmetro
                        _a = this.addMatriculas;
                        return [4 /*yield*/, this.fetchMatriculas()];
                    case 1:
                        // passar com await para resolver a promisse antes de passa como parâmetro
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    LoadMatriculas.prototype.createMatricula = function (matricula) {
        var li = document.createElement("li");
        li.setAttribute("id", String(matricula.id));
        var contentLi = "\n            <span>".concat(matricula.nome, "</span>\n                <svg\n                    data-buttonIcon=\"delete\"\n                    data-id=\"").concat(matricula.id, "\"\n                    xmlns=\"http://www.w3.org/2000/svg\"\n                    height=\"24px\"\n                    viewBox=\"0 -960 960 960\"\n                    width=\"24px\"\n                    fill=\"currentColor\"\n                    class=\"cursor-pointer p-1 w-8 h-8 text-gray-600 hover:text-red-400 transition-colors\"\n                >\n                    <path\n                        d=\"m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z\"\n                    />\n            </svg>\n        ");
        li.innerHTML = contentLi;
        return li;
    };
    LoadMatriculas.prototype.fetchMatriculas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1, infoError, classesInfoError;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!this.url)
                            throw new Error("URL not found");
                        return [4 /*yield*/, fetch(this.url, {
                                method: "GET",
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _b.sent();
                        if (this.contentLoad)
                            this.contentLoad.innerHTML = "";
                        return [2 /*return*/, data];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        if (!this.contentLoad)
                            return [2 /*return*/];
                        infoError = document.createElement("p");
                        classesInfoError = [
                            "text-center",
                            "text-red-500",
                            "font-bold",
                            "text-lg",
                            "my-5",
                        ];
                        (_a = infoError.classList).add.apply(_a, classesInfoError);
                        infoError.textContent =
                            "Erro ao carregar as matrículas, tente novamente mais tarde";
                        this.contentLoad.innerHTML = "";
                        this.contentLoad.appendChild(infoError);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LoadMatriculas;
}(DeleteSaneadora));
export default LoadMatriculas;
