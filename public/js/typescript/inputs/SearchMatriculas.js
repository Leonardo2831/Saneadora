var SearchMatriculas = /** @class */ (function () {
    function SearchMatriculas(contentMatriculas, inputSearch, classSelected, classVisible) {
        this.contentMatriculasSelector = contentMatriculas;
        this.contentMatriculas = document.querySelector(this.contentMatriculasSelector);
        this.inputSearch = document.querySelector(inputSearch);
        this.classSelected = classSelected;
        this.classVisible = classVisible || "hidden";
        this.cleanText = this.cleanText.bind(this);
    }
    SearchMatriculas.prototype.cleanString = function (text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };
    SearchMatriculas.prototype.filterMatriculas = function (inputValue) {
        var _this = this;
        var _a;
        var rowsMatriculas = (_a = this.contentMatriculas) === null || _a === void 0 ? void 0 : _a.querySelectorAll("li");
        if (!(rowsMatriculas === null || rowsMatriculas === void 0 ? void 0 : rowsMatriculas.length))
            return;
        rowsMatriculas.forEach(function (row) {
            if (!row)
                return;
            row.classList.remove(_this.classSelected);
            row.classList.add(_this.classVisible);
        });
        if (inputValue == "") {
            rowsMatriculas.forEach(function (row) {
                if (!row)
                    return;
                row.classList.remove(_this.classVisible);
            });
            return;
        }
        ;
        rowsMatriculas.forEach(function (row) {
            if (!row)
                return;
            if (_this.cleanString(row.textContent || "").includes(inputValue)) {
                row.classList.add(_this.classSelected);
                row.classList.remove(_this.classVisible);
            }
        });
    };
    SearchMatriculas.prototype.cleanText = function () {
        this.contentMatriculas = document.querySelector(this.contentMatriculasSelector);
        var cleanedValue = this.cleanString(this.inputSearch.value);
        this.filterMatriculas(cleanedValue);
    };
    SearchMatriculas.prototype.addEventInput = function () {
        this.inputSearch.addEventListener("input", this.cleanText);
    };
    SearchMatriculas.prototype.init = function () {
        if (this.inputSearch)
            this.addEventInput();
        return this;
    };
    return SearchMatriculas;
}());
export default SearchMatriculas;
