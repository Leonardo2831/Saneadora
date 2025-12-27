import MenuSaneadora from "./MenuSaneadora.js";

export default class DeleteSaneadora extends MenuSaneadora {
    id: string;
    contentMatriculas: HTMLElement | null;

    modalAlert: HTMLElement | null;
    buttonCloseAlert: HTMLElement | null | undefined;
    buttonAcceptAlert: HTMLElement | null | undefined;

    constructor(
        buttonView: string,
        modal: string,
        buttonClose: string,
        url: string,
        contentLoad: string,
        notificationDeleteSaneadora: string,
        modalAlert: string,
        buttonCloseAlert: string,
        buttonAcceptAlert: string
    ) {
        super(
            buttonView,
            modal,
            buttonClose,
            url,
            contentLoad,
            notificationDeleteSaneadora
        );

        this.id = "";
        this.contentMatriculas = null;

        this.modalAlert = document.querySelector(modalAlert);
        this.buttonCloseAlert =
            this.modalAlert?.querySelector(buttonCloseAlert);
        this.buttonAcceptAlert =
            this.modalAlert?.querySelector(buttonAcceptAlert);

        this.verifyClickButtonDelete = this.verifyClickButtonDelete.bind(this);
        this.cancelNotification = this.cancelNotification.bind(this);
        this.deleteMatricula = this.deleteMatricula.bind(this);
    }

    cancelNotification(event: Event) {
        event.stopPropagation();

        this.modalAlert?.parentElement?.parentElement?.parentElement?.classList.add(
            "hidden"
        );
    }

    async deleteMatricula(event: Event) {
        event.stopPropagation();

        try {
            const response: Response = await fetch(`${this.url}/${this.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Erro ao deletar a matricula");

            this.cancelNotification(event);

            if (!this.notificationSaveSaneadora) return;

            this.notificationSaveSaneadora.textContent =
                "Matrícula Deletada com Sucesso";
            this.notificationSaveSaneadora.classList.add("show");

            setTimeout(() => {
                this.notificationSaveSaneadora?.classList.remove(
                    "show",
                    "error"
                );
            }, 1500);
        } catch (error) {
            console.log(error);

            if (!this.notificationSaveSaneadora) return;
            this.notificationSaveSaneadora.textContent =
                "Erro ao Deletar Matrícula, tente novamente mais tarde...";
            this.notificationSaveSaneadora.classList.add("error", "show");

            setTimeout(() => {
                this.notificationSaveSaneadora?.classList.remove(
                    "show",
                    "error"
                );
            }, 1500);
        }
    }

    notificationDelete() {
        this.modalAlert?.parentElement?.parentElement?.parentElement?.classList.remove(
            "hidden"
        );

        if (!this.buttonAcceptAlert || !this.buttonCloseAlert) return;

        this.buttonAcceptAlert?.removeEventListener(
            "click",
            this.deleteMatricula
        );
        this.buttonCloseAlert?.removeEventListener(
            "click",
            this.cancelNotification
        );
        this.buttonAcceptAlert?.addEventListener("click", this.deleteMatricula);
        this.buttonCloseAlert?.addEventListener(
            "click",
            this.cancelNotification
        );
    }

    verifyClickButtonDelete(event: MouseEvent) {
        const buttonDelete = (event.target as HTMLElement).closest(
            '[data-buttonIcon="delete"]'
        );

        if (buttonDelete) {
            this.id = buttonDelete.getAttribute("data-id") || "";
            this.notificationDelete();
        }
    }

    addEventDelete() {
        this.contentMatriculas?.addEventListener(
            "click",
            this.verifyClickButtonDelete
        );
    }
}
