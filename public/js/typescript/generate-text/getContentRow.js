export default function arrayContentRow(table) {
    var _a;
    var textRow = [];
    if ((_a = table === null || table === void 0 ? void 0 : table.children) === null || _a === void 0 ? void 0 : _a.length) {
        textRow = Array.from(table === null || table === void 0 ? void 0 : table.children).map(function (childItem) {
            return Array.from(childItem.children).map(function (item) {
                return (item.getAttribute("aria-label") ||
                    item.textContent.trim() ||
                    "");
            });
        });
    }
    return textRow;
}
