import ClickOutside from "../ClickOutside.js";
import { addEventMenuClickRight, removeEventMenuClickRight, } from "../menuRight/eventMenuClickRight.js";
import verifyExistValueInput from "../inputs/verifyExistValueInput.js";
var AddPeopleEstremacao = /** @class */ (function () {
    function AddPeopleEstremacao(modal, inputName, inputCPF, inputNameConjuge, inputCPFConjuge, buttonNew, buttonCancelNew, buttonsAdd, classActiveModal) {
        this.modal = document.querySelector(modal);
        this.inputName = document.querySelector(inputName);
        this.inputCPF = document.querySelector(inputCPF);
        this.inputNameConjuge = document.querySelector(inputNameConjuge);
        this.inputCPFConjuge = document.querySelector(inputCPFConjuge);
        this.buttonsAddSelector = buttonsAdd;
        this.buttonsAdd = document.querySelectorAll(buttonsAdd);
        this.buttonNew = document.querySelector(buttonNew);
        this.buttonCancelNew = document.querySelector(buttonCancelNew);
        this.classActiveModal = classActiveModal || "hidden";
        this.eventItemAdd = null;
        this.eventButtonAdd = this.eventButtonAdd.bind(this);
        this.eventNewPeople = this.eventNewPeople.bind(this);
        this.changeStyleOutside = this.changeStyleOutside.bind(this);
        this.clickOutsideEvent = new ClickOutside(this.modal, "data-outside", "click", this.changeStyleOutside);
    }
    AddPeopleEstremacao.prototype.changeStyleOutside = function () {
        var _a, _b, _c;
        this.clickOutsideEvent.removeEventClickOutside();
        (_c = (_b = (_a = this.modal.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.classList.add(this.classActiveModal);
    };
    AddPeopleEstremacao.prototype.cleanInputs = function () {
        this.inputName.value = "";
        this.inputCPF.value = "";
        this.inputNameConjuge.value = "";
        this.inputCPFConjuge.value = "";
    };
    AddPeopleEstremacao.prototype.addNewPeople = function () {
        var _a, _b;
        var rowContent = (_b = (_a = this.eventItemAdd) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        if (!rowContent)
            return;
        if (this.inputName.value === "" ||
            (this.inputCPF.value !== "" && this.inputCPF.value.length < 11) ||
            (this.inputCPFConjuge.value !== "" &&
                this.inputCPFConjuge.value.length < 11)) {
            var inputs = [
                this.inputName,
                this.inputCPF,
                this.inputNameConjuge,
                this.inputCPFConjuge,
            ];
            verifyExistValueInput(inputs);
            return;
        }
        var contentPeople = rowContent.querySelector('[data-content="peopleEstremacao"]');
        var contentCpf = rowContent.querySelector('[data-content="cpfEstremacao"]');
        var contentPeopleConjuge = rowContent.querySelector('[data-content="peopleConjugeEstremacao"]');
        var contentCpfConjuge = rowContent.querySelector('[data-content="cpfConjugeEstremacao"]');
        if (!contentPeople ||
            !contentCpf ||
            !contentPeopleConjuge ||
            !contentCpfConjuge)
            return;
        var newInputName = document.createElement("input");
        var newInputCPF = document.createElement("input");
        var newInputNameConjuge = document.createElement("input");
        var newInputCPFConjuge = document.createElement("input");
        // add class in inputs
        newInputName.classList.add("table-input", "relative");
        newInputCPF.classList.add("table-input", "relative");
        newInputNameConjuge.classList.add("table-input", "relative");
        newInputCPFConjuge.classList.add("table-input", "relative");
        // add dataset data-menu
        newInputName.setAttribute("data-menu", "");
        newInputCPF.setAttribute("data-menu", "");
        newInputNameConjuge.setAttribute("data-menu", "");
        newInputCPFConjuge.setAttribute("data-menu", "");
        // add dataset data-input
        newInputCPF.setAttribute("data-input", "cpf");
        newInputCPFConjuge.setAttribute("data-input", "cpf");
        // add type
        newInputName.type = "text";
        newInputCPF.type = "text";
        newInputNameConjuge.type = "text";
        newInputCPFConjuge.type = "text";
        // add value
        newInputName.value = this.inputName.value;
        newInputCPF.value =
            this.inputCPF.value == "" ? "Não Consta" : this.inputCPF.value;
        newInputNameConjuge.value =
            this.inputNameConjuge.value == ""
                ? "Não Consta"
                : this.inputNameConjuge.value;
        newInputCPFConjuge.value =
            this.inputCPFConjuge.value == ""
                ? "Não Consta"
                : this.inputCPFConjuge.value;
        newInputName.setAttribute("aria-label", this.inputName.value);
        newInputCPF.setAttribute("aria-label", this.inputCPF.value);
        newInputNameConjuge.setAttribute("aria-label", this.inputNameConjuge.value);
        newInputCPFConjuge.setAttribute("aria-label", this.inputCPFConjuge.value);
        // add in content
        contentPeople.appendChild(newInputName);
        contentCpf.appendChild(newInputCPF);
        contentPeopleConjuge.appendChild(newInputNameConjuge);
        contentCpfConjuge.appendChild(newInputCPFConjuge);
        this.cleanInputs();
        this.addOpenModal();
        removeEventMenuClickRight();
        addEventMenuClickRight();
    };
    AddPeopleEstremacao.prototype.addCancelPeople = function () {
        this.buttonCancelNew.addEventListener("click", this.changeStyleOutside);
    };
    AddPeopleEstremacao.prototype.eventNewPeople = function (event) {
        event.stopPropagation();
        this.addNewPeople();
        this.changeStyleOutside();
    };
    AddPeopleEstremacao.prototype.openModal = function () {
        var _a, _b, _c;
        this.buttonNew.addEventListener("click", this.eventNewPeople);
        this.modal.removeAttribute(this.clickOutsideEvent.dataValue);
        (_c = (_b = (_a = this.modal.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.classList.remove(this.classActiveModal);
    };
    AddPeopleEstremacao.prototype.eventButtonAdd = function (event) {
        event.stopPropagation();
        this.clickOutsideEvent.init();
        this.eventItemAdd = event.currentTarget;
        this.openModal();
    };
    AddPeopleEstremacao.prototype.addOpenModal = function () {
        var _this = this;
        this.buttonsAdd = document.querySelectorAll(this.buttonsAddSelector);
        this.buttonsAdd.forEach(function (buttonAdd) {
            buttonAdd.addEventListener("click", _this.eventButtonAdd);
        });
    };
    AddPeopleEstremacao.prototype.init = function () {
        this.buttonsAdd = document.querySelectorAll(this.buttonsAddSelector);
        if (this.modal)
            this.addOpenModal();
        if (this.modal && this.buttonCancelNew)
            this.addCancelPeople();
        return this;
    };
    return AddPeopleEstremacao;
}());
export default AddPeopleEstremacao;
