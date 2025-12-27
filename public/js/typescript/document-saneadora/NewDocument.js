var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import TabNav from "../tabNav/tabNav.js";
import ClickOutside from "../ClickOutside.js";
import valuesSaneadora from "./documentValues.js";
import initAfterLoad from "../initAfterLoad.js";
var DocumentSaneadora = /** @class */ (function () {
    function DocumentSaneadora(newSaneadoraButton, buttonFormCancel, buttonFormNew, modalNewSaneadora, contentTextFinal, tabNavValues, classActiveModal) {
        this.newSaneadoraButton = document.querySelector(newSaneadoraButton);
        this.buttonFormCancel = document.querySelector(buttonFormCancel);
        this.buttonFormNew = document.querySelector(buttonFormNew);
        this.modalNewSaneadora = document.querySelector(modalNewSaneadora);
        this.contentTextFinal = document.querySelector(contentTextFinal);
        this.tabNav = new (TabNav.bind.apply(TabNav, __spreadArray([void 0], tabNavValues, false)))();
        this.tabInit = this.tabNav.firstTab();
        this.clickOutsideEvent = new ClickOutside(this.modalNewSaneadora, "data-outside", "click", this.changeStyleOutside.bind(this));
        this.classActiveModal = classActiveModal || "hidden";
    }
    DocumentSaneadora.prototype.changeStyleOutside = function () {
        var _a, _b, _c, _d;
        this.tabNav.setTargetActive(this.tabInit, 0);
        this.clickOutsideEvent.removeEventClickOutside();
        (_d = (_c = (_b = (_a = this.modalNewSaneadora) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add(this.classActiveModal);
    };
    DocumentSaneadora.prototype.addEventFormButtons = function () {
        var _this = this;
        var _a, _b;
        (_a = this.buttonFormNew) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            var result = valuesSaneadora();
            if (result) {
                _this.changeStyleOutside();
                _this.tabNav.changeListTables("[data-tableInfos]");
                initAfterLoad();
                _this.contentTextFinal.innerHTML = "";
            }
        });
        (_b = this.buttonFormCancel) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
            _this.changeStyleOutside();
        });
    };
    DocumentSaneadora.prototype.addEventNewDocument = function () {
        var _this = this;
        var _a;
        (_a = this.newSaneadoraButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (event) {
            var _a, _b, _c, _d;
            event.stopPropagation();
            _this.clickOutsideEvent.init();
            (_d = (_c = (_b = (_a = _this.modalNewSaneadora) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.remove(_this.classActiveModal);
        });
    };
    DocumentSaneadora.prototype.init = function () {
        if (this.newSaneadoraButton)
            this.addEventNewDocument();
        if (this.buttonFormCancel)
            this.addEventFormButtons();
        if (this.tabNav)
            this.tabNav.init();
        return this;
    };
    return DocumentSaneadora;
}());
export default DocumentSaneadora;
