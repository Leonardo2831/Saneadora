import arrayContentRow from "./getContentRow.js";

export default function generateProprietario(tableCadastro: HTMLElement | null): string[] {
    const proprietariosText: string[][] = arrayContentRow(tableCadastro);

    const maritalStatuses: string[] = [
        "Casado(a)",
        "Solteiro(a)",
        "Divorciado(a)",
        "Viúvo(a)",
    ];

    return proprietariosText.map((proprietario) => {
        const isMaritalStatus: boolean = !maritalStatuses.includes(
            proprietario[3] || proprietario[4]
        );

        const nameConjuge: string = isMaritalStatus ? " / " + proprietario[3] : "";
        const cpfConjuge: string = isMaritalStatus ? " / " + proprietario[4] : "";

        if(proprietario[proprietario.length - 1] == "0") return "";

        return `<li class="text-base font-normal text-gray-700">
                    <span>
                        <b class="text-gray-800 font-bold">ATO:</b> 
                            ${proprietario[0]}
                    </span>
                        <br>
                    <span class="pl-5">
                        <b class="text-gray-800 font-bold">PROPRIETÁRIO:</b>
                            ${proprietario[1]} ${nameConjuge}
                        <br>
                    </span>
                    <span class="pl-5">
                        <b class="text-gray-800 font-bold">CPF/MF:</b> 
                            ${proprietario[2]}${cpfConjuge}
                        <br>
                    </span>
                    <span class="pl-5">
                        <b class="text-gray-800 font-bold">FRAÇÃO IDEAL DE:</b>
                            ${proprietario[proprietario.length - 1]}%
                    </span>
                </li>`;
    });
}