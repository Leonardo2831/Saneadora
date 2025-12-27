import ClickOutside from "../ClickOutside.js";
var MenuSaneadora = /** @class */ (function () {
    function MenuSaneadora(buttonView, modal, buttonClose, url, contentLoad, notificationSaveSaneadora) {
        this.buttonView = document.querySelector(buttonView);
        this.buttonClose = document.querySelector(buttonClose);
        this.modal = document.querySelector(modal);
        this.contentLoad = document.querySelector(contentLoad);
        this.notificationSaveSaneadora = document.querySelector(notificationSaveSaneadora);
        this.url = url;
        this.clickOutside = null;
        this.openModal = this.openModal.bind(this);
    }
    MenuSaneadora.prototype.addEventCloseModalButton = function () {
        var _this = this;
        if (!this.buttonClose)
            return;
        this.buttonClose.addEventListener("click", function () {
            var _a, _b, _c, _d, _e;
            (_d = (_c = (_b = (_a = _this.modal) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add("hidden");
            (_e = _this.clickOutside) === null || _e === void 0 ? void 0 : _e.removeEventClickOutside();
            _this.clickOutside = null;
        });
    };
    MenuSaneadora.prototype.createSpanLoad = function () {
        var _a;
        var spanLoad = document.createElement("span");
        var classesSpanLoad = [
            "w-12",
            "h-12",
            "border-4",
            "border-gray-200",
            "border-t-blue-500",
            "rounded-full",
            "animate-spin",
        ];
        (_a = spanLoad.classList).add.apply(_a, classesSpanLoad);
        return spanLoad;
    };
    MenuSaneadora.prototype.openModal = function () {
        var _this = this;
        var _a, _b, _c;
        if (!this.modal)
            return;
        (_c = (_b = (_a = this.modal.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.classList.remove("hidden");
        this.clickOutside = new ClickOutside(this.modal, "data-outside", "click", function () {
            var _a, _b, _c, _d, _e;
            if (_this.contentLoad)
                _this.contentLoad.innerHTML = "";
            (_a = _this.contentLoad) === null || _a === void 0 ? void 0 : _a.appendChild(_this.createSpanLoad());
            if (_this.clickOutside)
                _this.clickOutside.removeEventClickOutside();
            (_e = (_d = (_c = (_b = _this.modal) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.classList.add("hidden");
            _this.clickOutside = null;
        });
        this.clickOutside.init();
        this.addEventCloseModalButton();
    };
    MenuSaneadora.prototype.addEventOpenModal = function () {
        var _a;
        (_a = this.buttonView) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.openModal);
    };
    MenuSaneadora.prototype.init = function () {
        if (this.buttonView)
            this.addEventOpenModal();
        return;
    };
    return MenuSaneadora;
}());
export default MenuSaneadora;
