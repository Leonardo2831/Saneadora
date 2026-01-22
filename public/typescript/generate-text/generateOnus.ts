import arrayContentRow from "./getContentRow.js";

export default function generateOnus(
    tableOnus: HTMLElement | null,
    matricula: string,
    type: string,
): string {
    const contentRowOnus: string[][] = arrayContentRow(tableOnus);

    let filteredType: string[][] = contentRowOnus.filter((onus) => {
        return onus.includes(type) && onus.includes("Ativo");
    });

    if (type == "Estremação") {
        filteredType = contentRowOnus;
    }

    let onusText: string = "";

    if (filteredType.length > 0) {
        onusText =
            "Perfeitamente descrito no ato " +
            filteredType
                .map((onus) => onus[0].concat(`-${matricula.trim()}`))
                .join(", ");
        if (
            type == "Ajuizamento de Execução" ||
            type == "Ajuizamento de Ação Judicial"
        ) {
            onusText += `, sendo um ${type} como exequente ${filteredType[0][1]}.`;
        }
    } else if (filteredType.length === 0) {
        onusText = "Não há, até a presente data.";
    }

    if (
        (type == "Ajuizamento de Execução" || type == "Ajuizamento de Ação Judicial") &&
        filteredType.length === 0
    ) {
        return "";
    }

    return `<li>${onusText}</li>`;
}
