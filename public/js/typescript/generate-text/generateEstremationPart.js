export default function generateEstremationPart(tableEstremacao, matricula, area) {
    var _a;
    var estremacoesText = [];
    if ((_a = tableEstremacao === null || tableEstremacao === void 0 ? void 0 : tableEstremacao.children) === null || _a === void 0 ? void 0 : _a.length) {
        estremacoesText = Array.from(tableEstremacao === null || tableEstremacao === void 0 ? void 0 : tableEstremacao.children).map(function (childItem) {
            return childItem.children[0].textContent.trim() || "";
        });
    }
    var textEstremacaoConcat = estremacoesText
        .map(function (estremacao) { return estremacao.concat("-".concat(matricula.trim())); })
        .join(", ");
    return "<p>\n                Certifico que, para a devida especializa\u00E7\u00E3o e demonstra\u00E7\u00E3o\n                da evolu\u00E7\u00E3o registral, a situa\u00E7\u00E3o jur\u00EDdica do im\u00F3vel \u00E9\n                apresentada considerando-se duas refer\u00EAncias percentuais. O\n                im\u00F3vel possui uma \u00E1rea de\n                <b class=\"text-gray-800 font-bold\">".concat(area, "</b>,\n                informada na matr\u00EDcula. ").concat(estremacoesText.length > 0 ? "Em momento posterior, o im\u00F3vel sofreu Estrema\u00E7\u00E3o, devidamente registrada sob o, <b class='text-gray-800 font-bold'>".concat(textEstremacaoConcat, "</b>, o qual n\u00E3o \u00E9 obrigat\u00F3rio nos termos do Prov. 93/CGJ, apurar o remanescente.") : "", "\n            </p>");
}
