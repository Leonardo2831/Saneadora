import { calcNewPercent } from "../calcValues.js";
import {
    addEventMenuClickRight,
    removeEventMenuClickRight,
} from "../menuRight/eventMenuClickRight.js";
import sumValue from "../sumValues.js";

function removeItemsLastHeader(lastHeader: HTMLElement) {
    // remove items
    lastHeader.querySelector('[data-button="new-estremacao"]')?.remove();

    lastHeader?.querySelector('[data-sum="percent"]')?.parentElement?.remove();
    lastHeader?.querySelector('[data-sum="area"]')?.parentElement?.remove();
}

function createHeaderEstremacao(
    tableCadastro: HTMLElement,
    areaEstremacao: string
): HTMLElement | null {
    const headerEstremacao = document.createElement("header");
    const classHeaderEstremacao: string[] = [
        "relative",
        "bg-gray-200",
        "border-b",
        "border-gray-300",
        "px-6",
        "py-4",
        "flex",
        "flex-wrap",
        "items-center",
        "gap-6",
    ];
    headerEstremacao.classList.add(...classHeaderEstremacao);

    const matricula = tableCadastro.querySelector(
        "[data-matricula]"
    ) as HTMLElement;
    const areaContent = tableCadastro.querySelector(
        '[data-real="area"]'
    ) as HTMLElement;

    matricula.removeAttribute("data-matricula");
    areaContent.removeAttribute("data-real");

    // get last header and add new class style
    const lastHeader = tableCadastro.querySelector('[data-table="items"]')
        ?.previousElementSibling as HTMLElement;
    lastHeader.classList.add("opacity-40");

    removeItemsLastHeader(lastHeader);

    const unitArea =
        areaContent.textContent?.replace(/[\d,.\s]/g, "").replace(/\d/g, "") ||
        "";
    const areaReal =
        areaContent.textContent?.replace(unitArea, "").trim() || "";

    const calculateRemnant = (total: string, part: string) => {
        const v1 = total.replace(",", ".");
        const v2 = part.replace(",", ".");

        const getDec = (n: string) => (n.split(".")[1] || "").length;
        const maxDec = Math.max(getDec(v1), getDec(v2));
        const factor = Math.pow(10, maxDec);

        const n1 = Math.round(Number(v1) * factor);
        const n2 = Math.round(Number(v2) * factor);

        return ((Math.abs(n1) - Math.abs(n2)) / factor)
            .toFixed(maxDec)
            .replace(".", ",");
    };

    const contentHeaderExtremacao = `
        <div class="border-r border-gray-200 pr-6">
            <span class="text-base font-medium text-gray-600">
                Matrícula:
            </span>
            <span class="text-base w-fit font-bold text-gray-800" data-matricula>
                ${matricula.textContent}
            </span>
        </div>
        <div>
            <span class="text-base font-medium text-gray-600">Área:</span>
            <span data-real="area" class="text-base w-fit font-bold p-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" contenteditable="true">
                ${calculateRemnant(areaReal, areaEstremacao)}${unitArea}
            </span>
        </div>
        <div>
            <span class="text-base font-medium text-gray-600">
                Área Somada:
            </span>
            <span data-sum="area" class="text-base w-fit font-bold text-green-800"></span>
        </div>
        <div>
            <span class="text-base font-medium text-gray-600">
                Porcentagem Somada:
            </span>
            <span
                data-sum="percent"
                class="text-base w-fit font-bold text-blue-700"
            ></span>
        </div>
    `;

    headerEstremacao.innerHTML = contentHeaderExtremacao;

    return headerEstremacao;
}

export default function addNewEstremacao(
    selectorTableCadastro: string,
    areaEstremacao: string
) {
    const tableCadastro = document.querySelector(
        selectorTableCadastro
    ) as HTMLElement;
    const headerContent = createHeaderEstremacao(
        tableCadastro,
        areaEstremacao.replace(" ", "")
    );

    if (headerContent) {
        const insertLocal = tableCadastro.querySelector(
            '[data-table="items"]'
        ) as HTMLElement;

        tableCadastro.insertBefore(headerContent, insertLocal);
    }

    const areaContent = tableCadastro.querySelector(
        '[data-real="area"]'
    ) as HTMLElement;

    const unitArea =
        areaContent.textContent?.replace(/[\d,.\s]/g, "").replace(/\d/g, "") ||
        "";

    const areaReal =
        areaContent.textContent?.replace(unitArea, "").trim() || "";

    // calculando porcentagem
    sumValue('[data-area="total"]', '[data-sum="area"]', unitArea);
    sumValue('[data-area="percent"]', '[data-sum="percent"]', "%");

    // add new percent in peoples
    calcNewPercent(Number(areaReal.replace(",", ".")), '[data-area="percent"]');

    removeEventMenuClickRight();
    addEventMenuClickRight();
}
