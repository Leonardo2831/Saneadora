import ClickOutside from "../ClickOutside.js";
import {
    addEventMenuClickRight,
    removeEventMenuClickRight,
} from "../menuRight/eventMenuClickRight.js";
import verifyExistValueInput from "../inputs/verifyExistValueInput.js";

export default class AddPeopleEstremacao {
    modal: HTMLElement;

    inputName: HTMLInputElement;
    inputCPF: HTMLInputElement;
    inputNameConjuge: HTMLInputElement;
    inputCPFConjuge: HTMLInputElement;

    buttonsAddSelector: string;
    buttonsAdd: NodeListOf<HTMLButtonElement>;
    buttonNew: HTMLButtonElement;
    buttonCancelNew: HTMLButtonElement;

    clickOutsideEvent: ClickOutside;
    classActiveModal: string;

    eventItemAdd: HTMLElement | null;

    constructor(
        modal: string,
        inputName: string,
        inputCPF: string,
        inputNameConjuge: string,
        inputCPFConjuge: string,
        buttonNew: string,
        buttonCancelNew: string,
        buttonsAdd: string,
        classActiveModal?: string
    ) {
        this.modal = document.querySelector(modal) as HTMLElement;

        this.inputName = document.querySelector(inputName) as HTMLInputElement;
        this.inputCPF = document.querySelector(inputCPF) as HTMLInputElement;
        this.inputNameConjuge = document.querySelector(
            inputNameConjuge
        ) as HTMLInputElement;
        this.inputCPFConjuge = document.querySelector(
            inputCPFConjuge
        ) as HTMLInputElement;

        this.buttonsAddSelector = buttonsAdd;
        this.buttonsAdd = document.querySelectorAll(buttonsAdd);
        this.buttonNew = document.querySelector(buttonNew) as HTMLButtonElement;
        this.buttonCancelNew = document.querySelector(
            buttonCancelNew
        ) as HTMLButtonElement;

        this.classActiveModal = classActiveModal || "hidden";

        this.eventItemAdd = null;

        this.eventButtonAdd = this.eventButtonAdd.bind(this);
        this.eventNewPeople = this.eventNewPeople.bind(this); 
        this.changeStyleOutside = this.changeStyleOutside.bind(this);
        this.clickOutsideEvent = new ClickOutside(
            this.modal,
            "data-outside",
            "click",
            this.changeStyleOutside
        );
    }

    changeStyleOutside() {
        this.clickOutsideEvent.removeEventClickOutside();
        this.modal.parentElement?.parentElement?.parentElement?.classList.add(
            this.classActiveModal
        );
    }

    cleanInputs() {
        this.inputName.value = "";
        this.inputCPF.value = "";
        this.inputNameConjuge.value = "";
        this.inputCPFConjuge.value = "";
    }

    addNewPeople(): void {
        const rowContent = this.eventItemAdd?.parentElement
            ?.parentElement as HTMLElement;
        if (!rowContent) return;

        if (
            this.inputName.value === "" ||
            (this.inputCPF.value !== "" && this.inputCPF.value.length < 11) ||
            (this.inputCPFConjuge.value !== "" &&
                this.inputCPFConjuge.value.length < 11)
        ) {
            const inputs: HTMLInputElement[] = [
                this.inputName,
                this.inputCPF,
                this.inputNameConjuge,
                this.inputCPFConjuge,
            ];
            verifyExistValueInput(inputs);

            return;
        }

        const contentPeople = rowContent.querySelector(
            '[data-content="peopleEstremacao"]'
        ) as HTMLTableCellElement;
        const contentCpf = rowContent.querySelector(
            '[data-content="cpfEstremacao"]'
        ) as HTMLTableCellElement;
        const contentPeopleConjuge = rowContent.querySelector(
            '[data-content="peopleConjugeEstremacao"]'
        ) as HTMLTableCellElement;
        const contentCpfConjuge = rowContent.querySelector(
            '[data-content="cpfConjugeEstremacao"]'
        ) as HTMLTableCellElement;

        if (
            !contentPeople ||
            !contentCpf ||
            !contentPeopleConjuge ||
            !contentCpfConjuge
        )
            return;

        const newInputName: HTMLInputElement = document.createElement("input");
        const newInputCPF: HTMLInputElement = document.createElement("input");
        const newInputNameConjuge: HTMLInputElement =
            document.createElement("input");
        const newInputCPFConjuge: HTMLInputElement =
            document.createElement("input");

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
        newInputNameConjuge.setAttribute(
            "aria-label",
            this.inputNameConjuge.value
        );
        newInputCPFConjuge.setAttribute(
            "aria-label",
            this.inputCPFConjuge.value
        );

        // add in content
        contentPeople.appendChild(newInputName);
        contentCpf.appendChild(newInputCPF);
        contentPeopleConjuge.appendChild(newInputNameConjuge);
        contentCpfConjuge.appendChild(newInputCPFConjuge);

        this.cleanInputs();

        this.addOpenModal();

        removeEventMenuClickRight();
        addEventMenuClickRight();
    }

    addCancelPeople() {
        this.buttonCancelNew.addEventListener("click", this.changeStyleOutside);
    }

    eventNewPeople(event: Event) {
        event.stopPropagation();
        this.addNewPeople();

        this.changeStyleOutside();
    }

    openModal() {
        this.buttonNew.addEventListener("click", this.eventNewPeople);
        this.modal.removeAttribute(this.clickOutsideEvent.dataValue);
        this.modal.parentElement?.parentElement?.parentElement?.classList.remove(
            this.classActiveModal
        );
    }

    eventButtonAdd(event: Event) {
        event.stopPropagation();
        this.clickOutsideEvent.init();

        this.eventItemAdd = event.currentTarget as HTMLElement;

        this.openModal();
    }

    addOpenModal() {
        this.buttonsAdd = document.querySelectorAll(this.buttonsAddSelector);
        this.buttonsAdd.forEach((buttonAdd) => {
            buttonAdd.addEventListener("click", this.eventButtonAdd);
        });
    }

    init() {
        this.buttonsAdd = document.querySelectorAll(this.buttonsAddSelector);
        if (this.modal) this.addOpenModal();
        if (this.modal && this.buttonCancelNew) this.addCancelPeople();

        return this;
    }
}
