import generateEstremationPart from "./generateEstremationPart.js";
import generateNumbers from "./generateNumbers.js";
import generateOnus from "./generateOnus.js";
import generateProprietario from "./generateProprietario.js";
import titleTextCertidao from "./title-certidao.js";

function formatArea(value: string): string {
    if (!value) return "";

    if (value.toLowerCase().includes("ha")) {
        const clean = value.toLowerCase().replace("ha", "").replace(/\s/g, "");
        const parts = clean.split(/[.,]/);

        const hectares = parts[0];
        let decimals = parts[1] || "";

        decimals = (decimals + "0000").slice(0, 4);

        const ares = decimals.slice(0, 2);
        const centiares = decimals.slice(2, 4);

        return `${hectares}ha ${ares}as ${centiares}ca`;
    }

    return value.trim();
}

export default function contentText(textInitialMatricula: string): string {
    const tables: {
        tableCadastro: HTMLElement | null;
        tableOnus: HTMLElement | null;
        tableNumbers: HTMLElement | null;
        tableEstremacao: HTMLElement | null;
    } = {
        tableCadastro: document.querySelector(
            '[data-contentColumns="cadastro"]',
        ),
        tableOnus: document.querySelector('[data-content="onus"]'),
        tableNumbers: document.querySelector('[data-content="numbers"]'),
        tableEstremacao: document.querySelector(
            '[data-tableContent="estremacao"]',
        ),
    };

    const matricula: string =
        document.querySelector("[data-matricula]")?.textContent || "";

    const contentArea =
        tables.tableCadastro?.parentElement?.parentElement?.children[0]
            .children[1].children[1].textContent || "";

    if (!matricula || !contentArea) return "";

    const area = formatArea(contentArea);

    let textFinal: string = "";

    textFinal += titleTextCertidao(textInitialMatricula);

    textFinal += generateEstremationPart(
        tables.tableEstremacao,
        matricula,
        area,
    );

    textFinal += `
            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    PROPRIETÁRIOS(AS):
                </h3>
                <ul class="list-disc list-inside space-y-5">
                    ${generateProprietario(tables.tableCadastro).join("")}
                </ul>
            </section>
    `;

    textFinal +=
        tables.tableNumbers?.children.length !== 0
            ? `
            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    CADASTROS RURAIS:
                </h3>
                <ul class="list-disc list-inside">
                    ${generateNumbers(tables.tableNumbers).join("")}
                </ul>
            </section>
    `
            : "";

    textFinal += `
            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    HIPOTECA:
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(tables.tableOnus, matricula, "Hipoteca")}
                </ul>
            </section>

            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    SERVIDÃO:
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(tables.tableOnus, matricula, "Servidão")}
                </ul>
            </section>

            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    USUFRUTO:
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(tables.tableOnus, matricula, "Usufruto")}
                </ul>
            </section>

            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    CLÁUSULA RESOLUTIVA EXPRESSA ou CLÁUSULA RESOLUTIVA
                    TÁCITA (AUSÊNCIA DE QUITAÇÃO):
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(
                        tables.tableOnus,
                        matricula,
                        "Clausulas Restritivas",
                    )}
                </ul>
            </section>

            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    ALIENAÇÃO FIDUCIÁRIA:
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(
                        tables.tableOnus,
                        matricula,
                        "Alienação Fiduciária",
                    )}
                </ul>
            </section>

            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    PENHORA:
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(tables.tableOnus, matricula, "Penhora")}
                </ul>
            </section>

            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    INDISPONIBILIDADE:
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(
                        tables.tableOnus,
                        matricula,
                        "Indisponibilidade",
                    )}
                </ul>
            </section>

            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    RESERVA LEGAL:
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(
                        tables.tableOnus,
                        matricula,
                        "Reserva Legal",
                    )}
                </ul>
            </section>

            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    AJUIZAMENTO DE EXECUÇÃO:
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(
                        tables.tableOnus,
                        matricula,
                        "Ajuizamento de Execução",
                    )}
                </ul>
            </section>

            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    PROTOCOLO EM VIGOR:
                </h4>
                <ul class="list-disc list-inside">
                    <li>Definir pelo Asgard</li>
                </ul>
            </section>
    `;

    textFinal += `
            <section>
                <h4 class="text-lg font-bold text-gray-800 mb-4">
                    ESTREMAÇÃO:
                </h4>
                <ul class="list-disc list-inside">
                    ${generateOnus(
                        tables.tableEstremacao,
                        matricula,
                        "Estremação",
                    )}
                </ul>
            </section>

            ${
                tables.tableEstremacao?.children.length === 0
                    ? ""
                    : `<p class="text-base font-normal text-gray-700">
                O imóvel de matrícula ${matricula}, objeto da Certidão Saneadora,
                que sofreu as estremações acima descritas, não é obrigatória
                a retificação da área da gleba originária, bem como apuração
                da área remanescente, nos termos do art. 1.151 do Prov. 93,
                conforme se depreende do artigo do citado código de normas,
                a saber:
                <cite class="text-base font-normal font-italic text-gray-800">
                    “A escritura descreverá apenas a parcela localizada,
                    sendo desnecessária a retificação de área da gleba
                    originária, bem como a apuração da área
                    remanescente”.
                </cite>
            </p>`
            }
        `;

    return textFinal;
}
