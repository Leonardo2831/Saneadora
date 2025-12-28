import verifyExistValueInput from "../inputs/verifyExistValueInput.js";
import { addEventMenuClickRight, removeEventMenuClickRight, } from "../menuRight/eventMenuClickRight.js";
var NewOnus = /** @class */ (function () {
    function NewOnus(tableContent, inputName, inputCpf, selectType, inputAto, buttonAdd) {
        this.selectorTable = tableContent;
        this.tableContent = document.querySelector(tableContent);
        this.inputCpf = document.querySelector(inputCpf);
        this.inputName = document.querySelector(inputName);
        this.selectType = document.querySelector(selectType);
        this.inputAto = document.querySelector(inputAto);
        this.buttonAdd = document.querySelector(buttonAdd);
        this.createRow = this.createRow.bind(this);
        this.addRow = this.addRow.bind(this);
    }
    NewOnus.prototype.addEventChangeActive = function () {
        var atoCancel = document.querySelector('[data-ato="cancel"]');
        if (!atoCancel)
            return;
        var activeOnus = atoCancel.classList.contains("table-value-red") ? false : true;
        atoCancel.onclick = function () {
            activeOnus = !activeOnus;
            var toggleActive = activeOnus ? "red" : "green";
            var inverseToggleActive = !activeOnus ? "red" : "green";
            atoCancel.classList.replace("table-value-".concat(toggleActive), "table-value-".concat(inverseToggleActive));
            atoCancel.textContent = activeOnus ? "Cancelado" : "Ativo";
        };
    };
    NewOnus.prototype.createRow = function () {
        var _a;
        if (this.inputName.value == "" ||
            (this.inputCpf.value.length < 11 && this.inputCpf.value !== "") ||
            this.inputAto.value == "") {
            var inputs = [
                this.inputName,
                this.inputCpf,
                this.inputAto,
            ];
            verifyExistValueInput(inputs);
            return null;
        }
        var row = document.createElement("tr");
        var classRow = [
            "bg-gray-50",
            "border-t",
            "border-gray-200",
        ];
        (_a = row.classList).add.apply(_a, classRow);
        var _b = this.inputAto.value.match(/\d+|[a-zA-Z]+/g) || [], typeAto = _b[0], valueAto = _b[1];
        if (!valueAto && /^\d+$/.test(typeAto)) {
            valueAto = typeAto;
            typeAto = "R";
        }
        var rowContent = "\n            <td\n                class=\"px-4 py-4 text-base font-medium text-gray-600\"\n            >\n                ".concat(typeAto, ".").concat(valueAto, "\n            </td>\n            <td class=\"px-4 py-4 relative\" data-menu aria-label=\"").concat(this.inputName.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    value=\"").concat(this.inputName.value, "\"\n                />\n            </td>\n            <td class=\"px-4 py-4 relative\" data-menu aria-label=\"").concat(this.inputCpf.value == "" ? "Não Consta" : this.inputCpf.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    data-input=\"cpf\"\n                    value=\"").concat(this.inputCpf.value == ""
            ? "Não Consta"
            : this.inputCpf.value, "\"\n                />\n            </td>\n            <td class=\"px-4 py-4 relative\" data-menu aria-label=\"").concat(this.selectType.value, "\">\n                <input\n                    type=\"text\"\n                    class=\"table-input\"\n                    value=\"").concat(this.selectType.value, "\"\n                />\n            </td>\n            <td class=\"px-4 py-4 relative\">\n                <div\n                    class=\"table-value-red table-value font-bold cursor-pointer\"\n                    data-ato=\"cancel\"\n                >\n                    Ativo\n                </div>\n            </td>\n            <td class=\"px-4 py-4 relative\">\n                <div\n                    class=\"table-value-gray table-value font-bold\"\n                    contenteditable=\"true\"\n                >\n                    N\u00E3o cancelado\n                </div>\n            </td>\n        ");
        row.innerHTML = rowContent;
        return row;
    };
    NewOnus.prototype.addRow = function () {
        this.tableContent = document.querySelector(this.selectorTable);
        var row = this.createRow();
        if (!row)
            return;
        this.tableContent.appendChild(row);
        this.addEventChangeActive();
        this.inputName.value = "";
        this.inputCpf.value = "";
        this.inputAto.value = "";
        removeEventMenuClickRight();
        addEventMenuClickRight();
    };
    NewOnus.prototype.addEventButtonAdd = function () {
        this.buttonAdd.addEventListener("click", this.addRow);
    };
    NewOnus.prototype.init = function () {
        if (this.buttonAdd)
            this.addEventButtonAdd();
        this.addEventChangeActive();
        return this;
    };
    return NewOnus;
}());
export default NewOnus;
