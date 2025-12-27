import TabNav from "../tabNav/tabNav.js";
import ClickOutside from "../ClickOutside.js";
import valuesSaneadora from "./documentValues.js";
import initAfterLoad from "../initAfterLoad.js";

export default class DocumentSaneadora {
    private newSaneadoraButton: HTMLButtonElement;
    private buttonFormCancel: HTMLButtonElement;
    private buttonFormNew: HTMLButtonElement;
    private modalNewSaneadora: HTMLElement;

    private contentTextFinal: HTMLElement;

    private tabNav: TabNav;
    private tabInit: HTMLElement | null;

    private clickOutsideEvent: ClickOutside;
    private classActiveModal: string;

    constructor(
        newSaneadoraButton: string,
        buttonFormCancel: string,
        buttonFormNew: string,
        modalNewSaneadora: string,
        contentTextFinal: string,
        tabNavValues: string[],
        classActiveModal?: string
    ) {
        this.newSaneadoraButton = document.querySelector(
            newSaneadoraButton
        ) as HTMLButtonElement;
        this.buttonFormCancel = document.querySelector(
            buttonFormCancel
        ) as HTMLButtonElement;
        this.buttonFormNew = document.querySelector(
            buttonFormNew
        ) as HTMLButtonElement;

        this.modalNewSaneadora = document.querySelector(
            modalNewSaneadora
        ) as HTMLElement;

        this.contentTextFinal = document.querySelector(
            contentTextFinal
        ) as HTMLElement;

        this.tabNav = new TabNav(
            ...(tabNavValues as [string, string, string, string, string])
        );
        this.tabInit = this.tabNav.firstTab();

        this.clickOutsideEvent = new ClickOutside(
            this.modalNewSaneadora,
            "data-outside",
            "click",
            this.changeStyleOutside.bind(this)
        );

        this.classActiveModal = classActiveModal || "hidden";
    }

    changeStyleOutside() {
        this.tabNav.setTargetActive(this.tabInit as HTMLElement, 0);
        this.clickOutsideEvent.removeEventClickOutside();
        this.modalNewSaneadora?.parentElement?.parentElement?.parentElement?.classList.add(
            this.classActiveModal
        );
    }

    addEventFormButtons() {
        this.buttonFormNew?.addEventListener("click", () => {
            const result = valuesSaneadora();

            if (result) {
                this.changeStyleOutside();
                this.tabNav.changeListTables("[data-tableInfos]");
                initAfterLoad();
                this.contentTextFinal.innerHTML = "";
            }
        });

        this.buttonFormCancel?.addEventListener("click", () => {
            this.changeStyleOutside();
        });
    }

    addEventNewDocument() {
        this.newSaneadoraButton?.addEventListener("click", (event) => {
            event.stopPropagation();

            this.clickOutsideEvent.init();

            this.modalNewSaneadora?.parentElement?.parentElement?.parentElement?.classList.remove(
                this.classActiveModal
            );
        });
    }

    init() {        
        if (this.newSaneadoraButton) this.addEventNewDocument();
        if (this.buttonFormCancel) this.addEventFormButtons();

        if (this.tabNav) this.tabNav.init();

        return this;
    }
}
