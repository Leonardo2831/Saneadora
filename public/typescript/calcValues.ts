import Big from "big.js";

export function getFullPercentPeople(
    areaReal: number,
    value: number,
): string | void {
    if (value && areaReal) {
        // (value * 100) / areaReal
        const val = new Big(value);
        const area = new Big(areaReal);
        const calcPercent = val.times(100).div(area);

        return calcPercent.toString();
    }

    return;
}

export function calcPercentPeople(
    areaReal: number,
    value: number,
): number | void {
    if (value && areaReal) {
        // (value * 100) / areaReal
        const val = new Big(value);
        const area = new Big(areaReal);
        const calcPercent = val.times(100).div(area);

        return parseFloat(calcPercent.toFixed(10));
    }

    return;
}

export function calcNewAreaPercent(
    value: number,
    valueBase: number,
): number | void {
    if (valueBase) {
        // Number(valueBase) * (value / 100)
        const base = new Big(valueBase);
        const val = new Big(value);
        const calcPercent = base.times(val.div(100));

        return parseFloat(calcPercent.toFixed(10));
    }

    return;
}

export function calcNewArea(
    contentArea: HTMLElement,
    value: string,
    unit: string,
    inputCell?: HTMLInputElement,
) {
    const rawReplacedValue = (value || "")
        .replace(/m²|m2|ha|%/g, "")
        .replace(/,/g, ".")
        .trim();
    const fullValueCell =
        contentArea.children[1].getAttribute("data-full-value");
    const rawValueCell =
        fullValueCell ||
        (contentArea.children[1].textContent || "")
            .replace(/m²|m2|ha|%/g, "")
            .replace(/,/g, ".")
            .trim();

    if (
        !rawReplacedValue ||
        !rawValueCell ||
        isNaN(Number(rawReplacedValue)) ||
        isNaN(Number(rawValueCell))
    )
        return;

    const replacedValue = new Big(rawReplacedValue);
    const valueCell = new Big(rawValueCell);

    const areaMatricula = document.querySelector(
        '[data-real="area"]',
    ) as HTMLSpanElement;

    const unitArea = areaMatricula.textContent?.replace(/[\d,.\s]/g, "") || "";

    const newUnit: string = unitArea;

    if (unit == "%") {
        const inputBase = document.querySelector(
            '[data-input="percentBase"]',
        ) as HTMLInputElement;

        const inputBaseValue = (inputBase.value || "")
            .replace(/,/g, ".")
            .trim();

        if (!inputBaseValue || isNaN(Number(inputBaseValue))) return;

        const calcPercentArea = new Big(inputBaseValue).times(
            replacedValue.div(100),
        );

        if (inputCell) {
            inputCell.value = `${parseFloat(calcPercentArea.toFixed(10))
                .toString()
                .replace(".", ",")}${newUnit}`;
        }

        const absCalcPercentArea = calcPercentArea.abs();

        if (calcPercentArea.lt(0)) {
            const result = valueCell.minus(absCalcPercentArea);
            contentArea.children[1].setAttribute(
                "data-full-value",
                result.toString(),
            );
            contentArea.children[1].textContent = `${parseFloat(
                result.toFixed(10),
            )
                .toString()
                .replace(".", ",")}${newUnit}`;
        } else if (calcPercentArea.gt(0)) {
            const result = valueCell.plus(absCalcPercentArea);
            contentArea.children[1].setAttribute(
                "data-full-value",
                result.toString(),
            );
            contentArea.children[1].textContent = `${parseFloat(
                result.toFixed(10),
            )
                .toString()
                .replace(".", ",")}${newUnit}`;
        }
    } else {
        if (replacedValue.lt(0)) {
            const result = valueCell.minus(replacedValue.abs());
            contentArea.children[1].setAttribute(
                "data-full-value",
                result.toString(),
            );
            contentArea.children[1].textContent = `${parseFloat(
                result.toFixed(10),
            )
                .toString()
                .replace(".", ",")}${newUnit}`;
        } else if (replacedValue.gt(0)) {
            const result = valueCell.plus(replacedValue.abs());
            contentArea.children[1].setAttribute(
                "data-full-value",
                result.toString(),
            );
            contentArea.children[1].textContent = `${parseFloat(
                result.toFixed(10),
            )
                .toString()
                .replace(".", ",")}${newUnit}`;
        }
    }

    contentArea.previousElementSibling?.children[1].classList.replace(
        "table-value-green",
        "table-value-orange",
    );

    const finalContent =
        contentArea.children[1].textContent?.replace(",", ".") || "0";
    if (parseFloat(finalContent) === 0) {
        contentArea.children[1].classList.replace(
            "table-value-green",
            "table-value-orange",
        );
    }

    contentArea.setAttribute(
        "aria-label",
        contentArea.children[1].textContent || "",
    );
}

export function calcNewPercent(areaReal: number, selectorPercent: string) {
    const contentsPercent: NodeListOf<HTMLSpanElement> =
        document.querySelectorAll(selectorPercent);

    if (!contentsPercent.length) return;

    const areaRealBig = new Big(areaReal);

    const percents: Big[] = Array.from(contentsPercent).map((percent) => {
        const areaCell =
            percent.parentElement?.previousElementSibling?.children[1];
        const fullAreaValue = areaCell?.getAttribute("data-full-value");

        const rawReplacedArea =
            fullAreaValue ||
            (areaCell?.textContent || "")
                .replace(/%|ha|m²|m2/g, "")
                .replace(/,/g, ".")
                .trim();

        const replacedArea = new Big(rawReplacedArea || "0");

        const calcPercent = replacedArea.times(100).div(areaRealBig);
        return calcPercent;
    });

    percents.forEach((percent, index) => {
        const formattedPercent = parseFloat(percent.toFixed(10))
            .toString()
            .replace(".", ",");

        contentsPercent[index].setAttribute(
            "data-full-value",
            percent.toString(),
        );
        contentsPercent[index].textContent = `${formattedPercent}%`;
        contentsPercent[index].parentElement?.setAttribute(
            "aria-label",
            formattedPercent || "",
        );
    });
}
