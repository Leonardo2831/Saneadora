import ClickOutside from "../ClickOutside.js";

export default class MenuSaneadora {
    protected url: string;

    buttonView: HTMLElement | null;
    buttonClose: HTMLElement | null;

    modal: HTMLElement | null;
    contentLoad: HTMLElement | null;

    clickOutside: ClickOutside | null;

    notificationSaveSaneadora: HTMLElement | null;

    constructor(
        buttonView: string,
        modal: string,
        buttonClose: string,
        url: string,
        contentLoad: string,
        notificationSaveSaneadora: string
    ) {
        this.buttonView = document.querySelector(buttonView);
        this.buttonClose = document.querySelector(buttonClose);

        this.modal = document.querySelector(modal);
        this.contentLoad = document.querySelector(contentLoad);

        this.notificationSaveSaneadora = document.querySelector(
            notificationSaveSaneadora
        );

        this.url = url;

        this.clickOutside = null;

        this.openModal = this.openModal.bind(this);
    }

    addEventCloseModalButton() {
        if (!this.buttonClose) return;

        this.buttonClose.addEventListener("click", () => {
            this.modal?.parentElement?.parentElement?.parentElement?.classList.add(
                "hidden"
            );
            this.clickOutside?.removeEventClickOutside();
            this.clickOutside = null;
        });
    }

    createSpanLoad(): HTMLSpanElement {
        const spanLoad = document.createElement("span");
        const classesSpanLoad: string[] = [
            "w-12",
            "h-12",
            "border-4",
            "border-gray-200",
            "border-t-blue-500",
            "rounded-full",
            "animate-spin",
        ];
        spanLoad.classList.add(...classesSpanLoad);

        return spanLoad;
    }

    openModal() {
        if (!this.modal) return;

        this.modal.parentElement?.parentElement?.parentElement?.classList.remove(
            "hidden"
        );

        this.clickOutside = new ClickOutside(
            this.modal,
            "data-outside",
            "click",
            () => {
                if (this.contentLoad) this.contentLoad.innerHTML = "";
                this.contentLoad?.appendChild(this.createSpanLoad());

                if (this.clickOutside)
                    this.clickOutside.removeEventClickOutside();
                this.modal?.parentElement?.parentElement?.parentElement?.classList.add(
                    "hidden"
                );
                this.clickOutside = null;
            }
        );
        this.clickOutside.init();
        this.addEventCloseModalButton();
    }

    addEventOpenModal() {
        this.buttonView?.addEventListener("click", this.openModal);
    }

    init() {
        if (this.buttonView) this.addEventOpenModal();

        return;
    }
}
