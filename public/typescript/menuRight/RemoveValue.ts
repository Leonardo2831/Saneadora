import sumValue from "../sumValues.js";
import CreateNewValue from "../newValuesTable/CreateNewValue.js";

export default class RemoveValue {
    private eventClick: MouseEvent;
    private cellTableTarget: HTMLElement | null;
    private buttonRemoveValue: HTMLElement | null;
    private menuClickRight: HTMLElement;

    constructor(
        eventClick: MouseEvent,
        buttonRemoveValue: string,
        menuClickRight: HTMLElement
    ) {
        this.eventClick = eventClick;
        this.buttonRemoveValue = document.querySelector(buttonRemoveValue);
        this.menuClickRight = menuClickRight;

        this.cellTableTarget = (this.eventClick.target as HTMLElement).closest(
            "[data-remove]"
        );

        this.removeValue = this.removeValue.bind(this);
    }

    removeEventButton() {
        this.buttonRemoveValue?.removeEventListener("click", this.removeValue);
    }

    calcPercentColumn(areaReal: string, areaTotal: number) {
        const percentTotal =
            (areaTotal * 100) / Number(areaReal.replace(",", "."));

        if (
            !this.cellTableTarget?.parentElement?.children[
                this.cellTableTarget.parentElement.children.length - 1
            ].children[1]
        )
            return;

        this.cellTableTarget.parentElement.children[
            this.cellTableTarget.parentElement.children.length - 1
        ].children[1].textContent = `${percentTotal}%`;
    }

    calcAreaColumn(areaReal: string, unit: string) {
        if (!this.cellTableTarget?.parentElement) return;
        const childrensValues =
            this.cellTableTarget.parentElement.querySelectorAll(
                "[data-remove]"
            );

        if (!childrensValues.length) return;

        const areaTotal = Array.from(childrensValues).reduce((acc, child) => {
            if (child == this.cellTableTarget) return acc;

            const rawValue = child.getAttribute("data-remove") ?? "";
            const cleanValue = rawValue
                .replace(/m2|m²|ha|%|\s/g, "")
                .replace(",", ".");
            return acc + Number(cleanValue);
        }, 0);

        if (
            !this.cellTableTarget.parentElement.children[
                this.cellTableTarget.parentElement.children.length - 2
            ].children[1]
        )
            return;

        this.cellTableTarget.parentElement.children[
            this.cellTableTarget.parentElement.children.length - 2
        ].children[1].textContent = `${areaTotal}${unit}`;

        this.calcPercentColumn(areaReal, areaTotal);
    }

    cloneButtonAdd() {
        const buttonAdd = this.cellTableTarget?.querySelector(
            '[data-button="add"]'
        );

        if (
            buttonAdd &&
            this.cellTableTarget?.parentElement?.children.length !== 8
        ) {
            const cloneButtonAdd = buttonAdd.cloneNode(
                true
            ) as HTMLButtonElement;
            CreateNewValue.instance.addEventInButton(cloneButtonAdd);
            this.cellTableTarget?.previousElementSibling?.appendChild(
                cloneButtonAdd
            );
        }
    }

    removeValue() {
        this.menuClickRight.classList.remove("show");

        const valueCell = this.cellTableTarget?.getAttribute("data-remove");

        if (!valueCell) return;

        const areaMatricula = document.querySelector(
            '[data-real="area"]'
        ) as HTMLSpanElement;

        const [areaReal, unitReal]: string[] =
            areaMatricula.textContent?.match(
                /([0-9]+[.,]?[0-9]*)+|m2|m²|ha|%|-|\+/g
            ) || [];

        this.calcAreaColumn(areaReal, unitReal);

        const [, unit]: string[] =
            valueCell.match(/([0-9]+[.,]?[0-9]*)+|m2|m²|ha|%|-|\+/g) || [];
        // calculando a área
        sumValue('[data-area="total"]', '[data-sum="area"]', unit);
        // calculando porcentagem
        sumValue('[data-area="percent"]', '[data-sum="percent"]', "%");

        this.cloneButtonAdd();

        if (this.cellTableTarget?.parentElement?.children.length === 8) {
            this.cellTableTarget?.parentElement?.remove();
        } else {
            this.cellTableTarget?.remove();
        }

        this.removeEventButton();
    }

    addEventButton() {
        this.buttonRemoveValue?.addEventListener("click", this.removeValue);
    }

    init() {
        if (this.buttonRemoveValue && this.menuClickRight)
            this.addEventButton();

        return this;
    }
}
