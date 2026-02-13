import sumValue from "../sumValues.js";
import CreateNewValue from "../newValuesTable/CreateNewValue.js";
import Big from "big.js";

export default class RemoveValue {
    private eventClick: MouseEvent;
    private cellTableTarget: HTMLElement | null;
    private buttonRemoveValue: HTMLElement | null;
    private menuClickRight: HTMLElement;

    constructor(
        eventClick: MouseEvent,
        buttonRemoveValue: string,
        menuClickRight: HTMLElement,
    ) {
        this.eventClick = eventClick;
        this.buttonRemoveValue = document.querySelector(buttonRemoveValue);
        this.menuClickRight = menuClickRight;

        this.cellTableTarget = (this.eventClick.target as HTMLElement).closest(
            "[data-remove]",
        );

        this.removeValue = this.removeValue.bind(this);
    }

    removeEventButton() {
        this.buttonRemoveValue?.removeEventListener("click", this.removeValue);
    }

    calcPercentColumn(areaReal: string, areaTotal: Big) {
        const areaRealBig = new Big(areaReal.replace(",", "."));
        const percentTotal = areaTotal.times(100).div(areaRealBig);

        if (
            !this.cellTableTarget?.parentElement?.children[
                this.cellTableTarget.parentElement.children.length - 1
            ].children[1]
        )
            return;

        let formattedPercent = percentTotal.toFixed(10).replace(/\.?0+$/, "");
        if (formattedPercent === "" || formattedPercent === "-")
            formattedPercent = "0";
        formattedPercent = formattedPercent.replace(".", ",");

        this.cellTableTarget.parentElement.children[
            this.cellTableTarget.parentElement.children.length - 1
        ].children[1].setAttribute("data-full-value", percentTotal.toString());

        this.cellTableTarget.parentElement.children[
            this.cellTableTarget.parentElement.children.length - 1
        ].children[1].textContent = `${formattedPercent}%`;
    }

    calcAreaColumn(areaReal: string, unit: string) {
        if (!this.cellTableTarget?.parentElement) return;
        const childrensValues =
            this.cellTableTarget.parentElement.querySelectorAll(
                "[data-remove]",
            );

        if (!childrensValues.length) return;

        const areaTotal = Array.from(childrensValues).reduce((acc, child) => {
            if (child == this.cellTableTarget) return acc;

            const rawValue = child.getAttribute("data-remove") ?? "";
            const cleanValue = rawValue
                .replace(/m2|m²|ha|%|\s/g, "")
                .replace(",", ".");

            if (!cleanValue) return acc;

            return acc.plus(new Big(cleanValue));
        }, new Big(0));

        if (
            !this.cellTableTarget.parentElement.children[
                this.cellTableTarget.parentElement.children.length - 2
            ].children[1]
        )
            return;

        let formattedArea = areaTotal.toFixed(10).replace(/\.?0+$/, "");
        if (formattedArea === "" || formattedArea === "-") formattedArea = "0";
        formattedArea = formattedArea.replace(".", ",");

        this.cellTableTarget.parentElement.children[
            this.cellTableTarget.parentElement.children.length - 2
        ].children[1].setAttribute("data-full-value", areaTotal.toString());

        this.cellTableTarget.parentElement.children[
            this.cellTableTarget.parentElement.children.length - 2
        ].children[1].textContent = `${formattedArea}${unit}`;

        this.calcPercentColumn(areaReal, areaTotal);
    }

    cloneButtonAdd() {
        const buttonAdd = this.cellTableTarget?.querySelector(
            '[data-button="add"]',
        );

        if (
            buttonAdd &&
            this.cellTableTarget?.parentElement?.children.length !== 8
        ) {
            const cloneButtonAdd = buttonAdd.cloneNode(
                true,
            ) as HTMLButtonElement;
            CreateNewValue.instance.addEventInButton(cloneButtonAdd);
            this.cellTableTarget?.previousElementSibling?.appendChild(
                cloneButtonAdd,
            );
        }
    }

    removeValue() {
        this.menuClickRight.classList.remove("show");

        const valueCell = this.cellTableTarget?.getAttribute("data-remove");

        if (!valueCell) return;

        const areaMatricula = document.querySelector(
            '[data-real="area"]',
        ) as HTMLSpanElement;

        const [areaReal, unitReal]: string[] =
            areaMatricula.textContent?.match(
                /([0-9]+[.,]?[0-9]*)+|m2|m²|ha|%|-|\+/g,
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
