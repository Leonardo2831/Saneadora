export default function sumValue(
    selector: string,
    contentSelectorSum: string,
    unit: string
) {
    const itemsSum: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(selector);
    const contentSum = document.querySelector(
        contentSelectorSum
    ) as HTMLSpanElement;

    if (!itemsSum.length || !contentSum) return;
    // o reduce no primeiro parâmetro retorna o valor anterior.
    const sumValue = Array.from(itemsSum).reduce(
        (total: number, valueContent: HTMLDivElement) => {
            const rawVal = valueContent.textContent?.replace(",", ".") || "";
            const val = Number(rawVal.replace(/ha|m2|m²|%/g, ""));
            return total + (isNaN(val) ? 0 : val);
        },
        0
    );

    contentSum.textContent = '';

    contentSum.textContent = `${sumValue
        .toString()
        .replace(".", ",")}${unit}`;
}