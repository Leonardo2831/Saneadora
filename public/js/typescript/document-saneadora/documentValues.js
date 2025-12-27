function createSection(section, contentSection, datasetValue, classStyleSection) {
    var _a;
    section.innerHTML = contentSection;
    section.setAttribute("data-tableInfos", datasetValue);
    (_a = section.classList).add.apply(_a, classStyleSection);
}
export default function valuesSaneadora() {
    var buttonSave = document.querySelector('[data-save="saneadora"]');
    if (buttonSave)
        buttonSave.removeAttribute('data-id');
    ;
    var tableContent = document.querySelector('[data-content="tables"]');
    // inputs
    var inputMatricula = document.querySelector('[data-input="matricula"]');
    var inputArea = document.querySelector('[data-input="area"]');
    var radiosAreaUnit = document.querySelectorAll('[data-input="area-unit"]');
    inputMatricula.classList.remove("invalid");
    inputArea.classList.remove("invalid");
    // Procuro o radio com checked
    var radioAreaUnitChecked = Array.from(radiosAreaUnit).find(function (radio) { return radio.checked; });
    if (inputMatricula.value === "") {
        inputMatricula.classList.add("invalid");
    }
    if (inputArea.value === "") {
        inputArea.classList.add("invalid");
    }
    if (inputMatricula.value === "" ||
        inputArea.value === "" ||
        !radioAreaUnitChecked) {
        return false;
    }
    tableContent.innerHTML = "";
    var classStyleSection = ["hidden", "table-contentStyle"];
    // section cadastro
    var contentSections = [
        "\n            <header class=\"bg-gray-200 border-b border-gray-300 px-6 py-4 flex items-center gap-6\">\n                <div class=\"border-r border-gray-200 pr-6\">\n                    <span class=\"text-base font-medium text-gray-600\">\n                        Matr\u00EDcula:\n                    </span>\n                    <span\n                        class=\"text-base font-bold text-gray-800\"\n                        data-matricula\n                    >\n                        ".concat(inputMatricula.value.replace(' ', ''), "\n                    </span>\n                </div>\n                <div>\n                    <span class=\"text-base font-medium text-gray-600\">\u00C1rea:</span>\n                    <span\n                        class=\"text-base font-bold text-gray-800\"\n                        data-real=\"area\"\n                    >\n                        ").concat(inputArea.value.replace(".", ",")).concat(radioAreaUnitChecked.value, "\n                    </span>\n                </div>\n                <div>\n                    <span class=\"text-base font-medium text-gray-600\"\n                        >\u00C1rea Somada:</span\n                    >\n                    <span\n                        data-sum=\"area\"\n                        class=\"text-base font-bold text-green-800\"\n                    >\n                    </span>\n                </div>\n                <div>\n                    <span class=\"text-base font-medium text-gray-600\"\n                        >Porcentagem Somada:</span\n                    >\n                    <span\n                        data-sum=\"percent\"\n                        class=\"text-base w-fit font-bold text-blue-700\"\n                    >       \n                    </span>\n                </div>\n            </header>\n\n            <div class=\"overflow-x-auto\" data-table=\"items\">\n                <section\n                    class=\"w-full bg-gray-50 flex\"\n                    data-contentColumns=\"cadastro\"\n                >\n                </section>\n            </div>\n        "),
        "\n            <header class=\"bg-gray-200 border-b border-gray-300 px-6 py-4 flex items-center gap-6\">\n                <div class=\"border-r border-gray-200 pr-6\">\n                    <span class=\"text-base font-medium text-gray-600\">\n                        \u00D4nus\n                    </span>\n                    <span\n                        class=\"text-base w-fit font-bold text-gray-800 rounded-lg py-[5px] px-[6px] focus:outline-none focus:ring-2 focus:ring-blue-600\"\n                    >\n                        ".concat(inputMatricula.value.replace(' ', ''), "\n                    </span>\n                </div>\n            </header>\n            <div class=\"overflow-x-auto\" data-table=\"items\">\n                <table class=\"w-full\">\n                    <thead>\n                        <tr class=\"bg-gray-50 children-style-cell\">\n                            <th>Ato</th>\n                            <th>Nome</th>\n                            <th>CPF</th>\n                            <th>Tipo</th>\n                            <th>Situa\u00E7\u00E3o</th>\n                            <th>Observa\u00E7\u00E3o</th>\n                        </tr>\n                    </thead>\n                    <tbody data-table=\"items\" data-content=\"onus\">\n                    </tbody>\n                </table>\n            </div>\n        "),
        "\n            <header class=\"bg-gray-200 border-b border-gray-300 px-6 py-4 flex items-center gap-6\">\n                <div class=\"border-r border-gray-200 pr-6\">\n                    <span class=\"text-base font-medium text-gray-600\">\n                        N\u00FAmeros Cadastrais\n                    </span>\n                    <span\n                        class=\"text-base w-fit font-bold text-gray-800 rounded-lg py-[5px] px-[6px] focus:outline-none focus:ring-2 focus:ring-blue-600\"\n                    >\n                        ".concat(inputMatricula.value.replace(' ', ''), "\n                    </span>\n                </div>\n            </header>\n            <div class=\"overflow-x-auto\">\n                <table class=\"w-full\">\n                    <thead>\n                        <tr class=\"bg-gray-50 children-style-cell\">\n                            <th>Ato</th>\n                            <th>N\u00FAmero</th>\n                            <th>CPF</th>\n                            <th>Tipo</th>\n                        </tr>\n                    </thead>\n                    <tbody data-table=\"items\" data-content=\"numbers\">\n                    </tbody>\n                </table>\n            </div>\n        "),
        "\n            <header class=\"bg-gray-200 border-b border-gray-300 px-6 py-4 flex items-center gap-6\">\n                <div class=\"border-r border-gray-200 pr-6\">\n                    <span class=\"text-base font-medium text-gray-600\">\n                        Estrema\u00E7\u00F5es\n                    </span>\n                    <span\n                        class=\"text-base w-fit font-bold text-gray-800 rounded-lg py-[5px] px-[6px] focus:outline-none focus:ring-2 focus:ring-blue-600\"\n                        >\n                            ".concat(inputMatricula.value.replace(' ', ''), "\n                    </span>\n                </div>\n            </header>\n            <div class=\"overflow-x-auto\" data-table=\"items\">\n                <table class=\"w-full\">\n                    <thead>\n                        <tr class=\"bg-gray-50 children-style-cell\">\n                            <th>Ato</th>\n                            <th>Nome</th>\n                            <th>CPF</th>\n                            <th>Nome Conjug\u00EA</th>\n                            <th>CPF Conjug\u00EA</th>\n                            <th>\u00C1rea Extremada</th>\n                            <th>Nova Matr\u00EDcula</th>\n                        </tr>\n                    </thead>\n\n                    <tbody\n                        data-table=\"items\"\n                        data-tableContent=\"estremacao\"\n                    ></tbody>\n                </table>\n            </div>\n        "),
    ];
    var datasetValues = [
        "cadastro",
        "onus",
        "numeros",
        "estremacao",
    ];
    for (var i = 0; i < contentSections.length; i++) {
        var sectionContentTable = document.createElement("section");
        createSection(sectionContentTable, contentSections[i], datasetValues[i], classStyleSection);
        tableContent.appendChild(sectionContentTable);
    }
    tableContent.children[0].classList.remove("hidden");
    inputMatricula.value = "";
    inputArea.value = "";
    return true;
}
