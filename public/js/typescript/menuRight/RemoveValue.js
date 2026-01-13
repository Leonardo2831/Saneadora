import sumValue from "../sumValues.js";
var RemoveValue = /** @class */ (function () {
    function RemoveValue(eventClick, buttonRemoveValue, menuClickRight) {
        this.eventClick = eventClick;
        this.buttonRemoveValue = document.querySelector(buttonRemoveValue);
        this.menuClickRight = menuClickRight;
        this.cellTableTarget = this.eventClick.target.closest("[data-remove]");
        this.removeValue = this.removeValue.bind(this);
    }
    RemoveValue.prototype.removeEventButton = function () {
        var _a;
        (_a = this.buttonRemoveValue) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this.removeValue);
    };
    RemoveValue.prototype.calcPercentColumn = function (areaReal, areaTotal) {
        var _a, _b;
        var percentTotal = (areaTotal * 100) / Number(areaReal.replace(',', '.'));
        if (!((_b = (_a = this.cellTableTarget) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.children[this.cellTableTarget.parentElement.children.length - 1].children[1]))
            return;
        this.cellTableTarget.parentElement.children[this.cellTableTarget.parentElement.children.length - 1].children[1].textContent = "".concat(percentTotal, "%");
    };
    RemoveValue.prototype.calcAreaColumn = function (areaReal, unit) {
        var _this = this;
        var _a;
        if (!((_a = this.cellTableTarget) === null || _a === void 0 ? void 0 : _a.parentElement))
            return;
        var childrensValues = this.cellTableTarget.parentElement.querySelectorAll("[data-remove]");
        if (!childrensValues.length)
            return;
        var areaTotal = Array.from(childrensValues).reduce(function (acc, child) {
            var _a;
            if (child == _this.cellTableTarget)
                return acc;
            var rawValue = (_a = child.getAttribute("data-remove")) !== null && _a !== void 0 ? _a : "";
            var cleanValue = rawValue
                .replace(/m2|m²|ha|%|\s/g, "")
                .replace(",", ".");
            return acc + Number(cleanValue);
        }, 0);
        if (!this.cellTableTarget.parentElement.children[this.cellTableTarget.parentElement.children.length - 2].children[1])
            return;
        this.cellTableTarget.parentElement.children[this.cellTableTarget.parentElement.children.length - 2].children[1].textContent = "".concat(areaTotal).concat(unit);
        this.calcPercentColumn(areaReal, areaTotal);
    };
    RemoveValue.prototype.removeValue = function () {
        var _a, _b, _c;
        this.menuClickRight.classList.remove("show");
        var valueCell = (_a = this.cellTableTarget) === null || _a === void 0 ? void 0 : _a.getAttribute("data-remove");
        if (!valueCell)
            return;
        var areaMatricula = document.querySelector('[data-real="area"]');
        var _d = ((_b = areaMatricula.textContent) === null || _b === void 0 ? void 0 : _b.match(/([0-9]+[.,]?[0-9]*)+|m2|m²|ha|%|-|\+/g)) || [], areaReal = _d[0], unitReal = _d[1];
        this.calcAreaColumn(areaReal, unitReal);
        var _e = valueCell.match(/([0-9]+[.,]?[0-9]*)+|m2|m²|ha|%|-|\+/g) || [], unit = _e[1];
        // calculando a área
        sumValue('[data-area="total"]', '[data-sum="area"]', unit);
        // calculando porcentagem
        sumValue('[data-area="percent"]', '[data-sum="percent"]', "%");
        (_c = this.cellTableTarget) === null || _c === void 0 ? void 0 : _c.remove();
        this.removeEventButton();
    };
    RemoveValue.prototype.addEventButton = function () {
        var _a;
        (_a = this.buttonRemoveValue) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.removeValue);
    };
    RemoveValue.prototype.init = function () {
        if (this.buttonRemoveValue && this.menuClickRight)
            this.addEventButton();
        return this;
    };
    return RemoveValue;
}());
export default RemoveValue;
