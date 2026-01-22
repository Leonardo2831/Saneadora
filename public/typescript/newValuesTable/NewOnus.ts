import verifyExistValueInput from "../inputs/verifyExistValueInput.js";
import {
    addEventMenuClickRight,
    removeEventMenuClickRight,
} from "../menuRight/eventMenuClickRight.js";

export default class NewOnus {
    private selectorTable: string;
    private tableContent: HTMLElement;

    private inputCpf: HTMLInputElement;
    private inputName: HTMLInputElement;
    private selectType: HTMLSelectElement;
    private inputAto: HTMLInputElement;

    private buttonAdd: HTMLButtonElement;

    constructor(
        tableContent: string,
        inputName: string,
        inputCpf: string,
        selectType: string,
        inputAto: string,
        buttonAdd: string
    ) {
        this.selectorTable = tableContent;
        this.tableContent = document.querySelector(tableContent) as HTMLElement;

        this.inputCpf = document.querySelector(inputCpf) as HTMLInputElement;
        this.inputName = document.querySelector(inputName) as HTMLInputElement;
        this.selectType = document.querySelector(
            selectType
        ) as HTMLSelectElement;
        this.inputAto = document.querySelector(inputAto) as HTMLInputElement;

        this.buttonAdd = document.querySelector(buttonAdd) as HTMLButtonElement;

        this.createRow = this.createRow.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    createRow(): HTMLTableRowElement | null {
        if (
            this.inputAto.value == "" || (this.inputCpf.value.length > 0 && this.inputCpf.value.length < 11)
        ) {
            const inputs: HTMLInputElement[] = [
                this.inputAto,
                this.inputCpf,
            ];
            
            verifyExistValueInput(inputs);

            return null;
        }

        const row = document.createElement("tr");
        const classRow: string[] = [
            "bg-gray-50",
            "border-t",
            "border-gray-200",
        ];
        row.classList.add(...classRow);

        let [typeAto, valueAto]: string[] =
            this.inputAto.value.match(/\d+|[a-zA-Z\u00C0-\u00FF]+/g) || [];
        if (!valueAto && /^\d+$/.test(typeAto)) {
            valueAto = typeAto;
            typeAto = "R";
        }

        const rowContent: string = `
            <td
                class="px-4 py-4 text-base font-medium text-gray-600"
            >
                ${typeAto}${valueAto ? "." + valueAto : ""}
            </td>
            <td class="px-4 py-4 relative" data-menu aria-label="${
                this.inputName.value || "Não Definido"
            }">
                <input
                    type="text"
                    class="table-input"
                    value="${this.inputName.value || "Não Definido"}"
                />
            </td>
            <td class="px-4 py-4 relative" data-menu aria-label="${
                this.inputCpf.value == "" ? "Não Consta" : this.inputCpf.value
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
            <td class="px-4 py-4 relative">
                <div
                    class="table-value-red table-value font-bold cursor-pointer"
                    data-ato="cancel"
                >
                    Ativo
                </div>
            </td>
            <td class="px-4 py-4 relative">
                <div
                    class="table-value-gray table-value font-bold"
                    contenteditable="true"
                >
                    Não cancelado
                </div>
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

        this.inputName.value = "";
        this.inputCpf.value = "";
        this.inputAto.value = "";

        removeEventMenuClickRight();
        addEventMenuClickRight();
    }

    removeEventButtonAdd() {
        this.buttonAdd.onclick = null;
    }

    addEventButtonAdd() {
        this.buttonAdd.onclick = this.addRow;
    }

    init() {
        if (this.buttonAdd) {
            this.removeEventButtonAdd();
            this.addEventButtonAdd();
        }

        return this;
    }
}
