export default function sumValue(selector, contentSelectorSum, unit) {
    var itemsSum = document.querySelectorAll(selector);
    var contentSum = document.querySelector(contentSelectorSum);
    if (!itemsSum.length || !contentSum)
        return;
    // o reduce no primeiro parâmetro retorna o valor anterior.
    var sumValue = Array.from(itemsSum).reduce(function (total, valueContent) {
        var _a;
        var rawVal = ((_a = valueContent.textContent) === null || _a === void 0 ? void 0 : _a.replace(",", ".")) || "";
        var val = Number(rawVal.replace(/ha|m2|m²|%/g, ""));
        return total + (isNaN(val) ? 0 : val);
    }, 0);
    contentSum.textContent = '';
    contentSum.textContent = "".concat(sumValue
        .toString()
        .replace(".", ",")).concat(unit);
}
