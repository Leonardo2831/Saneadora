import ClickOutside from "./ClickOutside.js";

export default class NewUpdate {
    modal: HTMLElement | null;
    button: HTMLElement | null;
    buttonClose: HTMLElement | null;

    clickOutside: ClickOutside | null;
    infoNews: HTMLElement | null;

    constructor(
        modal: string,
        button: string,
        buttonClose: string,
        infoNews: string
    ) {
        this.modal = document.querySelector(modal);

        this.button = document.querySelector(button);
        this.buttonClose = document.querySelector(buttonClose);

        this.infoNews = document.querySelector(infoNews);

        this.clickOutside = null;

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.removeInfoNews = this.removeInfoNews.bind(this);
    }

    removeInfoNews(event: Event) {
        event.stopPropagation();
        this.button?.remove();
    }

    closeModal() {
        this.modal?.parentElement?.parentElement?.parentElement?.classList.add(
            "hidden"
        );
        this.clickOutside?.removeEventClickOutside();
        this.clickOutside = null;
    }

    openModal() {
        if (!this.modal) return;

        this.modal?.parentElement?.parentElement?.parentElement?.classList.remove(
            "hidden"
        );
        if (this.clickOutside) this.clickOutside.removeEventClickOutside();
        this.clickOutside = new ClickOutside(
            this.modal,
            "data-outside",
            "click",
            this.closeModal
        ).init();
    }

    addEvents() {
        this.button?.addEventListener("click", this.openModal);
        this.buttonClose?.addEventListener("click", this.closeModal);
        this.infoNews?.addEventListener("click", this.removeInfoNews);
    }

    init() {
        if (this.modal && this.button && this.buttonClose && this.infoNews)
            this.addEvents();
        return this;
    }
}
