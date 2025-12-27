import ClickOutside from "../ClickOutside.js";
import { calcNewArea, calcNewPercent } from "../calcValues.js";
import { addEventMenuClickRight, removeEventMenuClickRight, } from "../menuRight/eventMenuClickRight.js";
import eventRadioInput from "../inputs/eventRadioInput.js";
import sumValue from "../sumValues.js";
var CreateNewValue = /** @class */ (function () {
    function CreateNewValue(buttonsAdd, modalNewValue, buttonNewValue, buttonNewCancel, contentPercentBase, classBaseCalc, classActiveModal) {
        this.buttonsAddSelector = buttonsAdd;
        this.buttonsAdd = document.querySelectorAll(buttonsAdd);
        this.buttonNewValue = document.querySelector(buttonNewValue);
        this.buttonNewCancel = document.querySelector(buttonNewCancel);
        this.modalNewValue = document.querySelector(modalNewValue);
        this.contentPercentBase = document.querySelector(contentPercentBase);
        this.classActiveModal = classActiveModal || "hidden";
        this.classBaseCalc = classBaseCalc;
        this.eventItemAdd = null;
        this.changeStyleOutside = this.changeStyleOutside.bind(this);
        this.clickOutsideEvent = new ClickOutside(this.modalNewValue, "data-outside", "click", this.changeStyleOutside);
    }
    CreateNewValue.prototype.changeStyleOutside = function () {
        var _a, _b, _c;
        this.clickOutsideEvent.removeEventClickOutside();
        (_c = (_b = (_a = this.modalNewValue.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.classList.add(this.classActiveModal);
    };
    CreateNewValue.prototype.addCancel = function () {
        var _this = this;
        this.buttonNewCancel.addEventListener("click", function () {
            _this.changeStyleOutside();
        });
    };
    CreateNewValue.prototype.createInputNewValue = function (divValue, cloneButton, color, valueInput) {
        var _a;
        var inputNewValue = document.createElement("input");
        inputNewValue.type = "text";
        inputNewValue.name = "ato-value";
        var classInput = ["table-value", "table-value-".concat(color)];
        (_a = inputNewValue.classList).add.apply(_a, classInput);
        inputNewValue.value = valueInput;
        inputNewValue.setAttribute("aria-label", valueInput);
        divValue.appendChild(inputNewValue);
        divValue.appendChild(cloneButton);
        console.log(inputNewValue, inputNewValue.value);
    };
    CreateNewValue.prototype.addNewValueInTable = function () {
        var _a, _b;
        var _c, _d, _e, _f, _g;
        var col = (_d = (_c = this.eventItemAdd) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement;
        var cloneButton = (_e = this.eventItemAdd) === null || _e === void 0 ? void 0 : _e.cloneNode(true);
        (_f = this.eventItemAdd) === null || _f === void 0 ? void 0 : _f.remove();
        if (!col || !cloneButton) {
            return;
        }
        var inputAto = this.modalNewValue.querySelector('[data-input="newAto"]');
        var inputValue = this.modalNewValue.querySelector('[data-input="newValue"]');
        var inputsRadio = this.modalNewValue.querySelectorAll('input[type="radio"]');
        var inputRadioChecked = Array.from(inputsRadio).find(function (input) { return input.checked; });
        if (!inputValue || !inputRadioChecked) {
            return;
        }
        var valueWithUnit = inputValue.value.replace(".", ",") + inputRadioChecked.value;
        var colorInput = "limon";
        if (Number(inputValue.value) < 0) {
            colorInput = "red";
        }
        else if (Number(inputValue.value) > 0) {
            colorInput = "limon";
        }
        var divCell = document.createElement("div");
        var classDivCell = ["min-h-[100px]", "relative"];
        (_a = divCell.classList).add.apply(_a, classDivCell);
        divCell.setAttribute("data-menu", "");
        divCell.setAttribute("aria-label", inputValue.value.replace(/m²|m2|ha|%|-|\+/g, ""));
        var insertLocal = col.children[col.children.length - 2];
        // td ato
        var pAto = document.createElement("p");
        var classPAto = [
            "text-center",
            "text-xs",
            "font-medium",
            "text-gray-600",
            "uppercase",
            "mb-1.5",
        ];
        (_b = pAto.classList).add.apply(_b, classPAto);
        pAto.textContent = "\u00C1rea: ".concat(inputAto === null || inputAto === void 0 ? void 0 : inputAto.value);
        divCell.appendChild(pAto);
        // input valor
        this.createInputNewValue(divCell, cloneButton, colorInput, valueWithUnit);
        this.changeStyleOutside();
        var areaMatricula = document.querySelector('[data-real="area"]');
        var _h = ((_g = areaMatricula.textContent) === null || _g === void 0 ? void 0 : _g.match(/([0-9]+[.,]?[0-9]*)+|m2|m²|ha|%|-|\+/g)) || [], areaReal = _h[0], unitArea = _h[1];
        if (!unitArea)
            return;
        calcNewArea(insertLocal, inputValue.value, inputRadioChecked.value, divCell.children[1]);
        calcNewPercent(Number(areaReal.replace(",", ".")), '[data-area="percent"]');
        col.insertBefore(divCell, insertLocal);
        // calculando a área
        sumValue('[data-area="total"]', '[data-sum="area"]', unitArea);
        // calculando porcentagem
        sumValue('[data-area="percent"]', '[data-sum="percent"]', "%");
        this.addOpenModal();
        removeEventMenuClickRight();
        addEventMenuClickRight();
    };
    CreateNewValue.prototype.addEventNewValue = function () {
        var _this = this;
        this.buttonNewValue.addEventListener("click", function (event) {
            event.stopPropagation();
            _this.addNewValueInTable();
        });
    };
    CreateNewValue.prototype.openModal = function () {
        var _a, _b, _c;
        this.addEventNewValue();
        this.modalNewValue.removeAttribute(this.clickOutsideEvent.dataValue);
        (_c = (_b = (_a = this.modalNewValue.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.classList.remove(this.classActiveModal);
    };
    CreateNewValue.prototype.addEventInButton = function (buttonAdd) {
        var _this = this;
        buttonAdd.addEventListener("click", function (event) {
            event.stopPropagation();
            _this.clickOutsideEvent.init();
            _this.eventItemAdd = event.currentTarget;
            _this.openModal();
        });
    };
    CreateNewValue.prototype.addOpenModal = function () {
        var _this = this;
        this.buttonsAdd = document.querySelectorAll(this.buttonsAddSelector);
        this.buttonsAdd.forEach(function (buttonAdd) {
            _this.addEventInButton(buttonAdd);
        });
    };
    CreateNewValue.prototype.init = function () {
        if (this.modalNewValue && this.classBaseCalc && this.contentPercentBase)
            eventRadioInput(this.modalNewValue, this.classBaseCalc, this.contentPercentBase);
        if (this.buttonNewValue && this.modalNewValue)
            this.addOpenModal();
        if (this.buttonNewCancel && this.modalNewValue)
            this.addCancel();
        return this;
    };
    return CreateNewValue;
}());
export default CreateNewValue;
