// Helper to fix floating point precision issues
function fixFloat(value) {
    return parseFloat(value.toFixed(10));
}
export function calcPercentPeople(areaReal, value) {
    if (value && areaReal) {
        var calcPercent = (value * 100) / areaReal;
        return fixFloat(calcPercent);
    }
    return;
}
export function calcNewAreaPercent(value, valueBase) {
    if (valueBase) {
        // const calcPercent: number = (Number(valueBase) * value) / 100;
        var calcPercent = Number(valueBase) * (value / 100);
        return fixFloat(calcPercent);
    }
    return;
}
export function calcNewArea(contentArea, value, unit, inputCell) {
    var _a, _b, _c, _d;
    var replacedValue = Number(value === null || value === void 0 ? void 0 : value.replace(/m²|m2|ha|%/g, "").replace(/,/g, "."));
    var valueCell = Number((_a = contentArea.children[1].textContent) === null || _a === void 0 ? void 0 : _a.replace(/m²|m2|ha|%/g, "").replace(/,/g, "."));
    if (!replacedValue || !valueCell)
        return;
    var areaMatricula = document.querySelector('[data-real="area"]');
    var unitArea = ((_b = areaMatricula.textContent) === null || _b === void 0 ? void 0 : _b.replace(/[\d,.\s]/g, "")) || "";
    var newUnit = unitArea;
    if (unit == "%") {
        var inputBase = document.querySelector('[data-input="percentBase"]');
        var calcPercentArea = calcNewAreaPercent(replacedValue, Number(inputBase.value.replace(/,/g, ".")));
        if (inputCell && calcPercentArea !== undefined) {
            inputCell.value = "".concat(fixFloat(calcPercentArea)
                .toString()
                .replace(".", ",")).concat(newUnit);
        }
        if (calcPercentArea && calcPercentArea < 0) {
            var result = valueCell - Math.abs(calcPercentArea);
            contentArea.children[1].textContent = "".concat(fixFloat(result)
                .toString()
                .replace(".", ",")).concat(newUnit);
        }
        else if (calcPercentArea && calcPercentArea > 0) {
            var result = valueCell + Math.abs(calcPercentArea);
            contentArea.children[1].textContent = "".concat(fixFloat(result)
                .toString()
                .replace(".", ",")).concat(newUnit);
        }
    }
    else {
        if (replacedValue < 0) {
            var result = valueCell - Math.abs(replacedValue);
            contentArea.children[1].textContent = "".concat(fixFloat(result)
                .toString()
                .replace(".", ",")).concat(newUnit);
        }
        else if (replacedValue > 0) {
            var result = valueCell + Math.abs(replacedValue);
            contentArea.children[1].textContent = "".concat(fixFloat(result)
                .toString()
                .replace(".", ",")).concat(newUnit);
        }
    }
    (_c = contentArea.previousElementSibling) === null || _c === void 0 ? void 0 : _c.children[1].classList.replace("table-value-green", "table-value-orange");
    if (parseFloat(((_d = contentArea.children[1].textContent) === null || _d === void 0 ? void 0 : _d.replace(",", ".")) || "0") === 0) {
        contentArea.children[1].classList.replace("table-value-green", "table-value-orange");
    }
    contentArea.setAttribute("aria-label", contentArea.children[1].textContent || "");
}
export function calcNewPercent(areaReal, selectorPercent) {
    var contentsPercent = document.querySelectorAll(selectorPercent);
    if (!contentsPercent.length)
        return;
    var percents = Array.from(contentsPercent).map(function (percent) {
        var _a, _b, _c;
        var replacedArea = Number((_c = (_b = (_a = percent.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.children[1].textContent) === null || _c === void 0 ? void 0 : _c.replace(/%|ha|m²|m2/g, "").replace(/,/g, "."));
        // calculando porcentagem com área
        var calcPercent = (replacedArea * 100) / areaReal;
        return fixFloat(calcPercent);
    });
    percents.forEach(function (percent, index) {
        var _a;
        contentsPercent[index].textContent = "".concat(percent
            .toString()
            .replace(".", ","), "%");
        (_a = contentsPercent[index].parentElement) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-label", percent
            .toString()
            .replace(/%|ha|m²|m2/g, "")
            .replace(".", ",") || "");
    });
}
