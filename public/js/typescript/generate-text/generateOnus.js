import arrayContentRow from "./getContentRow.js";
export default function generateOnus(tableOnus, matricula, type) {
    var contentRowOnus = arrayContentRow(tableOnus);
    var filteredType = contentRowOnus.filter(function (onus) {
        return onus.includes(type) && onus.includes("Ativo");
    });
    if (type == "Estremação") {
        filteredType = contentRowOnus;
    }
    var onusText = "";
    if (filteredType.length > 0) {
        onusText =
            "Perfeitamente descrito no ato " +
                filteredType
                    .map(function (onus) { return onus[0].concat("-".concat(matricula.trim())); })
                    .join(", ");
    }
    else if (filteredType.length === 0) {
        onusText = "Não há, até a presente data.";
    }
    return "<li>".concat(onusText, "</li>");
}
