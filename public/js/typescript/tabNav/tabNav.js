var TabNav = /** @class */ (function () {
    function TabNav(listButtons, listSections, listTables, classActive, classTableActive) {
        this.listButtons = document.querySelectorAll(listButtons);
        this.listSections = document.querySelectorAll(listSections);
        this.listTables = document.querySelectorAll(listTables);
        this.classActive = classActive;
        this.classTableActive = classTableActive || 'hidden';
        this.setTargetActive = this.setTargetActive.bind(this);
    }
    TabNav.prototype.navigationTab = function (index) {
        var _this = this;
        this.listSections.forEach(function (listSection) {
            listSection.dataset.form = "false";
        });
        this.listSections[index].dataset.form = "true";
        if (this.classTableActive === 'hidden') {
            this.listTables.forEach(function (listTable) {
                listTable.classList.add(_this.classTableActive);
            });
            this.listTables[index].classList.remove(this.classTableActive);
        }
        else {
            this.listTables.forEach(function (listTable) {
                listTable.classList.remove(_this.classTableActive);
            });
            this.listTables[index].classList.add(this.classTableActive);
        }
    };
    TabNav.prototype.setTargetActive = function (currentTarget, index) {
        var _this = this;
        this.listButtons.forEach(function (listButton) {
            listButton.classList.remove(_this.classActive);
        });
        this.navigationTab(index);
        currentTarget.classList.add(this.classActive);
    };
    TabNav.prototype.addEventTabNav = function () {
        var _this = this;
        this.listButtons.forEach(function (listButton, index) {
            listButton.addEventListener("click", function (event) {
                _this.setTargetActive(event.currentTarget, index);
            });
        });
    };
    TabNav.prototype.changeListTables = function (newListTables) {
        this.listTables = document.querySelectorAll(newListTables);
    };
    TabNav.prototype.firstTab = function () {
        return this.listButtons[0];
    };
    TabNav.prototype.init = function () {
        if (this.listButtons.length && this.listSections.length) {
            this.firstTab().classList.add(this.classActive);
            this.addEventTabNav();
        }
        return this;
    };
    return TabNav;
}());
export default TabNav;
