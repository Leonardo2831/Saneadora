import arrayContentRow from "./getContentRow.js";
export default function generateNumbers(tableNumbers) {
    var numbersText = arrayContentRow(tableNumbers);
    return numbersText.map(function (numberText) {
        return "<li class=\"text-base font-normal text-gray-700\">\n                    <b class=\"text-gray-800 font-bold\">ATO:</b> \n                        ".concat(numberText[0], " |\n                    <b class=\"text-gray-800 font-bold\">Tipo:</b> \n                        ").concat(numberText[3], " |\n                    <b class=\"text-gray-800 font-bold\">Numera\u00E7\u00E3o:</b>\n                        ").concat(numberText[1], " |\n                    <b class=\"text-gray-800 font-bold\">CPF:</b> \n                        ").concat(numberText[2] == "" ? "Não consta" : numberText[2], "\n                </li>");
    });
}
