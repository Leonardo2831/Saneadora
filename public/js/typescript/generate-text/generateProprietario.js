import arrayContentRow from "./getContentRow.js";
export default function generateProprietario(tableCadastro) {
    var proprietariosText = arrayContentRow(tableCadastro);
    var maritalStatuses = [
        "Casado(a)",
        "Solteiro(a)",
        "Divorciado(a)",
        "Viúvo(a)",
    ];
    return proprietariosText.map(function (proprietario) {
        var isMaritalStatus = !maritalStatuses.includes(proprietario[3] || proprietario[4]);
        var nameConjuge = isMaritalStatus ? " / " + proprietario[3] : "";
        var cpfConjuge = isMaritalStatus ? " / " + proprietario[4] : "";
        return "<li class=\"text-base font-normal text-gray-700\">\n                    <span>\n                        <b class=\"text-gray-800 font-bold\">ATO:</b> \n                            ".concat(proprietario[0], "\n                    </span>\n                        <br>\n                    <span class=\"pl-5\">\n                        <b class=\"text-gray-800 font-bold\">PROPRIET\u00C1RIO:</b>\n                            ").concat(proprietario[1], " ").concat(nameConjuge, "\n                        <br>\n                    </span>\n                    <span class=\"pl-5\">\n                        <b class=\"text-gray-800 font-bold\">CPF/MF:</b> \n                            ").concat(proprietario[2]).concat(cpfConjuge, "\n                        <br>\n                    </span>\n                    <span class=\"pl-5\">\n                        <b class=\"text-gray-800 font-bold\">FRA\u00C7\u00C3O IDEAL DE:</b>\n                            ").concat(proprietario[proprietario.length - 1], "%\n                    </span>\n                </li>");
    });
}
