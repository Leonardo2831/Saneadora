import { calcNewAreaPercent, calcPercentPeople } from "../calcValues.js";
import { addEventMenuClickRight, removeEventMenuClickRight, } from "../menuRight/eventMenuClickRight.js";
import sumValue from "../sumValues.js";
import verifyExistValueInput from "../inputs/verifyExistValueInput.js";
var NewPeopleDocument = /** @class */ (function () {
    function NewPeopleDocument(inputName, inputCpf, selectState, inputNameConjuge, inputCpfConjuge, inputAto, buttonAdd, contentColums, inputArea, newValueCadastro, inputBaseValue) {
        this.inputName = document.querySelector(inputName);
        this.inputCpf = document.querySelector(inputCpf);
        this.selectState = document.querySelector(selectState);
        this.inputNameConjuge = document.querySelector(inputNameConjuge);
        this.inputCpfConjuge = document.querySelector(inputCpfConjuge);
        this.inputAto = document.querySelector(inputAto);
        this.inputArea = document.querySelector(inputArea);
        this.inputBaseValue = document.querySelector(inputBaseValue || "");
        this.buttonAdd = document.querySelector(buttonAdd);
        this.selectorContentColumns = contentColums;
        this.contentColums = document.querySelector(contentColums);
        this.dataColumn = "";
        this.areaInfos = [];
        this.buttonAddEvent = newValueCadastro;
        this.createCol = this.createCol.bind(this);
        this.addCol = this.addCol.bind(this);
    }
    NewPeopleDocument.prototype.cleanInputs = function () {
        this.inputName.value = "";
        this.inputName.classList.remove("invalid");
        this.inputCpf.value = "";
        this.inputCpf.classList.remove("invalid");
        this.inputNameConjuge.value = "";
        this.inputNameConjuge.classList.remove("invalid");
        this.inputCpfConjuge.value = "";
        this.inputCpfConjuge.classList.remove("invalid");
        this.inputAto.value = "";
        this.inputAto.classList.remove("invalid");
        this.inputArea.value = "";
        this.inputArea.classList.remove("invalid");
        if (this.inputBaseValue.value !== "") {
            this.inputBaseValue.value = "";
            this.inputBaseValue.classList.remove("invalid");
        }
    };
    NewPeopleDocument.prototype.createCol = function () {
        var _a, _b, _c, _d;
        // adicinado verificação se é viúvo(a) porque tem menos de 11 caracteres
        if (this.inputName.value === "" ||
            this.inputAto.value === "" ||
            this.inputArea.value === "" ||
            (this.inputCpf.value !== "" && this.inputCpf.value.length < 11) ||
            (this.inputCpfConjuge.value !== "" &&
                this.inputCpfConjuge.value.length < 11 &&
                this.inputCpfConjuge.value !== "Viúvo(a)")) {
            var inputs = [
                this.inputName,
                this.inputAto,
                this.inputArea,
                this.inputCpf,
                this.inputCpfConjuge,
            ];
            verifyExistValueInput(inputs);
            return null;
        }
        if (this.inputBaseValue.value !== "") {
            this.inputArea.value =
                ((_a = calcNewAreaPercent(Number(this.inputBaseValue.value.replace(/,/g, ".")), Number(this.inputArea.value.replace(/,/g, ".")))) === null || _a === void 0 ? void 0 : _a.toString().replace(".", ",")) || "";
        }
        var col = document.createElement("div");
        col.classList.add("children-style-cell");
        var areaMatricula = document.querySelector('[data-real="area"]');
        var _e = ((_b = areaMatricula.textContent) === null || _b === void 0 ? void 0 : _b.match(/([0-9]+[.,]?[0-9]*)+|m2|m²|ha|%|-|\+/g)) || [], areaReal = _e[0], unitArea = _e[1];
        this.areaInfos = [areaReal, unitArea];
        var _f = this.inputAto.value.match(/\d+|[a-zA-Z]+/g) || [], typeAto = _f[0], valueAto = _f[1];
        if (!valueAto && /^\d+$/.test(typeAto)) {
            valueAto = typeAto;
            typeAto = "R";
        }
        var dataContent = "\n            <header class=\"uppercase h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500 tracking-wider\">\n                ".concat(typeAto, ".").concat(valueAto, "\n            </header>\n            <div data-menu class=\"relative\" aria-label=\"").concat(this.inputName.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    value=\"").concat(this.inputName.value, "\"\n                />\n            </div>\n            <div data-menu class=\"relative\" aria-label=\"").concat(this.inputCpf.value == "" ? "Não Consta" : this.inputCpf.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    data-input=\"cpf\"\n                    value=\"").concat(this.inputCpf.value == ""
            ? "Não Consta"
            : this.inputCpf.value, "\"\n                />\n            </div>\n            <div data-menu class=\"relative\" aria-label=\"").concat(this.inputNameConjuge.value == ""
            ? "Não Consta"
            : this.inputNameConjuge.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    value=\"").concat(this.inputNameConjuge.value == ""
            ? "Não Consta"
            : this.inputNameConjuge.value, "\"\n                />\n            </div>\n            <div data-menu class=\"relative\" aria-label=\"").concat(this.inputCpfConjuge.value == ""
            ? "Não Consta"
            : this.inputCpfConjuge.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    data-input=\"cpf\"\n                    value=\"").concat(this.inputCpfConjuge.value == ""
            ? "Não Consta"
            : this.inputCpfConjuge.value, "\"\n                />\n            </div>\n            <div class=\"min-h-[100px] relative\" data-menu aria-label=\"").concat(this.inputArea.value, "\">\n                <p\n                    class=\"text-center text-xs font-medium text-gray-600 uppercase mb-1.5\"\n                >\n                    Ato: ").concat(this.inputAto.value, "\n                </p>\n                <input\n                    type=\"text\"\n                    class=\"table-value table-value-green\"\n                    value=\"").concat(this.inputArea.value).concat(unitArea, "\"\n                />\n                <button\n                    data-button=\"add\"\n                    class=\"absolute bottom-4 right-4 w-fit text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 transition-colors flex items-center p-1\"\n                >\n                    <img\n                        class=\"w-4 h-4\"\n                        src=\"public/images/icons/plus-white.svg\"\n                        alt=\"Adicionar Valor\"\n                    />\n                </button>\n            </div>\n            <div\n                class=\"totalCell font-bold text-gray-700 relative\"\n                data-menu aria-label=\"").concat(this.inputArea.value, "\"\n            >\n                <span>TOTAL AREA:</span>\n                <div\n                    data-area=\"total\"\n                    class=\"table-value table-value-green font-bold mt-2\"\n                >\n                    ").concat(this.inputArea.value).concat(unitArea, "\n                </div>\n            </div>\n            <div\n                class=\"totalCell font-bold text-gray-700 relative\"\n                data-menu aria-label=\"").concat((_c = calcPercentPeople(Number(areaReal.replace(",", ".")), Number(this.inputArea.value.replace(",", ".")))) === null || _c === void 0 ? void 0 : _c.toString().replace(".", ","), "\"\n            >\n                <span>% PESSOA:</span>\n                <div\n                    data-area=\"percent\"\n                    class=\"min-h-[46px] table-value table-value-blue font-bold mt-2\"\n                >\n                    ").concat((_d = calcPercentPeople(Number(areaReal.replace(",", ".")), Number(this.inputArea.value.replace(",", ".")))) === null || _d === void 0 ? void 0 : _d.toString().replace(".", ","), "%\n                </div>\n            </div>\n        ");
        col.innerHTML = dataContent;
        return col;
    };
    NewPeopleDocument.prototype.addCol = function () {
        this.contentColums = document.querySelector(this.selectorContentColumns);
        var colWithData = this.createCol();
        if (!colWithData)
            return;
        this.contentColums.appendChild(colWithData);
        var _a = this.areaInfos, unitArea = _a[1];
        sumValue('[data-area="total"]', '[data-sum="area"]', unitArea);
        sumValue('[data-area="percent"]', '[data-sum="percent"]', "%");
        this.cleanInputs();
        this.buttonAddEvent.addOpenModal();
        removeEventMenuClickRight();
        addEventMenuClickRight();
    };
    NewPeopleDocument.prototype.addEventButton = function () {
        this.buttonAdd.addEventListener("click", this.addCol);
    };
    NewPeopleDocument.prototype.addEventSelect = function () {
        var _this = this;
        this.selectState.addEventListener("change", function () {
            if (_this.selectState.value !== "Casado(a)") {
                _this.inputNameConjuge.disabled = true;
                _this.inputCpfConjuge.disabled = true;
                _this.inputNameConjuge.value = _this.selectState.value;
                _this.inputCpfConjuge.value = _this.selectState.value;
            }
            else {
                _this.inputNameConjuge.disabled = false;
                _this.inputCpfConjuge.disabled = false;
                _this.inputNameConjuge.value = "";
                _this.inputCpfConjuge.value = "";
            }
        });
    };
    NewPeopleDocument.prototype.init = function () {
        if (this.buttonAdd)
            this.addEventButton();
        if (this.selectState)
            this.addEventSelect();
        this.cleanInputs();
        return this;
    };
    return NewPeopleDocument;
}());
export default NewPeopleDocument;
