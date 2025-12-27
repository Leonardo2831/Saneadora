import generateEstremationPart from "./generateEstremationPart.js";
import generateNumbers from "./generateNumbers.js";
import generateOnus from "./generateOnus.js";
import generateProprietario from "./generateProprietario.js";
import titleTextCertidao from "./title-certidao.js";
function formatArea(value) {
    if (!value)
        return "";
    if (value.toLowerCase().includes("ha")) {
        var clean = value.toLowerCase().replace("ha", "").replace(/\s/g, "");
        var parts = clean.split(/[.,]/);
        var hectares = parts[0];
        var decimals = parts[1] || "";
        decimals = (decimals + "0000").slice(0, 4);
        var ares = decimals.slice(0, 2);
        var centiares = decimals.slice(2, 4);
        return "".concat(hectares, "ha ").concat(ares, "as ").concat(centiares, "ca");
    }
    return value.trim();
}
export default function contentText(textInitialMatricula) {
    var _a, _b, _c, _d, _e, _f;
    var tables = {
        tableCadastro: document.querySelector('[data-contentColumns="cadastro"]'),
        tableOnus: document.querySelector('[data-content="onus"]'),
        tableNumbers: document.querySelector('[data-content="numbers"]'),
        tableEstremacao: document.querySelector('[data-tableContent="estremacao"]'),
    };
    var matricula = ((_a = document.querySelector("[data-matricula]")) === null || _a === void 0 ? void 0 : _a.textContent) || "";
    var contentArea = ((_d = (_c = (_b = tables.tableCadastro) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.children[0].children[1].children[1].textContent) || "";
    if (!matricula || !contentArea)
        return "";
    var area = formatArea(contentArea);
    var textFinal = "";
    textFinal += titleTextCertidao(textInitialMatricula);
    textFinal += generateEstremationPart(tables.tableEstremacao, matricula, area);
    textFinal += "\n            <section>\n                <h3 class=\"text-xl font-bold text-gray-800 mb-4\">\n                    PROPRIET\u00C1RIOS(AS):\n                </h3>\n                <ul class=\"list-disc list-inside space-y-5\">\n                    ".concat(generateProprietario(tables.tableCadastro).join(""), "\n                </ul>\n            </section>\n    ");
    textFinal += ((_e = tables.tableNumbers) === null || _e === void 0 ? void 0 : _e.children.length) !== 0 ? "\n            <section>\n                <h3 class=\"text-xl font-bold text-gray-800 mb-4\">\n                    CADASTROS RURAIS:\n                </h3>\n                <ul class=\"list-disc list-inside\">\n                    ".concat(generateNumbers(tables.tableNumbers).join(""), "\n                </ul>\n            </section>\n    ") : '';
    textFinal += "\n            <section>\n                <h4 class=\"text-lg font-bold text-gray-800 mb-4\">\n                    Hipoteca:\n                </h4>\n                <ul class=\"list-disc list-inside\">\n                    ".concat(generateOnus(tables.tableOnus, matricula, "Hipoteca"), "\n                </ul>\n            </section>\n\n            <section>\n                <h4 class=\"text-lg font-bold text-gray-800 mb-4\">\n                    Servid\u00E3o:\n                </h4>\n                <ul class=\"list-disc list-inside\">\n                    ").concat(generateOnus(tables.tableOnus, matricula, "Servidão"), "\n                </ul>\n            </section>\n\n            <section>\n                <h4 class=\"text-lg font-bold text-gray-800 mb-4\">\n                    CL\u00C1USULA RESOLUTIVA EXPRESSA ou CL\u00C1USULA RESOLUTIVA\n                    T\u00C1CITA (AUS\u00CANCIA DE QUITA\u00C7\u00C3O):\n                </h4>\n                <ul class=\"list-disc list-inside\">\n                    ").concat(generateOnus(tables.tableOnus, matricula, "Clausulas Restritivas"), "\n                </ul>\n            </section>\n\n            <section>\n                <h4 class=\"text-lg font-bold text-gray-800 mb-4\">\n                    ALIENA\u00C7\u00C3O FIDUCI\u00C1RIA:\n                </h4>\n                <ul class=\"list-disc list-inside\">\n                    ").concat(generateOnus(tables.tableOnus, matricula, "Alienação Fiduciária"), "\n                </ul>\n            </section>\n\n            <section>\n                <h4 class=\"text-lg font-bold text-gray-800 mb-4\">\n                    PENHORA:\n                </h4>\n                <ul class=\"list-disc list-inside\">\n                    ").concat(generateOnus(tables.tableOnus, matricula, "Penhora"), "\n                </ul>\n            </section>\n\n            <section>\n                <h4 class=\"text-lg font-bold text-gray-800 mb-4\">\n                    INDISPONIBILIDADE:\n                </h4>\n                <ul class=\"list-disc list-inside\">\n                    ").concat(generateOnus(tables.tableOnus, matricula, "Indisponibilidade"), "\n                </ul>\n            </section>\n\n            <section>\n                <h4 class=\"text-lg font-bold text-gray-800 mb-4\">\n                    RESERVA LEGAL:\n                </h4>\n                <ul class=\"list-disc list-inside\">\n                    ").concat(generateOnus(tables.tableOnus, matricula, "Reserva Legal"), "\n                </ul>\n            </section>\n\n            <section>\n                <h4 class=\"text-lg font-bold text-gray-800 mb-4\">\n                    PROTOCOLO EM VIGOR:\n                </h4>\n                <ul class=\"list-disc list-inside\">\n                    <li>Definir pelo Asgard</li>\n                </ul>\n            </section>\n    ");
    textFinal += "\n            <section>\n                <h4 class=\"text-lg font-bold text-gray-800 mb-4\">\n                    ESTREMA\u00C7\u00C3O:\n                </h4>\n                <ul class=\"list-disc list-inside\">\n                    ".concat(generateOnus(tables.tableEstremacao, matricula, "Estremação"), "\n                </ul>\n            </section>\n\n            ").concat(((_f = tables.tableEstremacao) === null || _f === void 0 ? void 0 : _f.children.length) === 0
        ? ""
        : "<p class=\"text-base font-normal text-gray-700\">\n                O im\u00F3vel de matr\u00EDcula ".concat(matricula, ", objeto da Certid\u00E3o Saneadora,\n                que sofreu as estrema\u00E7\u00F5es acima descritas, n\u00E3o \u00E9 obrigat\u00F3ria\n                a retifica\u00E7\u00E3o da \u00E1rea da gleba origin\u00E1ria, bem como apura\u00E7\u00E3o\n                da \u00E1rea remanescente, nos termos do art. 1.151 do Prov. 93,\n                conforme se depreende do artigo do citado c\u00F3digo de normas,\n                a saber:\n                <cite class=\"text-base font-normal font-italic text-gray-800\">\n                    \u201CA escritura descrever\u00E1 apenas a parcela localizada,\n                    sendo desnecess\u00E1ria a retifica\u00E7\u00E3o de \u00E1rea da gleba\n                    origin\u00E1ria, bem como a apura\u00E7\u00E3o da \u00E1rea\n                    remanescente\u201D.\n                </cite>\n            </p>"), "\n        ");
    return textFinal;
}
