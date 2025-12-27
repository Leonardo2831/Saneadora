import Quill from "quill";
import contentText from "./contentText.js";
var NewText = /** @class */ (function () {
    function NewText(textFinalContent, modal, classAnimateModal, buttonClose, buttonOpen, buttonGenerateText, selectorQuill, optionsQuill) {
        this.textFinalContent = document.querySelector(textFinalContent);
        this.modal = document.querySelector(modal);
        this.classAnimateModal = classAnimateModal;
        this.buttonClose = document.querySelector(buttonClose);
        this.buttonOpen = document.querySelector(buttonOpen);
        this.buttonGenerateText = document.querySelector(buttonGenerateText);
        this.containerQuill = document.querySelector(selectorQuill);
        try {
            this.quill = new Quill(selectorQuill, optionsQuill);
        }
        catch (error) {
            console.log(error);
            if (this.containerQuill)
                this.containerQuill.innerHTML = "";
            var area = document.createElement("textarea");
            area.classList.add("w-full h-80 p-4 border border-gray-300 rounded-lg outline-none resize-none text-gray-700");
            area.placeholder = "Escreva o início da matrícula e sua origem.";
            if (this.containerQuill)
                this.containerQuill.appendChild(area);
            this.quill = area;
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.generateText = this.generateText.bind(this);
        var Font = Quill.import("formats/font");
        Font.whitelist = ["inter", "arial", "serif", "sans-serif", "monospace"];
        Quill.register(Font, true);
    }
    NewText.prototype.closeModal = function () {
        var _a;
        (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.remove(this.classAnimateModal);
    };
    NewText.prototype.generateText = function () {
        var textInitialMatricula = "";
        if (this.quill instanceof HTMLTextAreaElement) {
            textInitialMatricula = this.quill.value;
        }
        else if (this.quill instanceof Quill) {
            textInitialMatricula = this.quill.getText();
        }
        if (!this.textFinalContent)
            return;
        this.textFinalContent.innerHTML = contentText(textInitialMatricula);
        this.closeModal();
    };
    NewText.prototype.openModal = function () {
        var _a, _b;
        (_a = this.modal) === null || _a === void 0 ? void 0 : _a.classList.add(this.classAnimateModal);
        (_b = this.buttonGenerateText) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.generateText);
    };
    NewText.prototype.addEventsButtons = function () {
        var _a, _b;
        (_a = this.buttonOpen) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.openModal);
        (_b = this.buttonClose) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.closeModal);
    };
    NewText.prototype.init = function () {
        if (this.buttonOpen && this.buttonClose && this.modal)
            this.addEventsButtons();
        return this;
    };
    return NewText;
}());
export default NewText;
