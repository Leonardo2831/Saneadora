export default class Search{
    private tablesItems : NodeListOf<HTMLTableElement>;
    private inputSearch : HTMLInputElement;
    private classSelected : string;
    private classInfo : string;
    
    constructor(tablesItems : string, inputSearch : string, classSelected : string, classInfo : string){
        this.tablesItems = document.querySelectorAll(tablesItems);
        // Tem que colocar o as porque o typescript entende como um HTMLElement
        this.inputSearch = document.querySelector(inputSearch) as HTMLInputElement;
        this.classSelected = classSelected;
        this.classInfo = classInfo;

        this.verifyKey = this.verifyKey.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.styledInfo = this.styledInfo.bind(this);
    }

    selectTableItems(row : HTMLElement, inputValue : string){
        row?.classList.remove(this.classSelected);

        const inputs = row.querySelectorAll("input");

        inputs.forEach((input) => {
            if(this.cleanString(input.value || "").includes(inputValue)){
                row.classList.add(this.classSelected);
            }
        });
    }

    filterTableItems(inputValue : string){
        this.tablesItems.forEach((table) => {
            const rows = table.querySelectorAll("tr");
            const rowsDiv = table.querySelectorAll("div");
            rows.forEach((row) => {
                this.selectTableItems(row, inputValue);
            });
            rowsDiv.forEach((row) => {
                this.selectTableItems(row, inputValue);
            });
        });
    }

    cleanString(text: string): string {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    cleanText(inputValue : string){
        const cleanedValue = this.cleanString(inputValue);
        this.filterTableItems(cleanedValue);
    }

    verifyKey(event : KeyboardEvent){
        if(event.key === 'Enter'){
            if(this.inputSearch.value === "") return;

            this.cleanText(this.inputSearch.value.toLowerCase());
        }
    }

    removeSelected(){
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
    }

    styledInfo(){        
        if(!this.inputSearch.classList.contains(this.classInfo) && this.inputSearch.value !== ""){
            this.inputSearch.parentElement?.nextElementSibling?.classList.add(this.classInfo);
        } else {
            this.inputSearch.parentElement?.nextElementSibling?.classList.remove(this.classInfo);
        }
    }

    addEventInput(){
        this.inputSearch.addEventListener('keydown', this.verifyKey);
        this.inputSearch.addEventListener('blur', this.removeSelected);
        this.inputSearch.addEventListener('focus', this.removeSelected);
        this.inputSearch.addEventListener('input', this.styledInfo);
    }

    init(){
        this.addEventInput();
        return this;
    }
}