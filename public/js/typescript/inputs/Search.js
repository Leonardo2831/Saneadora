var Search = /** @class */ (function () {
    function Search(tablesItems, inputSearch, classSelected, classInfo) {
        this.tablesItems = document.querySelectorAll(tablesItems);
        // Tem que colocar o as porque o typescript entende como um HTMLElement
        this.inputSearch = document.querySelector(inputSearch);
        this.classSelected = classSelected;
        this.classInfo = classInfo;
        this.verifyKey = this.verifyKey.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.styledInfo = this.styledInfo.bind(this);
    }
    Search.prototype.selectTableItems = function (row, inputValue) {
        var _this = this;
        row === null || row === void 0 ? void 0 : row.classList.remove(this.classSelected);
        var inputs = row.querySelectorAll("input");
        inputs.forEach(function (input) {
            if (_this.cleanString(input.value || "").includes(inputValue)) {
                row.classList.add(_this.classSelected);
            }
        });
    };
    Search.prototype.filterTableItems = function (inputValue) {
        var _this = this;
        this.tablesItems.forEach(function (table) {
            var rows = table.querySelectorAll("tr");
            var rowsDiv = table.querySelectorAll("div");
            rows.forEach(function (row) {
                _this.selectTableItems(row, inputValue);
            });
            rowsDiv.forEach(function (row) {
                _this.selectTableItems(row, inputValue);
            });
        });
    };
    Search.prototype.cleanString = function (text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };
    Search.prototype.cleanText = function (inputValue) {
        var cleanedValue = this.cleanString(inputValue);
        this.filterTableItems(cleanedValue);
    };
    Search.prototype.verifyKey = function (event) {
        if (event.key === 'Enter') {
            if (this.inputSearch.value === "")
                return;
            this.cleanText(this.inputSearch.value.toLowerCase());
        }
    };
    Search.prototype.removeSelected = function () {
        var _this = this;
        this.tablesItems.forEach(function (table) {
            var rows = table.querySelectorAll("tr");
            var rowsDiv = table.querySelectorAll("div");
            rows.forEach(function (row) {
                row.classList.remove(_this.classSelected);
            });
            rowsDiv.forEach(function (row) {
                row.classList.remove(_this.classSelected);
            });
        });
    };
    Search.prototype.styledInfo = function () {
        var _a, _b, _c, _d;
        if (!this.inputSearch.classList.contains(this.classInfo) && this.inputSearch.value !== "") {
            (_b = (_a = this.inputSearch.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.add(this.classInfo);
        }
        else {
            (_d = (_c = this.inputSearch.parentElement) === null || _c === void 0 ? void 0 : _c.nextElementSibling) === null || _d === void 0 ? void 0 : _d.classList.remove(this.classInfo);
        }
    };
    Search.prototype.addEventInput = function () {
        this.inputSearch.addEventListener('keydown', this.verifyKey);
        this.inputSearch.addEventListener('blur', this.removeSelected);
        this.inputSearch.addEventListener('focus', this.removeSelected);
        this.inputSearch.addEventListener('input', this.styledInfo);
    };
    Search.prototype.init = function () {
        this.addEventInput();
        return this;
    };
    return Search;
}());
export default Search;
