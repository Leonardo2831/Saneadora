import arrayContentRow from "./getContentRow.js";

export default function generateNumbers(tableNumbers: HTMLElement | null): string[] {
    const numbersText: string[][] = arrayContentRow(tableNumbers);

    return numbersText.map((numberText) => {
        return `<li class="text-base font-normal text-gray-700">
                    <b class="text-gray-800 font-bold">ATO:</b> 
                        ${numberText[0]} |
                    <b class="text-gray-800 font-bold">Tipo:</b> 
                        ${numberText[3]} |
                    <b class="text-gray-800 font-bold">Numeração:</b>
                        ${numberText[1]} |
                    <b class="text-gray-800 font-bold">CPF:</b> 
                        ${numberText[2] == "" ? "Não consta" : numberText[2]}
                </li>`;
    });
}