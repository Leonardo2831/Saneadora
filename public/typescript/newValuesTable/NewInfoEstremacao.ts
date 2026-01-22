import {
    addEventMenuClickRight,
    removeEventMenuClickRight,
} from "../menuRight/eventMenuClickRight.js";
import type AddPeopleEstremacao from "./AddPeopleEstremacao.js";
import verifyExistValueInput from "../inputs/verifyExistValueInput.js";
import addNewEstremacao from "./NewEstremacao.js";

export default class NewInfoEstremacao {
    inputName: HTMLInputElement;
    inputCPF: HTMLInputElement;
    inputConjugeName: HTMLInputElement;
    inputConjugeCPF: HTMLInputElement;
    inputAto: HTMLInputElement;
    inputArea: HTMLInputElement;
    inputMatricula: HTMLInputElement;

    selectType: HTMLSelectElement;

    buttonAdd: HTMLButtonElement;

    formContent: HTMLElement;
    tableContent: HTMLElement;

    objectNewPeople: AddPeopleEstremacao;

    constructor(
        inputName: string,
        inputCPF: string,
        selectType: string,
        inputConjugeName: string,
        inputConjugeCPF: string,
        inputAto: string,
        inputArea: string,
        inputMatricula: string,
        buttonAdd: string,
        formContent: string,
        tableContent: string,
        objectNewPeople: AddPeopleEstremacao
    ) {
        this.inputName = document.querySelector(inputName) as HTMLInputElement;
        this.inputCPF = document.querySelector(inputCPF) as HTMLInputElement;
        this.inputConjugeName = document.querySelector(
            inputConjugeName
        ) as HTMLInputElement;
        this.inputConjugeCPF = document.querySelector(
            inputConjugeCPF
        ) as HTMLInputElement;
        this.inputAto = document.querySelector(inputAto) as HTMLInputElement;
        this.inputArea = document.querySelector(inputArea) as HTMLInputElement;
        this.inputMatricula = document.querySelector(
            inputMatricula
        ) as HTMLInputElement;

        this.selectType = document.querySelector(
            selectType
        ) as HTMLSelectElement;

        this.buttonAdd = document.querySelector(buttonAdd) as HTMLButtonElement;

        this.formContent = document.querySelector(formContent) as HTMLElement;
        this.tableContent = document.querySelector(tableContent) as HTMLElement;

        this.objectNewPeople = objectNewPeople;

        this.addRowInfoEstremacao = this.addRowInfoEstremacao.bind(this);
    }

    cleanInputs() {
        this.inputName.value = "";
        this.inputCPF.value = "";
        this.inputConjugeName.value = "";
        this.inputConjugeCPF.value = "";
        this.inputAto.value = "";
        this.inputArea.value = "";
        this.inputMatricula.value = "";
    }

    createRowInfoEstremacao(): HTMLElement | null {
        if (
            this.inputName.value === "" ||
            this.inputAto.value === "" ||
            this.inputArea.value === "" ||
            (this.inputCPF.value !== "" &&
                this.inputCPF.value.length < 11) ||
            (this.inputConjugeCPF.value !== "" &&
                this.inputConjugeCPF.value.length < 11 &&
                this.inputConjugeCPF.value !== "Viúvo(a)")
        ) {
            const inputs: HTMLInputElement[] = [
                this.inputName,
                this.inputAto,
                this.inputArea,
                this.inputCPF,
                this.inputConjugeCPF,
            ];
            verifyExistValueInput(inputs);

            return null;
        }

        const rowInfo = document.createElement("tr");
        const classListRowInfo: string[] = [
            "bg-gray-50",
            "border-t",
            "border-gray-200",
        ];
        rowInfo.classList.add(...classListRowInfo);

        let [typeAto, valueAto]: string[] =
            this.inputAto.value.match(/\d+|[a-zA-Z\u00C0-\u00FF]+/g) || [];
        if (!valueAto && /^\d+$/.test(typeAto)) {
            valueAto = typeAto;
            typeAto = "R";
        }

        const areaContent: HTMLTableCellElement | null =
            document.querySelector('[data-real="area"]');

        const [, unitArea]: string[] =
            areaContent?.textContent?.match(/\d+|[a-zA-Z]+/g) || [];

        const contentRowInfo = `
            <td
                class="px-4 py-4 relative text-base font-medium text-gray-600"
            >
                ${typeAto}${valueAto ? "." + valueAto : ""}
            </td>

            <td
                class="px-4 py-4 relative"
                data-content="peopleEstremacao"
                data-menu
                aria-label="${this.inputName.value}"
            >
                <input
                    type="text"
                    class="table-input"
                    value="${this.inputName.value}"
                />
            </td>
            <td
                class="px-4 py-4 relative"
                data-content="cpfEstremacao"
                data-menu
                aria-label="${this.inputCPF.value || "Não Consta"}"
            >
                <input
                    type="text"
                    class="table-input"
                    data-input="cpf"
                    value="${this.inputCPF.value || "Não Consta"}"
                />
            </td>
            <td
                class="px-4 py-4 relative"
                data-content="peopleConjugeEstremacao"
                data-menu
                aria-label="${this.inputConjugeName.value || "Não Consta"}"
            >
                <input
                    type="text"
                    class="table-input relative"
                    value="${this.inputConjugeName.value || "Não Consta"}"
                />
            </td>
            <td
                class="px-4 py-4 relative"
                data-content="cpfConjugeEstremacao"
                data-menu
                aria-label="${this.inputConjugeCPF.value || "Não Consta"}"
            >
                <input
                    type="text"
                    class="table-input"
                    data-input="cpf"
                    value="${this.inputConjugeCPF.value || "Não Consta"}"
                />
            </td>
            <td class="px-4 py-4 relative" data-menu aria-label="${
                this.inputArea.value
            }">
                <input
                    type="text"
                    class="table-input"
                    value="${this.inputArea.value}${unitArea}"
                />
            </td>
            <td class="px-4 py-4 relative" data-menu aria-label="${
                this.inputMatricula.value
            }">
                <input
                    type="text"
                    class="table-input"
                    value="${this.inputMatricula.value}"
                />
                <button
                    data-button="addPeopleEstremacao"
                    class="absolute bottom-4 right-4 w-fit text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 transition-colors flex items-center p-1"
                >
                    <img
                        class="w-4 h-4"
                        src="public/images/icons/plus-white.svg"
                        alt="Adicionar Pessoa"
                    />
                </button>
            </td>
        `;

        rowInfo.innerHTML = contentRowInfo;

        return rowInfo;
    }

    addRowInfoEstremacao(): void {
        const rowInfo = this.createRowInfoEstremacao();
        if (!rowInfo) return;

        console.log(this.tableContent);

        this.tableContent.appendChild(rowInfo);

        this.objectNewPeople.addOpenModal();
        addNewEstremacao('[data-tableInfos="cadastro"]', this.inputArea.value);

        this.cleanInputs();

        removeEventMenuClickRight();
        addEventMenuClickRight();
    }

    removeEventButtonAdd() {
        this.buttonAdd.onclick = null;
    }

    addEventButtonAdd() {
        this.buttonAdd.onclick = this.addRowInfoEstremacao;
    }

    addEventSelect() {
        this.selectType.addEventListener("change", () => {
            if (this.selectType.value !== "Casado(a)") {
                this.inputConjugeName.disabled = true;
                this.inputConjugeCPF.disabled = true;

                this.inputConjugeName.value = this.selectType.value;
                this.inputConjugeCPF.value = this.selectType.value;
            } else {
                this.inputConjugeName.disabled = false;
                this.inputConjugeCPF.disabled = false;

                this.inputConjugeName.value = "";
                this.inputConjugeCPF.value = "";
            }
        });
    }

    init() {
        if (this.buttonAdd) {
            this.removeEventButtonAdd();
            this.addEventButtonAdd();
        }
        if (this.selectType) this.addEventSelect();

        return this;
    }
}
