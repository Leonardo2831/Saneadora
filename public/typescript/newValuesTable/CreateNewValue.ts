import ClickOutside from "../ClickOutside.js";
import { calcNewArea, calcNewPercent } from "../calcValues.js";
import {
    addEventMenuClickRight,
    removeEventMenuClickRight,
} from "../menuRight/eventMenuClickRight.js";
import eventRadioInput from "../inputs/eventRadioInput.js";
import sumValue from "../sumValues.js";

export default class CreateNewValue {
    private buttonsAddSelector: string;
    private buttonsAdd: NodeListOf<HTMLButtonElement>;

    private modalNewValue: HTMLElement;
    private contentPercentBase: HTMLElement;

    private buttonNewValue: HTMLButtonElement;
    private buttonNewCancel: HTMLButtonElement;

    private clickOutsideEvent: ClickOutside;
    private classActiveModal: string;
    private classBaseCalc: string;

    private eventItemAdd: HTMLElement | null;

    constructor(
        buttonsAdd: string,
        modalNewValue: string,
        buttonNewValue: string,
        buttonNewCancel: string,
        contentPercentBase: string,
        classBaseCalc: string,
        classActiveModal?: string
    ) {
        this.buttonsAddSelector = buttonsAdd;

        this.buttonsAdd = document.querySelectorAll(buttonsAdd);
        this.buttonNewValue = document.querySelector(
            buttonNewValue
        ) as HTMLButtonElement;
        this.buttonNewCancel = document.querySelector(
            buttonNewCancel
        ) as HTMLButtonElement;

        this.modalNewValue = document.querySelector(
            modalNewValue
        ) as HTMLElement;
        this.contentPercentBase = document.querySelector(
            contentPercentBase
        ) as HTMLElement;

        this.classActiveModal = classActiveModal || "hidden";
        this.classBaseCalc = classBaseCalc;

        this.eventItemAdd = null;
        this.changeStyleOutside = this.changeStyleOutside.bind(this);
        this.clickOutsideEvent = new ClickOutside(
            this.modalNewValue,
            "data-outside",
            "click",
            this.changeStyleOutside
        );
    }

    changeStyleOutside() {
        this.clickOutsideEvent.removeEventClickOutside();
        this.modalNewValue.parentElement?.parentElement?.parentElement?.classList.add(
            this.classActiveModal
        );
    }

    addCancel() {
        this.buttonNewCancel.addEventListener("click", () => {
            this.changeStyleOutside();
        });
    }

    createInputNewValue(
        divValue: HTMLDivElement,
        cloneButton: Node,
        color: "limon" | "red",
        valueInput: string
    ) {
        const inputNewValue: HTMLInputElement = document.createElement("input");
        inputNewValue.type = "text";
        inputNewValue.name = "ato-value";

        const classInput: string[] = ["table-value", `table-value-${color}`];

        inputNewValue.classList.add(...classInput);

        inputNewValue.value = valueInput;

        inputNewValue.setAttribute("aria-label", valueInput);

        divValue.appendChild(inputNewValue);
        divValue.appendChild(cloneButton);

        console.log(inputNewValue, inputNewValue.value);
    }

    addNewValueInTable(): void {
        const col = this.eventItemAdd?.parentElement
            ?.parentElement as HTMLDivElement;
        const cloneButton: Node | null | undefined =
            this.eventItemAdd?.cloneNode(true);

        this.eventItemAdd?.remove();

        if (!col || !cloneButton) {
            return;
        }

        const inputAto: HTMLInputElement | null =
            this.modalNewValue.querySelector('[data-input="newAto"]');
        const inputValue: HTMLInputElement | null =
            this.modalNewValue.querySelector('[data-input="newValue"]');

        const inputsRadio: NodeListOf<HTMLInputElement> =
            this.modalNewValue.querySelectorAll('input[type="radio"]');
        const inputRadioChecked = Array.from(inputsRadio).find(
            (input) => input.checked
        ) as HTMLInputElement;

        if (!inputValue || !inputRadioChecked) {
            return;
        }

        const valueWithUnit: string =
            inputValue.value.replace(".", ",") + inputRadioChecked.value;

        let colorInput: "limon" | "red" = "limon";

        if (Number(inputValue.value) < 0) {
            colorInput = "red";
        } else if (Number(inputValue.value) > 0) {
            colorInput = "limon";
        }

        const divCell = document.createElement("div");
        const classDivCell: string[] = ["min-h-[100px]", "relative"];
        divCell.classList.add(...classDivCell);
        divCell.setAttribute("data-menu", "");
        divCell.setAttribute(
            "aria-label",
            inputValue.value.replace(/m²|m2|ha|%|-|\+/g, "")
        );

        const insertLocal = col.children[
            col.children.length - 2
        ] as HTMLElement;

        // td ato
        const pAto: HTMLParagraphElement = document.createElement("p");
        const classPAto: string[] = [
            "text-center",
            "text-xs",
            "font-medium",
            "text-gray-600",
            "uppercase",
            "mb-1.5",
        ];
        pAto.classList.add(...classPAto);
        pAto.textContent = `Área: ${inputAto?.value}`;

        divCell.appendChild(pAto);

        // input valor
        this.createInputNewValue(
            divCell,
            cloneButton,
            colorInput,
            valueWithUnit
        );
        this.changeStyleOutside();

        const areaMatricula = document.querySelector(
            '[data-real="area"]'
        ) as HTMLSpanElement;

        const [areaReal, unitArea]: string[] =
            areaMatricula.textContent?.match(
                /([0-9]+[.,]?[0-9]*)+|m2|m²|ha|%|-|\+/g
            ) || [];

        if (!unitArea) return;

        calcNewArea(
            insertLocal,
            inputValue.value,
            inputRadioChecked.value,
            divCell.children[1] as HTMLInputElement
        );
        calcNewPercent(
            Number(areaReal.replace(",", ".")),
            '[data-area="percent"]'
        );

        col.insertBefore(divCell, insertLocal);
        // calculando a área
        sumValue('[data-area="total"]', '[data-sum="area"]', unitArea);
        // calculando porcentagem
        sumValue('[data-area="percent"]', '[data-sum="percent"]', "%");

        this.addOpenModal();
        removeEventMenuClickRight();
        addEventMenuClickRight();
    }

    addEventNewValue() {
        this.buttonNewValue.addEventListener("click", (event: Event) => {
            event.stopPropagation();
            this.addNewValueInTable();
        });
    }

    openModal() {
        this.addEventNewValue();
        this.modalNewValue.removeAttribute(this.clickOutsideEvent.dataValue);
        this.modalNewValue.parentElement?.parentElement?.parentElement?.classList.remove(
            this.classActiveModal
        );
    }

    addEventInButton(buttonAdd: HTMLButtonElement) {
        buttonAdd.addEventListener("click", (event: Event) => {
            event.stopPropagation();
            this.clickOutsideEvent.init();

            this.eventItemAdd = event.currentTarget as HTMLElement;
            this.openModal();
        });
    }

    addOpenModal() {
        this.buttonsAdd = document.querySelectorAll(this.buttonsAddSelector);

        this.buttonsAdd.forEach((buttonAdd) => {
            this.addEventInButton(buttonAdd);
        });
    }

    init() {
        if (this.modalNewValue && this.classBaseCalc && this.contentPercentBase)
            eventRadioInput(
                this.modalNewValue,
                this.classBaseCalc,
                this.contentPercentBase
            );
        if (this.buttonNewValue && this.modalNewValue) this.addOpenModal();
        if (this.buttonNewCancel && this.modalNewValue) this.addCancel();

        return this;
    }
}
