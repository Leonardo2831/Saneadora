import type { Saneadora } from "../../interface/saneadoraFetch";

export default class SaveSaneadora {
    buttonSave: HTMLElement | null;
    notificationSelector: string;

    selectorCadastro: string;
    selectorOnus: string;
    selectorNumbers: string;
    selectorEstremacao: string;

    tableInfosCadastro: HTMLElement | null;
    tableInfosOnus: HTMLElement | null;
    tableInfosNumbers: HTMLElement | null;
    tableInfosEstremacao: HTMLElement | null;

    contentFinalText: HTMLElement | null;

    notificationSaveSaneadora: HTMLElement;

    observerChange: MutationObserver | null;

    url: string;
    configObserver: object;

    countObserver: number;

    constructor(
        buttonSave: string,
        notificationSelector: string,
        tableInfosCadastro: string,
        tableInfosOnus: string,
        tableInfosNumbers: string,
        tableInfosEstremacao: string,
        contentFinalText: string,
        notificationSaveSaneadora: string,
        url: string,
        configObserver: object,
        countObserver: number
    ) {
        this.buttonSave = document.querySelector(buttonSave);
        this.notificationSelector = notificationSelector;

        this.selectorCadastro = tableInfosCadastro;
        this.selectorOnus = tableInfosOnus;
        this.selectorNumbers = tableInfosNumbers;
        this.selectorEstremacao = tableInfosEstremacao;

        this.tableInfosCadastro = document.querySelector(this.selectorCadastro);
        this.tableInfosOnus = document.querySelector(this.selectorOnus);
        this.tableInfosNumbers = document.querySelector(this.selectorNumbers);
        this.tableInfosEstremacao = document.querySelector(
            this.selectorEstremacao
        );

        this.contentFinalText = document.querySelector(contentFinalText);

        this.notificationSaveSaneadora = document.querySelector(
            notificationSaveSaneadora
        ) as HTMLElement;

        this.url = url;

        this.observerChange = null;
        this.configObserver = configObserver;

        this.countObserver = countObserver;

        this.addInfoChange = this.addInfoChange.bind(this);
        this.save = this.save.bind(this);
    }

    async save() {
        this.tableInfosCadastro = document.querySelector(this.selectorCadastro);
        this.tableInfosOnus = document.querySelector(this.selectorOnus);
        this.tableInfosNumbers = document.querySelector(this.selectorNumbers);
        this.tableInfosEstremacao = document.querySelector(
            this.selectorEstremacao
        );

        const matricula: HTMLElement | null | undefined =
            this.tableInfosCadastro?.querySelector("[data-matricula]");

        if (
            !this.tableInfosCadastro ||
            !this.tableInfosOnus ||
            !this.tableInfosNumbers ||
            !this.tableInfosEstremacao
        ) {
            return;
        }

        let idAttribute : string | null | undefined;
        console.log(this.countObserver);
        
        if(this.countObserver > 1) idAttribute = this.buttonSave?.getAttribute("data-id");

        const saneadoraObject: Saneadora = {
            id: idAttribute ? idAttribute : new Date().getTime().toString(),
            // criar modal para escrever nome
            nome: "Matricula " + matricula?.textContent,
            tableCadastro: this.tableInfosCadastro?.innerHTML,
            tableOnus: this.tableInfosOnus?.innerHTML,
            tableNumbers: this.tableInfosNumbers?.innerHTML,
            tableEstremacao: this.tableInfosEstremacao?.innerHTML,
            textSaneadora: this.contentFinalText?.innerHTML || "",
        };

        const method = idAttribute ? "PUT" : "POST";
        const urlReq = idAttribute ? `${this.url}/${idAttribute}` : this.url;

        try {
            const response = await fetch(urlReq, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(saneadoraObject),
            });

            if (!response.ok) throw new Error("Erro ao salvar matrícula");

            const notification = this.buttonSave?.querySelector(
                this.notificationSelector
            );

            if (notification) notification.classList.add("hidden");

            if (!this.notificationSaveSaneadora) return;

            this.notificationSaveSaneadora.textContent =
                "Matricula Salva com Sucesso";
            this.notificationSaveSaneadora.classList.add("show");

            setTimeout(() => {
                this.notificationSaveSaneadora.classList.remove(
                    "show",
                    "error"
                );
            }, 1500);
        } catch (error) {
            console.log(error);

            if (!this.notificationSaveSaneadora) return;

            this.notificationSaveSaneadora.textContent =
                "Erro ao Salvar Matrícula, tente novamente mais tarde...";
            this.notificationSaveSaneadora.classList.add("error", "show");

            setTimeout(() => {
                this.notificationSaveSaneadora.classList.remove(
                    "show",
                    "error"
                );
            }, 1500);
        }
    }

    automaticSave(notification: HTMLElement) {
        if(notification.classList.contains('hidden')) return;

        const timeSave = 5 * 60 * 1000;

        setTimeout(async () => {
            await this.save();
        }, timeSave);
    }

    addInfoChange(): void {
        this.countObserver++;

        this.tableInfosCadastro = document.querySelector(this.selectorCadastro);
        this.tableInfosOnus = document.querySelector(this.selectorOnus);
        this.tableInfosNumbers = document.querySelector(this.selectorNumbers);
        this.tableInfosEstremacao = document.querySelector(
            this.selectorEstremacao
        );

        const notification: HTMLElement | null | undefined = this.buttonSave?.querySelector(
            this.notificationSelector
        );

        if (!notification) return;
        if (this.countObserver > 1) notification.classList.remove("hidden");

        if (this.buttonSave?.getAttribute("data-id")) this.automaticSave(notification);

        this.buttonSave?.removeEventListener("click", this.save);
        this.buttonSave?.addEventListener("click", this.save);
    }

    verifyChange() {
        if (!this.observerChange)
            this.observerChange = new MutationObserver(this.addInfoChange);

        this.observerChange?.observe(
            this.tableInfosCadastro as HTMLElement,
            this.configObserver
        );
        this.observerChange?.observe(
            this.tableInfosOnus as HTMLElement,
            this.configObserver
        );
        this.observerChange?.observe(
            this.tableInfosNumbers as HTMLElement,
            this.configObserver
        );
        this.observerChange?.observe(
            this.tableInfosEstremacao as HTMLElement,
            this.configObserver
        );
    }

    init() {
        if (this.buttonSave) this.verifyChange();
        this.addInfoChange();

        return this;
    }
}
