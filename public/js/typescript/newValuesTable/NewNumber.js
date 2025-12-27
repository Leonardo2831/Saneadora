import verifyExistValueInput from "../inputs/verifyExistValueInput.js";
import { addEventMenuClickRight, removeEventMenuClickRight, } from "../menuRight/eventMenuClickRight.js";
var NewNumber = /** @class */ (function () {
    function NewNumber(tableContent, inputNumber, inputCpf, selectType, inputAto, buttonAdd) {
        this.selectorTable = tableContent;
        this.tableContent = document.querySelector(tableContent);
        this.inputNumber = document.querySelector(inputNumber);
        this.inputCpf = document.querySelector(inputCpf);
        this.selectType = document.querySelector(selectType);
        this.inputAto = document.querySelector(inputAto);
        this.buttonAdd = document.querySelector(buttonAdd);
        this.addRow = this.addRow.bind(this);
        this.createRow = this.createRow.bind(this);
    }
    NewNumber.prototype.cleanInputs = function () {
        this.inputNumber.value = "";
        this.inputCpf.value = "";
        this.inputAto.value = "";
    };
    NewNumber.prototype.createRow = function () {
        var _a;
        var row = document.createElement("tr");
        var classRow = ["bg-gray-50", "border-t", "border-gray-200"];
        (_a = row.classList).add.apply(_a, classRow);
        row.setAttribute("data-menu", "");
        row.setAttribute("aria-label", "".concat(this.inputNumber.value, ", ").concat(this.inputCpf.value, ", ").concat(this.selectType.value, ", ").concat(this.inputAto.value));
        if (this.inputNumber.value == "" ||
            (this.inputCpf.value.length < 11 && this.inputCpf.value !== "") ||
            this.inputAto.value == "") {
            var inputs = [
                this.inputNumber,
                this.inputCpf,
                this.inputAto,
            ];
            verifyExistValueInput(inputs);
            return null;
        }
        var _b = this.inputAto.value.match(/\d+|[a-zA-Z]+/g) || [], typeAto = _b[0], valueAto = _b[1];
        if (!valueAto && /^\d+$/.test(typeAto)) {
            valueAto = typeAto;
            typeAto = "R";
        }
        var rowContent = "\n            <td\n                class=\"px-4 py-4 text-base font-medium text-gray-600\"\n            >\n                ".concat(typeAto, ".").concat(valueAto, "\n            </td>\n            <td class=\"px-4 py-4 relative\" data-menu aria-label=\"").concat(this.inputNumber.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    value=\"").concat(this.inputNumber.value, "\"\n                />\n            </td>\n            <td class=\"px-4 py-4 relative\" data-menu aria-label=\"").concat(this.inputCpf.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    data-input=\"cpf\"\n                    value=\"").concat(this.inputCpf.value == ""
            ? "Não Consta"
            : this.inputCpf.value, "\"\n                />\n            </td>\n            <td class=\"px-4 py-4 relative\" data-menu aria-label=\"").concat(this.selectType.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    value=\"").concat(this.selectType.value, "\"\n                />\n            </td>\n        ");
        row.innerHTML = rowContent;
        return row;
    };
    NewNumber.prototype.addRow = function () {
        this.tableContent = document.querySelector(this.selectorTable);
        var row = this.createRow();
        if (!row)
            return;
        this.tableContent.appendChild(row);
        this.cleanInputs();
        removeEventMenuClickRight();
        addEventMenuClickRight();
    };
    NewNumber.prototype.addEventButtonAdd = function () {
        this.buttonAdd.addEventListener("click", this.addRow);
    };
    NewNumber.prototype.addEventInputNumber = function () {
        var _this = this;
        this.inputNumber.addEventListener("input", function () {
            _this.inputNumber.value = _this.inputNumber.value.replace(/[^0-9.-]/g, "");
        });
    };
    NewNumber.prototype.init = function () {
        if (this.buttonAdd)
            this.addEventButtonAdd();
        if (this.inputNumber)
            this.addEventInputNumber();
        return this;
    };
    return NewNumber;
}());
export default NewNumber;
