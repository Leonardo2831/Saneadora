import Big from "big.js";

export default function sumValue(
    selector: string,
    contentSelectorSum: string,
    unit: string,
) {
    const itemsSum: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(selector);
    const contentSum = document.querySelector(
        contentSelectorSum,
    ) as HTMLSpanElement;

    if (!itemsSum.length || !contentSum) return;
    // o reduce no primeiro parâmetro retorna o valor anterior.

    let sumValue = new Big(0);

    Array.from(itemsSum).forEach((valueContent: HTMLDivElement) => {
        const fullValue = valueContent.getAttribute("data-full-value");
        let rawVal = "";

        if (fullValue) {
            rawVal = fullValue;
        } else {
            rawVal = valueContent.textContent?.replace(",", ".") || "";
        }

        const cleanedVal = rawVal.replace(/ha|m2|m²|%/g, "").trim();

        if (cleanedVal !== "" && !isNaN(Number(cleanedVal))) {
            sumValue = sumValue.plus(cleanedVal);
        }
    });

    console.log(sumValue);

    contentSum.textContent = "";

    contentSum.textContent = `${parseFloat(sumValue.toFixed(10))
        .toString()
        .replace(".", ",")}${unit}`;
}