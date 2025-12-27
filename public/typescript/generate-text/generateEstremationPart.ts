export default function generateEstremationPart(
    tableEstremacao: HTMLElement | null,
    matricula: string,
    area: string
): string {
    let estremacoesText: string[] = [];
    if (tableEstremacao?.children?.length) {
        estremacoesText = Array.from(tableEstremacao?.children).map(
            (childItem: Element) => {
                return childItem.children[0].textContent.trim() || "";
            }
        );
    }

    const textEstremacaoConcat = estremacoesText
        .map((estremacao) => estremacao.concat(`-${matricula.trim()}`))
        .join(", ");

    return `<p>
                Certifico que, para a devida especialização e demonstração
                da evolução registral, a situação jurídica do imóvel é
                apresentada considerando-se duas referências percentuais. O
                imóvel possui uma área de
                <b class="text-gray-800 font-bold">${area}</b>,
                informada na matrícula. ${estremacoesText.length > 0 ? `Em momento posterior, o imóvel sofreu Estremação, devidamente registrada sob o, <b class='text-gray-800 font-bold'>${textEstremacaoConcat}</b>, o qual não é obrigatório nos termos do Prov. 93/CGJ, apurar o remanescente.` : ""}
            </p>`;
}