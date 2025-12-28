// Helper to fix floating point precision issues
function fixFloat(value: number): number {
    return parseFloat(value.toFixed(10));
}

export function calcPercentPeople(
    areaReal: number,
    value: number
): number | void {
    if (value && areaReal) {
        const calcPercent: number = (value * 100) / areaReal;

        return fixFloat(calcPercent);
    }

    return;
}

export function calcNewAreaPercent(
    value: number,
    valueBase: number
): number | void {
    if (valueBase) {
        // const calcPercent: number = (Number(valueBase) * value) / 100;
        const calcPercent: number = Number(valueBase) * (value / 100);

        return fixFloat(calcPercent);
    }

    return;
}

export function calcNewArea(
    contentArea: HTMLElement,
    value: string,
    unit: string,
    inputCell?: HTMLInputElement
) {
    const replacedValue: number = Number(
        value?.replace(/m²|m2|ha|%/g, "").replace(/,/g, ".")
    );

    const valueCell: number = Number(
        contentArea.children[1].textContent
            ?.replace(/m²|m2|ha|%/g, "")
            .replace(/,/g, ".")
    );

    if (!replacedValue || !valueCell) return;

    const areaMatricula = document.querySelector(
        '[data-real="area"]'
    ) as HTMLSpanElement;

    const unitArea = areaMatricula.textContent?.replace(/[\d,.\s]/g, "") || "";

    const newUnit: string = unitArea;

    if (unit == "%") {
        const inputBase = document.querySelector(
            '[data-input="percentBase"]'
        ) as HTMLInputElement;

        const calcPercentArea: number | void = calcNewAreaPercent(
            replacedValue,
            Number(inputBase.value.replace(/,/g, "."))
        );

        if (inputCell && calcPercentArea !== undefined) {
            inputCell.value = `${fixFloat(calcPercentArea)
                .toString()
                .replace(".", ",")}${newUnit}`;
        }

        if (calcPercentArea && calcPercentArea < 0) {
            const result = valueCell - Math.abs(calcPercentArea);
            contentArea.children[1].textContent = `${fixFloat(result)
                .toString()
                .replace(".", ",")}${newUnit}`;
        } else if (calcPercentArea && calcPercentArea > 0) {
            const result = valueCell + Math.abs(calcPercentArea);
            contentArea.children[1].textContent = `${fixFloat(result)
                .toString()
                .replace(".", ",")}${newUnit}`;
        }
    } else {
        if (replacedValue < 0) {
            const result = valueCell - Math.abs(replacedValue);
            contentArea.children[1].textContent = `${fixFloat(result)
                .toString()
                .replace(".", ",")}${newUnit}`;
        } else if (replacedValue > 0) {
            const result = valueCell + Math.abs(replacedValue);
            contentArea.children[1].textContent = `${fixFloat(result)
                .toString()
                .replace(".", ",")}${newUnit}`;
        }
    }

    contentArea.previousElementSibling?.children[1].classList.replace(
        "table-value-green",
        "table-value-orange"
    );

    if (
        parseFloat(
            contentArea.children[1].textContent?.replace(",", ".") || "0"
        ) === 0
    ) {
        contentArea.children[1].classList.replace(
            "table-value-green",
            "table-value-orange"
        );
    }

    contentArea.setAttribute(
        "aria-label",
        contentArea.children[1].textContent || ""
    );
}

export function calcNewPercent(areaReal: number, selectorPercent: string) {
    const contentsPercent: NodeListOf<HTMLSpanElement> =
        document.querySelectorAll(selectorPercent);

    if (!contentsPercent.length) return;

    const percents: number[] = Array.from(contentsPercent).map((percent) => {
        const replacedArea: number = Number(
            percent.parentElement?.previousElementSibling?.children[1].textContent
                ?.replace(/%|ha|m²|m2/g, "")
                .replace(/,/g, ".")
        );

        // calculando porcentagem com área
        const calcPercent: number = (replacedArea * 100) / areaReal;
        return fixFloat(calcPercent);
    });

    percents.forEach((percent, index) => {
        contentsPercent[index].textContent = `${percent
            .toString()
            .replace(".", ",")}%`;
        contentsPercent[index].parentElement?.setAttribute(
            "aria-label",
            percent
                .toString()
                .replace(/%|ha|m²|m2/g, "")
                .replace(".", ",") || ""
        );
    });
}
