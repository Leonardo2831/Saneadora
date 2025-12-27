export default class SearchMatriculas {
    private contentMatriculasSelector: string;
    private contentMatriculas: HTMLElement | null;
    private inputSearch: HTMLInputElement;

    private classSelected: string;
    private classVisible: string;

    constructor(
        contentMatriculas: string,
        inputSearch: string,
        classSelected: string,
        classVisible?: string
    ) {
        this.contentMatriculasSelector = contentMatriculas;
        this.contentMatriculas = document.querySelector(this.contentMatriculasSelector);
        this.inputSearch = document.querySelector(
            inputSearch
        ) as HTMLInputElement;

        this.classSelected = classSelected;
        this.classVisible = classVisible || "hidden";

        this.cleanText = this.cleanText.bind(this);
    }

    cleanString(text: string): string {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    filterMatriculas(inputValue: string): void {
        const rowsMatriculas: NodeListOf<HTMLLIElement> | undefined =
            this.contentMatriculas?.querySelectorAll("li");

        if (!rowsMatriculas?.length) return;

        rowsMatriculas.forEach((row: HTMLLIElement | undefined) => {
            if (!row) return;
            row.classList.remove(this.classSelected);
            row.classList.add(this.classVisible);
        });

        if (inputValue == "") {
            rowsMatriculas.forEach((row: HTMLLIElement | undefined) => {
                if (!row) return;
                row.classList.remove(this.classVisible);
            });
            
            return;
        };

        rowsMatriculas.forEach((row: HTMLLIElement | undefined) => {
            if (!row) return;
            if (this.cleanString(row.textContent || "").includes(inputValue)) {
                row.classList.add(this.classSelected);
                row.classList.remove(this.classVisible);
            }
        });
    }

    cleanText() {
        this.contentMatriculas = document.querySelector(this.contentMatriculasSelector);
        const cleanedValue = this.cleanString(this.inputSearch.value);
        this.filterMatriculas(cleanedValue);
    }

    addEventInput(): void {
        this.inputSearch.addEventListener("input", this.cleanText);
    }

    init() {
        if (this.inputSearch) this.addEventInput();

        return this;
    }
}
