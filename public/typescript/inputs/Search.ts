export default class Search {
    private tablesItems: NodeListOf<HTMLTableElement>;
    private inputSearch: HTMLInputElement;
    private classSelected: string;
    private classInfo: string;

    private contentInfo: HTMLElement;
    private classErrorInfo: string;

    constructor(
        tablesItems: string,
        inputSearch: string,
        classSelected: string,
        classInfo: string,
        contentInfo: string,
        classErrorInfo: string,
    ) {
        this.tablesItems = document.querySelectorAll(tablesItems);
        this.inputSearch = document.querySelector(
            inputSearch,
        ) as HTMLInputElement;
        this.classSelected = classSelected;
        this.classInfo = classInfo;

        this.contentInfo = document.querySelector(contentInfo) as HTMLElement;
        this.classErrorInfo = classErrorInfo;

        this.verifyKey = this.verifyKey.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.styledInfo = this.styledInfo.bind(this);
    }

    selectTableItems(
        row: HTMLElement,
        inputValue: string,
        found: { value: boolean; scrolled: boolean },
    ) {
        row?.classList.remove(this.classSelected);

        const inputs = row.querySelectorAll("input");

        inputs.forEach((input) => {
            if (this.cleanString(input.value || "").includes(inputValue)) {
                row.classList.add(this.classSelected);
                found.value = true;

                const cadastroTable = row.closest(
                    '[data-tableInfos="cadastro"]',
                );
                if (cadastroTable && !found.scrolled) {
                    row.scrollIntoView({ behavior: "smooth", block: "center" });
                    found.scrolled = true;
                }
            }
        });
    }

    filterTableItems(inputValue: string) {
        const found = { value: false, scrolled: false };

        this.tablesItems.forEach((table) => {
            const rows = table.querySelectorAll("tr");
            const rowsDiv = table.querySelectorAll("div");
            rows.forEach((row) => {
                this.selectTableItems(row, inputValue, found);
            });
            rowsDiv.forEach((row) => {
                this.selectTableItems(row, inputValue, found);
            });
        });

        if (!found.value && inputValue !== "") {
            this.contentInfo.innerText =
                "Não foi encontrado nada com os dados inseridos";
            this.contentInfo.classList.add("show");
            if (this.classErrorInfo) {
                this.contentInfo.classList.add(this.classErrorInfo);
            }
        } else {
            this.contentInfo.innerText = "";
            this.contentInfo.classList.remove("show");
            if (this.classErrorInfo) {
                this.contentInfo.classList.remove(this.classErrorInfo);
            }
        }
    }

    cleanString(text: string): string {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    cleanText(inputValue: string) {
        const cleanedValue = this.cleanString(inputValue);
        this.filterTableItems(cleanedValue);
    }

    verifyKey(event: KeyboardEvent) {
        if (event.key === "Enter") {
            if (this.inputSearch.value === "") {
                this.removeSelected();
                return;
            }

            this.cleanText(this.inputSearch.value.toLowerCase());
        }
    }

    removeSelected() {
        this.tablesItems.forEach((table) => {
            const rows = table.querySelectorAll("tr");
            const rowsDiv = table.querySelectorAll("div");

            rows.forEach((row) => {
                row.classList.remove(this.classSelected);
            });

            rowsDiv.forEach((row) => {
                row.classList.remove(this.classSelected);
            });
        });

        this.contentInfo.innerText = "";
        this.contentInfo.classList.remove("show");
        if (this.classErrorInfo) {
            this.contentInfo.classList.remove(this.classErrorInfo);
        }
    }

    styledInfo() {
        if (
            !this.inputSearch.classList.contains(this.classInfo) &&
            this.inputSearch.value !== ""
        ) {
            this.inputSearch.parentElement?.nextElementSibling?.classList.add(
                this.classInfo,
            );
        } else {
            this.inputSearch.parentElement?.nextElementSibling?.classList.remove(
                this.classInfo,
            );
        }
    }

    addEventInput() {
        this.inputSearch.addEventListener("keydown", this.verifyKey);
        this.inputSearch.addEventListener("blur", this.removeSelected);
        this.inputSearch.addEventListener("focus", this.removeSelected);
        this.inputSearch.addEventListener("input", this.styledInfo);
    }

    init() {
        this.addEventInput();
        return this;
    }
}