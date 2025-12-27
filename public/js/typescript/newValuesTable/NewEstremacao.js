import { calcNewPercent } from "../calcValues.js";
import { addEventMenuClickRight, removeEventMenuClickRight, } from "../menuRight/eventMenuClickRight.js";
import sumValue from "../sumValues.js";
function removeItemsLastHeader(lastHeader) {
    var _a, _b, _c, _d, _e;
    // remove items
    (_a = lastHeader.querySelector('[data-button="new-estremacao"]')) === null || _a === void 0 ? void 0 : _a.remove();
    (_c = (_b = lastHeader === null || lastHeader === void 0 ? void 0 : lastHeader.querySelector('[data-sum="percent"]')) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.remove();
    (_e = (_d = lastHeader === null || lastHeader === void 0 ? void 0 : lastHeader.querySelector('[data-sum="area"]')) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.remove();
}
function createHeaderEstremacao(tableCadastro, areaEstremacao) {
    var _a;
    var _b, _c, _d;
    var headerEstremacao = document.createElement("header");
    var classHeaderEstremacao = [
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
    (_a = headerEstremacao.classList).add.apply(_a, classHeaderEstremacao);
    var matricula = tableCadastro.querySelector("[data-matricula]");
    var areaContent = tableCadastro.querySelector('[data-real="area"]');
    matricula.removeAttribute("data-matricula");
    areaContent.removeAttribute("data-real");
    // get last header and add new class style
    var lastHeader = (_b = tableCadastro.querySelector('[data-table="items"]')) === null || _b === void 0 ? void 0 : _b.previousElementSibling;
    lastHeader.classList.add("opacity-40");
    removeItemsLastHeader(lastHeader);
    var unitArea = ((_c = areaContent.textContent) === null || _c === void 0 ? void 0 : _c.replace(/[\d,.\s]/g, "").replace(/\d/g, "")) ||
        "";
    var areaReal = ((_d = areaContent.textContent) === null || _d === void 0 ? void 0 : _d.replace(unitArea, "").trim()) || "";
    var calculateRemnant = function (total, part) {
        var v1 = total.replace(",", ".");
        var v2 = part.replace(",", ".");
        var getDec = function (n) { return (n.split(".")[1] || "").length; };
        var maxDec = Math.max(getDec(v1), getDec(v2));
        var factor = Math.pow(10, maxDec);
        var n1 = Math.round(Number(v1) * factor);
        var n2 = Math.round(Number(v2) * factor);
        return ((Math.abs(n1) - Math.abs(n2)) / factor)
            .toFixed(maxDec)
            .replace(".", ",");
    };
    var contentHeaderExtremacao = "\n        <div class=\"border-r border-gray-200 pr-6\">\n            <span class=\"text-base font-medium text-gray-600\">\n                Matr\u00EDcula:\n            </span>\n            <span class=\"text-base w-fit font-bold text-gray-800\" data-matricula>\n                ".concat(matricula.textContent, "\n            </span>\n        </div>\n        <div>\n            <span class=\"text-base font-medium text-gray-600\">\u00C1rea:</span>\n            <span data-real=\"area\" class=\"text-base w-fit font-bold p-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500\" contenteditable=\"true\">\n                ").concat(calculateRemnant(areaReal, areaEstremacao)).concat(unitArea, "\n            </span>\n        </div>\n        <div>\n            <span class=\"text-base font-medium text-gray-600\">\n                \u00C1rea Somada:\n            </span>\n            <span data-sum=\"area\" class=\"text-base w-fit font-bold text-green-800\"></span>\n        </div>\n        <div>\n            <span class=\"text-base font-medium text-gray-600\">\n                Porcentagem Somada:\n            </span>\n            <span\n                data-sum=\"percent\"\n                class=\"text-base w-fit font-bold text-blue-700\"\n            ></span>\n        </div>\n    ");
    headerEstremacao.innerHTML = contentHeaderExtremacao;
    return headerEstremacao;
}
export default function addNewEstremacao(selectorTableCadastro, areaEstremacao) {
    var _a, _b;
    var tableCadastro = document.querySelector(selectorTableCadastro);
    var headerContent = createHeaderEstremacao(tableCadastro, areaEstremacao.replace(" ", ""));
    if (headerContent) {
        var insertLocal = tableCadastro.querySelector('[data-table="items"]');
        tableCadastro.insertBefore(headerContent, insertLocal);
    }
    var areaContent = tableCadastro.querySelector('[data-real="area"]');
    var unitArea = ((_a = areaContent.textContent) === null || _a === void 0 ? void 0 : _a.replace(/[\d,.\s]/g, "").replace(/\d/g, "")) ||
        "";
    var areaReal = ((_b = areaContent.textContent) === null || _b === void 0 ? void 0 : _b.replace(unitArea, "").trim()) || "";
    // calculando porcentagem
    sumValue('[data-area="total"]', '[data-sum="area"]', unitArea);
    sumValue('[data-area="percent"]', '[data-sum="percent"]', "%");
    // add new percent in peoples
    calcNewPercent(Number(areaReal.replace(",", ".")), '[data-area="percent"]');
    removeEventMenuClickRight();
    addEventMenuClickRight();
}
