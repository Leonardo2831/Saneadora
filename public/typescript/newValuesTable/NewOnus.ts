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

    addEventChangeActive() : void{
        const atoCancel = document.querySelector(
            '[data-ato="cancel"]'
        ) as HTMLDivElement;

        if (!atoCancel) return;

        let activeOnus = atoCancel.classList.contains("table-value-red") ? false : true ;

        atoCancel.onclick = () => {
            activeOnus = !activeOnus;

            const toggleActive = activeOnus ? "red" : "green";
            const inverseToggleActive = !activeOnus ? "red" : "green";

            atoCancel.classList.replace(
                `table-value-${toggleActive}`,
                `table-value-${inverseToggleActive}`
            );

            atoCancel.textContent = activeOnus ? "Cancelado" : "Ativo";
        };
    }

    createRow(): HTMLTableRowElement | null {
        if (
            this.inputName.value == "" ||
            (this.inputCpf.value.length < 11 && this.inputCpf.value !== "") ||
            this.inputAto.value == ""
        ) {
            const inputs: HTMLInputElement[] = [
                this.inputName,
                this.inputCpf,
                this.inputAto,
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
                this.inputName.value
            }">
                <input
                    type="text"
                    class="table-input"
                    value="${this.inputName.value}"
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
        this.addEventChangeActive();

        this.inputName.value = "";
        this.inputCpf.value = "";
        this.inputAto.value = "";

        removeEventMenuClickRight();
        addEventMenuClickRight();
    }

    addEventButtonAdd() {
        this.buttonAdd.addEventListener("click", this.addRow);
    }

    init() {
        if (this.buttonAdd) this.addEventButtonAdd();
        this.addEventChangeActive();

        return this;
    }
}
