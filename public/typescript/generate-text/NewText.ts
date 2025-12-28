import Quill from "quill";
import type { Parchment } from "quill";
import type { QuillOptions } from "quill/core";

import contentText from "./contentText.js";

export default class NewText {
    private textFinalContent: HTMLElement | null;

    private modal: HTMLElement | null;
    private classAnimateModal: string;
    private containerQuill: HTMLElement | null;

    private buttonClose: HTMLElement | null;
    private buttonOpen: HTMLElement | null;
    private buttonGenerateText: HTMLElement | null;

    private quill: Quill | HTMLTextAreaElement;

    constructor(
        textFinalContent: string,
        modal: string,
        classAnimateModal: string,
        buttonClose: string,
        buttonOpen: string,
        buttonGenerateText: string,
        selectorQuill: string,
        optionsQuill: QuillOptions
    ) {
        this.textFinalContent = document.querySelector(textFinalContent);

        this.modal = document.querySelector(modal);
        this.classAnimateModal = classAnimateModal;

        this.buttonClose = document.querySelector(buttonClose);
        this.buttonOpen = document.querySelector(buttonOpen);
        this.buttonGenerateText = document.querySelector(buttonGenerateText);

        this.containerQuill = document.querySelector(selectorQuill);

        try {
            this.quill = new Quill(selectorQuill, optionsQuill);
        } catch (error) {
            console.log(error);

            if (this.containerQuill) this.containerQuill.innerHTML = "";

            const area: HTMLTextAreaElement =
                document.createElement("textarea");
            area.classList.add(
                "w-full h-80 p-4 border border-gray-300 rounded-lg outline-none resize-none text-gray-700"
            );
            area.placeholder = "Escreva o início da matrícula e sua origem.";

            if (this.containerQuill) this.containerQuill.appendChild(area);
            this.quill = area;
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.generateText = this.generateText.bind(this);

        const Font = Quill.import("formats/font") as Parchment.ClassAttributor;
        Font.whitelist = ["inter", "arial", "serif", "sans-serif", "monospace"];
        Quill.register(Font, true);
    }

    closeModal() {
        this.modal?.classList.remove(this.classAnimateModal);
    }

    generateText() {
        let textInitialMatricula: string = "";

        if (this.quill instanceof HTMLTextAreaElement) {
            textInitialMatricula = this.quill.value;
        } else if (this.quill instanceof Quill) {
            textInitialMatricula = this.quill.root.innerHTML;
        }

        if (!this.textFinalContent) return;

        this.textFinalContent.innerHTML = contentText(textInitialMatricula);
        this.closeModal();
    }

    openModal() {
        this.modal?.classList.add(this.classAnimateModal);

        this.buttonGenerateText?.addEventListener("click", this.generateText);
    }

    addEventsButtons() {
        this.buttonOpen?.addEventListener("click", this.openModal);
        this.buttonClose?.addEventListener("click", this.closeModal);
    }

    init() {
        if (this.buttonOpen && this.buttonClose && this.modal)
            this.addEventsButtons();

        return this;
    }
}
