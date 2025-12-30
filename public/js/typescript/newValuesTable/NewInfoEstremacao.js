import { addEventMenuClickRight, removeEventMenuClickRight, } from "../menuRight/eventMenuClickRight.js";
import verifyExistValueInput from "../inputs/verifyExistValueInput.js";
import addNewEstremacao from "./NewEstremacao.js";
var NewInfoEstremacao = /** @class */ (function () {
    function NewInfoEstremacao(inputName, inputCPF, selectType, inputConjugeName, inputConjugeCPF, inputAto, inputArea, inputMatricula, buttonAdd, formContent, tableContent, objectNewPeople) {
        this.inputName = document.querySelector(inputName);
        this.inputCPF = document.querySelector(inputCPF);
        this.inputConjugeName = document.querySelector(inputConjugeName);
        this.inputConjugeCPF = document.querySelector(inputConjugeCPF);
        this.inputAto = document.querySelector(inputAto);
        this.inputArea = document.querySelector(inputArea);
        this.inputMatricula = document.querySelector(inputMatricula);
        this.selectType = document.querySelector(selectType);
        this.buttonAdd = document.querySelector(buttonAdd);
        this.formContent = document.querySelector(formContent);
        this.tableContent = document.querySelector(tableContent);
        this.objectNewPeople = objectNewPeople;
        this.addRowInfoEstremacao = this.addRowInfoEstremacao.bind(this);
    }
    NewInfoEstremacao.prototype.cleanInputs = function () {
        this.inputName.value = "";
        this.inputCPF.value = "";
        this.inputConjugeName.value = "";
        this.inputConjugeCPF.value = "";
        this.inputAto.value = "";
        this.inputArea.value = "";
        this.inputMatricula.value = "";
    };
    NewInfoEstremacao.prototype.createRowInfoEstremacao = function () {
        var _a;
        var _b;
        if (this.inputName.value === "" ||
            this.inputAto.value === "" ||
            this.inputArea.value === "" ||
            (this.inputCPF.value !== "" && this.inputCPF.value.length < 11) ||
            (this.inputConjugeCPF.value !== "" &&
                this.inputConjugeCPF.value.length < 11 &&
                this.inputConjugeCPF.value !== "Viúvo(a)")) {
            var inputs = [
                this.inputName,
                this.inputAto,
                this.inputArea,
                this.inputCPF,
                this.inputConjugeCPF,
            ];
            verifyExistValueInput(inputs);
            return null;
        }
        var rowInfo = document.createElement("tr");
        var classListRowInfo = [
            "bg-gray-50",
            "border-t",
            "border-gray-200",
        ];
        (_a = rowInfo.classList).add.apply(_a, classListRowInfo);
        var _c = this.inputAto.value.match(/\d+|[a-zA-Z]+/g) || [], typeAto = _c[0], valueAto = _c[1];
        if (!valueAto && /^\d+$/.test(typeAto)) {
            valueAto = typeAto;
            typeAto = "R";
        }
        var areaContent = document.querySelector('[data-real="area"]');
        var _d = ((_b = areaContent === null || areaContent === void 0 ? void 0 : areaContent.textContent) === null || _b === void 0 ? void 0 : _b.match(/\d+|[a-zA-Z]+/g)) || [], unitArea = _d[1];
        var contentRowInfo = "\n            <td\n                class=\"px-4 py-4 relative text-base font-medium text-gray-600\"\n            >\n                ".concat(typeAto, ".").concat(valueAto, "\n            </td>\n\n            <td\n                class=\"px-4 py-4 relative\"\n                data-content=\"peopleEstremacao\"\n                data-menu\n                aria-label=\"").concat(this.inputName.value, "\"\n            >\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    value=\"").concat(this.inputName.value, "\"\n                />\n            </td>\n            <td\n                class=\"px-4 py-4 relative\"\n                data-content=\"cpfEstremacao\"\n                data-menu\n                aria-label=\"").concat(this.inputCPF.value || "Não Consta", "\"\n            >\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    data-input=\"cpf\"\n                    value=\"").concat(this.inputCPF.value || "Não Consta", "\"\n                />\n            </td>\n            <td\n                class=\"px-4 py-4 relative\"\n                data-content=\"peopleConjugeEstremacao\"\n                data-menu\n                aria-label=\"").concat(this.inputConjugeName.value || "Não Consta", "\"\n            >\n                <input\n                    type=\"text\"\n                    class=\"table-input relative\"\n                    value=\"").concat(this.inputConjugeName.value || "Não Consta", "\"\n                />\n            </td>\n            <td\n                class=\"px-4 py-4 relative\"\n                data-content=\"cpfConjugeEstremacao\"\n                data-menu\n                aria-label=\"").concat(this.inputConjugeCPF.value || "Não Consta", "\"\n            >\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    data-input=\"cpf\"\n                    value=\"").concat(this.inputConjugeCPF.value || "Não Consta", "\"\n                />\n            </td>\n            <td class=\"px-4 py-4 relative\" data-menu aria-label=\"").concat(this.inputArea.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    value=\"").concat(this.inputArea.value).concat(unitArea, "\"\n                />\n            </td>\n            <td class=\"px-4 py-4 relative\" data-menu aria-label=\"").concat(this.inputMatricula.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    value=\"").concat(this.inputMatricula.value, "\"\n                />\n                <button\n                    data-button=\"addPeopleEstremacao\"\n                    class=\"absolute bottom-4 right-4 w-fit text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 transition-colors flex items-center p-1\"\n                >\n                    <img\n                        class=\"w-4 h-4\"\n                        src=\"public/images/icons/plus-white.svg\"\n                        alt=\"Adicionar Pessoa\"\n                    />\n                </button>\n            </td>\n        ");
        rowInfo.innerHTML = contentRowInfo;
        return rowInfo;
    };
    NewInfoEstremacao.prototype.addRowInfoEstremacao = function () {
        var rowInfo = this.createRowInfoEstremacao();
        if (!rowInfo)
            return;
        this.tableContent.appendChild(rowInfo);
        this.objectNewPeople.addOpenModal();
        addNewEstremacao('[data-tableInfos="cadastro"]', this.inputArea.value);
        this.cleanInputs();
        removeEventMenuClickRight();
        addEventMenuClickRight();
    };
    NewInfoEstremacao.prototype.addEventButtonAdd = function () {
        this.buttonAdd.addEventListener("click", this.addRowInfoEstremacao);
    };
    NewInfoEstremacao.prototype.addEventSelect = function () {
        var _this = this;
        this.selectType.addEventListener("change", function () {
            if (_this.selectType.value !== "Casado(a)") {
                _this.inputConjugeName.disabled = true;
                _this.inputConjugeCPF.disabled = true;
                _this.inputConjugeName.value = _this.selectType.value;
                _this.inputConjugeCPF.value = _this.selectType.value;
            }
            else {
                _this.inputConjugeName.disabled = false;
                _this.inputConjugeCPF.disabled = false;
                _this.inputConjugeName.value = "";
                _this.inputConjugeCPF.value = "";
            }
        });
    };
    NewInfoEstremacao.prototype.init = function () {
        if (this.buttonAdd)
            this.addEventButtonAdd();
        if (this.selectType)
            this.addEventSelect();
        return this;
    };
    return NewInfoEstremacao;
}());
export default NewInfoEstremacao;
