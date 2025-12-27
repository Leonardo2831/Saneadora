import verifyExistValueInput from "../inputs/verifyExistValueInput.js";
import {
    addEventMenuClickRight,
    removeEventMenuClickRight,
} from "../menuRight/eventMenuClickRight.js";

export default class NewNumber {
    private selectorTable: string;
    private tableContent: HTMLElement;

    private inputNumber: HTMLInputElement;
    private inputCpf: HTMLInputElement;
    private selectType: HTMLSelectElement;
    private inputAto: HTMLInputElement;

    private buttonAdd: HTMLButtonElement;

    constructor(
        tableContent: string,
        inputNumber: string,
        inputCpf: string,
        selectType: string,
        inputAto: string,
        buttonAdd: string
    ) {
        this.selectorTable = tableContent;
        this.tableContent = document.querySelector(tableContent) as HTMLElement;

        this.inputNumber = document.querySelector(
            inputNumber
        ) as HTMLInputElement;
        this.inputCpf = document.querySelector(inputCpf) as HTMLInputElement;
        this.selectType = document.querySelector(
            selectType
        ) as HTMLSelectElement;
        this.inputAto = document.querySelector(inputAto) as HTMLInputElement;

        this.buttonAdd = document.querySelector(buttonAdd) as HTMLButtonElement;

        this.addRow = this.addRow.bind(this);
        this.createRow = this.createRow.bind(this);
    }

    cleanInputs() {
        this.inputNumber.value = "";
        this.inputCpf.value = "";
        this.inputAto.value = "";
    }

    createRow(): HTMLTableRowElement | null {
        const row = document.createElement("tr");
        const classRow = ["bg-gray-50", "border-t", "border-gray-200"];
        row.classList.add(...classRow);
        row.setAttribute("data-menu", "");
        row.setAttribute(
            "aria-label",
            `${this.inputNumber.value}, ${this.inputCpf.value}, ${this.selectType.value}, ${this.inputAto.value}`
        );

        if (
            this.inputNumber.value == "" ||
            (this.inputCpf.value.length < 11 && this.inputCpf.value !== "") ||
            this.inputAto.value == ""
        ) {
            const inputs: HTMLInputElement[] = [
                this.inputNumber,
                this.inputCpf,
                this.inputAto,
            ];
            verifyExistValueInput(inputs);

            return null;
        }

        let [typeAto, valueAto]: string[] =
            this.inputAto.value.match(/\d+|[a-zA-Z]+/g) || [];
        if (!valueAto && /^\d+$/.test(typeAto)) {
            valueAto = typeAto;
            typeAto = "R";
        }

        const rowContent: string = `
            <td
                class="px-4 py-4 text-base font-medium text-gray-600"
            >
                ${typeAto}.${valueAto}
            </td>
            <td class="px-4 py-4 relative" data-menu aria-label="${
                this.inputNumber.value
            }">
                <input
                    type="text"
                    class="table-input"
                    value="${this.inputNumber.value}"
                />
            </td>
            <td class="px-4 py-4 relative" data-menu aria-label="${
                this.inputCpf.value
            }">
                <input
                    type="text"
                    class="table-input"
                    data-input="cpf"
                    value="${
                        this.inputCpf.value == ""
                            ? "Não Consta"
                            : this.inputCpf.value
                    }"
                />
            </td>
            <td class="px-4 py-4 relative" data-menu aria-label="${
                this.selectType.value
            }">
                <input
                    type="text"
                    class="table-input"
                    value="${this.selectType.value}"
                />
            </td>
        `;

        row.innerHTML = rowContent;

        return row;
    }

    addRow() {
        this.tableContent = document.querySelector(
            this.selectorTable
        ) as HTMLElement;

        const row: HTMLTableRowElement | null = this.createRow();
        if (!row) return;

        this.tableContent.appendChild(row);

        this.cleanInputs();

        removeEventMenuClickRight();
        addEventMenuClickRight();
    }

    addEventButtonAdd() {
        this.buttonAdd.addEventListener("click", this.addRow);
    }

    addEventInputNumber() {
        this.inputNumber.addEventListener("input", () => {
            this.inputNumber.value = this.inputNumber.value.replace(
                /[^0-9.-]/g,
                ""
            );
        });
    }

    init() {
        if (this.buttonAdd) this.addEventButtonAdd();
        if (this.inputNumber) this.addEventInputNumber();

        return this;
    }
}
