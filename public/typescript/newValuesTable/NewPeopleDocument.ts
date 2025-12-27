import { calcNewAreaPercent, calcPercentPeople } from "../calcValues.js";
import {
    addEventMenuClickRight,
    removeEventMenuClickRight,
} from "../menuRight/eventMenuClickRight.js";
import type CreateNewValue from "./CreateNewValue.js";
import sumValue from "../sumValues.js";
import verifyExistValueInput from "../inputs/verifyExistValueInput.js";

export default class NewPeopleDocument {
    inputName: HTMLInputElement;
    inputCpf: HTMLInputElement;
    selectState: HTMLSelectElement;
    inputNameConjuge: HTMLInputElement;
    inputCpfConjuge: HTMLInputElement;
    inputAto: HTMLInputElement;
    inputArea: HTMLInputElement;
    inputBaseValue: HTMLInputElement;

    areaInfos: string[];

    buttonAdd: HTMLButtonElement;

    selectorContentColumns: string;
    contentColums: HTMLElement;

    dataColumn: string;

    buttonAddEvent: CreateNewValue;

    constructor(
        inputName: string,
        inputCpf: string,
        selectState: string,
        inputNameConjuge: string,
        inputCpfConjuge: string,
        inputAto: string,
        buttonAdd: string,
        contentColums: string,
        inputArea: string,
        newValueCadastro: CreateNewValue,
        inputBaseValue?: string
    ) {
        this.inputName = document.querySelector(inputName) as HTMLInputElement;
        this.inputCpf = document.querySelector(inputCpf) as HTMLInputElement;
        this.selectState = document.querySelector(
            selectState
        ) as HTMLSelectElement;
        this.inputNameConjuge = document.querySelector(
            inputNameConjuge
        ) as HTMLInputElement;
        this.inputCpfConjuge = document.querySelector(
            inputCpfConjuge
        ) as HTMLInputElement;
        this.inputAto = document.querySelector(inputAto) as HTMLInputElement;
        this.inputArea = document.querySelector(inputArea) as HTMLInputElement;
        this.inputBaseValue = document.querySelector(
            inputBaseValue || ""
        ) as HTMLInputElement;

        this.buttonAdd = document.querySelector(buttonAdd) as HTMLButtonElement;

        this.selectorContentColumns = contentColums;
        this.contentColums = document.querySelector(
            contentColums
        ) as HTMLElement;

        this.dataColumn = "";
        this.areaInfos = [];

        this.buttonAddEvent = newValueCadastro;

        this.createCol = this.createCol.bind(this);
        this.addCol = this.addCol.bind(this);
    }

    cleanInputs() {
        this.inputName.value = "";
        this.inputCpf.value = "";
        this.inputNameConjuge.value = "";
        this.inputCpfConjuge.value = "";
        this.inputAto.value = "";
        this.inputArea.value = "";
        if (this.inputBaseValue.value !== "") this.inputBaseValue.value = "";
    }

    createCol(): HTMLDivElement | null {
        // adicinado verificação se é viúvo(a) porque tem menos de 11 caracteres
        if (
            this.inputName.value === "" ||
            this.inputAto.value === "" ||
            this.inputArea.value === "" ||
            (this.inputCpf.value !== "" && this.inputCpf.value.length < 11) ||
            (this.inputCpfConjuge.value !== "" &&
                this.inputCpfConjuge.value.length < 11 &&
                this.inputCpfConjuge.value !== "Viúvo(a)")
        ) {
            const inputs: HTMLInputElement[] = [
                this.inputName,
                this.inputAto,
                this.inputArea,
                this.inputCpf,
                this.inputCpfConjuge,
            ];
            verifyExistValueInput(inputs);

            return null;
        }

        if (this.inputBaseValue.value !== "") {
            this.inputArea.value =
                calcNewAreaPercent(
                    Number(this.inputBaseValue.value.replace(/,/g, ".")),
                    Number(this.inputArea.value.replace(/,/g, "."))
                )
                    ?.toString()
                    .replace(".", ",") || "";
        }

        const col = document.createElement("div");
        col.classList.add("children-style-cell");

        const areaMatricula = document.querySelector(
            '[data-real="area"]'
        ) as HTMLSpanElement;

        const [areaReal, unitArea]: string[] =
            areaMatricula.textContent?.match(
                /([0-9]+[.,]?[0-9]*)+|m2|m²|ha|%|-|\+/g
            ) || [];

        this.areaInfos = [areaReal, unitArea];

        let [typeAto, valueAto]: string[] =
            this.inputAto.value.match(/\d+|[a-zA-Z]+/g) || [];

        if (!valueAto && /^\d+$/.test(typeAto)) {
            valueAto = typeAto;
            typeAto = "R";
        }

        const dataContent: string = `
            <header class="uppercase h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500 tracking-wider">
                ${typeAto}.${valueAto}
            </header>
            <div data-menu class="relative" aria-label="${
                this.inputName.value
            }">
                <input
                    type="text"
                    class="table-input"
                    value="${this.inputName.value}"
                />
            </div>
            <div data-menu class="relative" aria-label="${
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
            </div>
            <div data-menu class="relative" aria-label="${
                this.inputNameConjuge.value == ""
                    ? "Não Consta"
                    : this.inputNameConjuge.value
            }">
                <input
                    type="text"
                    class="table-input"
                    value="${
                        this.inputNameConjuge.value == ""
                            ? "Não Consta"
                            : this.inputNameConjuge.value
                    }"
                />
            </div>
            <div data-menu class="relative" aria-label="${
                this.inputCpfConjuge.value == ""
                    ? "Não Consta"
                    : this.inputCpfConjuge.value
            }">
                <input
                    type="text"
                    class="table-input"
                    data-input="cpf"
                    value="${
                        this.inputCpfConjuge.value == ""
                            ? "Não Consta"
                            : this.inputCpfConjuge.value
                    }"
                />
            </div>
            <div class="min-h-[100px] relative" data-menu aria-label="${
                this.inputArea.value
            }">
                <p
                    class="text-center text-xs font-medium text-gray-600 uppercase mb-1.5"
                >
                    Ato: ${this.inputAto.value}
                </p>
                <input
                    type="text"
                    class="table-value table-value-green"
                    value="${this.inputArea.value}${unitArea}"
                />
                <button
                    data-button="add"
                    class="absolute bottom-4 right-4 w-fit text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 transition-colors flex items-center p-1"
                >
                    <img
                        class="w-4 h-4"
                        src="public/images/plus-white.svg"
                        alt="Adicionar Valor"
                    />
                </button>
            </div>
            <div
                class="totalCell font-bold text-gray-700 relative"
                data-menu aria-label="${this.inputArea.value}"
            >
                <span>TOTAL AREA:</span>
                <div
                    data-area="total"
                    class="table-value table-value-green font-bold mt-2"
                >
                    ${this.inputArea.value}${unitArea}
                </div>
            </div>
            <div
                class="totalCell font-bold text-gray-700 relative"
                data-menu aria-label="${calcPercentPeople(
                    Number(areaReal.replace(",", ".")),
                    Number(this.inputArea.value.replace(",", "."))
                )
                    ?.toString()
                    .replace(".", ",")}"
            >
                <span>% PESSOA:</span>
                <div
                    data-area="percent"
                    class="min-h-[46px] table-value table-value-blue font-bold mt-2"
                >
                    ${calcPercentPeople(
                        Number(areaReal.replace(",", ".")),
                        Number(this.inputArea.value.replace(",", "."))
                    )
                        ?.toString()
                        .replace(".", ",")}%
                </div>
            </div>
        `;

        col.innerHTML = dataContent;

        return col;
    }

    addCol(): void {
        this.contentColums = document.querySelector(
            this.selectorContentColumns
        ) as HTMLElement;

        const colWithData: HTMLDivElement | null = this.createCol();

        if (!colWithData) return;

        this.contentColums.appendChild(colWithData);

        const [, unitArea] = this.areaInfos;

        sumValue('[data-area="total"]', '[data-sum="area"]', unitArea);
        sumValue('[data-area="percent"]', '[data-sum="percent"]', "%");

        this.cleanInputs();

        this.buttonAddEvent.addOpenModal();
        removeEventMenuClickRight();
        addEventMenuClickRight();
    }

    addEventButton() {
        this.buttonAdd.addEventListener("click", this.addCol);
    }

    addEventSelect() {
        this.selectState.addEventListener("change", () => {
            if (this.selectState.value !== "Casado(a)") {
                this.inputNameConjuge.disabled = true;
                this.inputCpfConjuge.disabled = true;

                this.inputNameConjuge.value = this.selectState.value;
                this.inputCpfConjuge.value = this.selectState.value;
            } else {
                this.inputNameConjuge.disabled = false;
                this.inputCpfConjuge.disabled = false;

                this.inputNameConjuge.value = "";
                this.inputCpfConjuge.value = "";
            }
        });
    }

    init() {
        if (this.buttonAdd) this.addEventButton();
        if (this.selectState) this.addEventSelect();

        return this;
    }
}
