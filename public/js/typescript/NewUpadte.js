import ClickOutside from "./ClickOutside.js";
var NewUpdate = /** @class */ (function () {
    function NewUpdate(modal, button, buttonClose, infoNews) {
        this.modal = document.querySelector(modal);
        this.button = document.querySelector(button);
        this.buttonClose = document.querySelector(buttonClose);
        this.infoNews = document.querySelector(infoNews);
        this.clickOutside = null;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.removeInfoNews = this.removeInfoNews.bind(this);
    }
    NewUpdate.prototype.removeInfoNews = function (event) {
        var _a;
        event.stopPropagation();
        (_a = this.button) === null || _a === void 0 ? void 0 : _a.remove();
    };
    NewUpdate.prototype.closeModal = function () {
        var _a, _b, _c, _d, _e;
        (_d = (_c = (_b = (_a = this.modal) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add("hidden");
        (_e = this.clickOutside) === null || _e === void 0 ? void 0 : _e.removeEventClickOutside();
        this.clickOutside = null;
    };
    NewUpdate.prototype.openModal = function () {
        var _a, _b, _c, _d;
        if (!this.modal)
            return;
        (_d = (_c = (_b = (_a = this.modal) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.remove("hidden");
        if (this.clickOutside)
            this.clickOutside.removeEventClickOutside();
        this.clickOutside = new ClickOutside(this.modal, "data-outside", "click", this.closeModal).init();
    };
    NewUpdate.prototype.addEvents = function () {
        var _a, _b, _c;
        (_a = this.button) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.openModal);
        (_b = this.buttonClose) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.closeModal);
        (_c = this.infoNews) === null || _c === void 0 ? void 0 : _c.addEventListener("click", this.removeInfoNews);
    };
    NewUpdate.prototype.init = function () {
        if (this.modal && this.button && this.buttonClose && this.infoNews)
            this.addEvents();
        return this;
    };
    return NewUpdate;
}());
export default NewUpdate;
