function createSection(
    section: HTMLElement,
    contentSection: string,
    datasetValue: string,
    classStyleSection: string[]
) {
    section.innerHTML = contentSection;
    section.setAttribute("data-tableInfos", datasetValue);

    section.classList.add(...classStyleSection);
}

export default function valuesSaneadora(): boolean {
    const tableContent = document.querySelector(
        '[data-content="tables"]'
    ) as HTMLElement;

    // inputs
    const inputMatricula = document.querySelector(
        '[data-input="matricula"]'
    ) as HTMLInputElement;
    const inputArea = document.querySelector(
        '[data-input="area"]'
    ) as HTMLInputElement;
    const radiosAreaUnit: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('[data-input="area-unit"]');

    inputMatricula.classList.remove("invalid");
    inputArea.classList.remove("invalid");

    // Procuro o radio com checked
    const radioAreaUnitChecked = Array.from(radiosAreaUnit).find(
        (radio) => radio.checked
    ) as HTMLInputElement;

    if (inputMatricula.value === "") {
        inputMatricula.classList.add("invalid");
    }

    if (inputArea.value === "") {
        inputArea.classList.add("invalid");
    }

    if (
        inputMatricula.value === "" ||
        inputArea.value === "" ||
        !radioAreaUnitChecked
    ) {
        return false;
    }

    tableContent.innerHTML = "";

    const classStyleSection: string[] = ["hidden", "table-contentStyle"];

    // section cadastro
    const contentSections: string[] = [
        `
            <header class="bg-gray-200 border-b border-gray-300 px-6 py-4 flex items-center gap-6">
                <div class="border-r border-gray-200 pr-6">
                    <span class="text-base font-medium text-gray-600">
                        Matrícula:
                    </span>
                    <span
                        class="text-base font-bold text-gray-800"
                        data-matricula
                    >
                        ${inputMatricula.value.replace(" ", "")}
                    </span>
                </div>
                <div>
                    <span class="text-base font-medium text-gray-600">Área:</span>
                    <span
                        class="text-base font-bold text-gray-800"
                        data-real="area"
                    >
                        ${inputArea.value.replace(".", ",")}${
            radioAreaUnitChecked.value
        }
                    </span>
                </div>
                <div>
                    <span class="text-base font-medium text-gray-600"
                        >Área Somada:</span
                    >
                    <span
                        data-sum="area"
                        class="text-base font-bold text-green-800"
                    >
                    </span>
                </div>
                <div>
                    <span class="text-base font-medium text-gray-600"
                        >Porcentagem Somada:</span
                    >
                    <span
                        data-sum="percent"
                        class="text-base w-fit font-bold text-blue-700"
                    >       
                    </span>
                </div>
            </header>

            <div class="overflow-x-auto" data-table="items">
                <section
                    class="w-full bg-gray-50 flex"
                    data-contentColumns="cadastro"
                >
                </section>
            </div>
        `,
        `
            <header class="bg-gray-200 border-b border-gray-300 px-6 py-4 flex items-center gap-6">
                <div class="border-r border-gray-200 pr-6">
                    <span class="text-base font-medium text-gray-600">
                        Ônus
                    </span>
                    <span
                        class="text-base w-fit font-bold text-gray-800 rounded-lg py-[5px] px-[6px] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        ${inputMatricula.value.replace(" ", "")}
                    </span>
                </div>
            </header>
            <div class="overflow-x-auto" data-table="items">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50 children-style-cell">
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Ato</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Nome</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">CPF</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Tipo</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Situação</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Observação</th>
                        </tr>
                    </thead>
                    <tbody data-table="items" data-content="onus">
                    </tbody>
                </table>
            </div>
        `,
        `
            <header class="bg-gray-200 border-b border-gray-300 px-6 py-4 flex items-center gap-6">
                <div class="border-r border-gray-200 pr-6">
                    <span class="text-base font-medium text-gray-600">
                        Números Cadastrais
                    </span>
                    <span
                        class="text-base w-fit font-bold text-gray-800 rounded-lg py-[5px] px-[6px] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        ${inputMatricula.value.replace(" ", "")}
                    </span>
                </div>
            </header>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50 children-style-cell">
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Ato</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Número</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">CPF</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Tipo</th>
                        </tr>
                    </thead>
                    <tbody data-table="items" data-content="numbers">
                    </tbody>
                </table>
            </div>
        `,
        `
            <header class="bg-gray-200 border-b border-gray-300 px-6 py-4 flex items-center gap-6">
                <div class="border-r border-gray-200 pr-6">
                    <span class="text-base font-medium text-gray-600">
                        Estremações
                    </span>
                    <span
                        class="text-base w-fit font-bold text-gray-800 rounded-lg py-[5px] px-[6px] focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            ${inputMatricula.value.replace(" ", "")}
                    </span>
                </div>
            </header>
            <div class="overflow-x-auto" data-table="items">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50 children-style-cell">
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Ato</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Nome</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">CPF</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Nome Conjugê</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">CPF Conjugê</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Área Extremada</th>
                            <th class="h-[50px] px-4 py-4 text-left text-xs font-semibold text-gray-500">Nova Matrícula</th>
                        </tr>
                    </thead>

                    <tbody
                        data-table="items"
                        data-tableContent="estremacao"
                    ></tbody>
                </table>
            </div>
        `,
    ];

    const datasetValues: string[] = [
        "cadastro",
        "onus",
        "numeros",
        "estremacao",
    ];

    for (let i = 0; i < contentSections.length; i++) {
        const sectionContentTable = document.createElement("section");

        createSection(
            sectionContentTable,
            contentSections[i],
            datasetValues[i],
            classStyleSection
        );
        tableContent.appendChild(sectionContentTable);
    }

    tableContent.children[0].classList.remove("hidden");

    inputMatricula.value = "";
    inputArea.value = "";

    return true;
}
