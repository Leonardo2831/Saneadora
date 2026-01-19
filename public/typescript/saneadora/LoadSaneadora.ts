import type { Saneadora } from "../../interface/saneadoraFetch.js";
import initAfterLoad from "../initAfterLoad.js";

export default class LoadSaneadora {
    url: string;

    tableInfosCadastro: HTMLElement | null;
    tableInfosOnus: HTMLElement | null;
    tableInfosNumbers: HTMLElement | null;
    tableInfosEstremacao: HTMLElement | null;

    contentMatriculas: HTMLElement | null;

    contentFinalText: HTMLElement | null;

    notificationSaveSaneadora: HTMLElement | null;
    buttonSave: HTMLElement | null;

    constructor(
        url: string,
        tableInfosCadastro: string,
        tableInfosOnus: string,
        tableInfosNumbers: string,
        tableInfosEstremacao: string,
        contentFinalText: string,
        notificationSaveSaneadora: string,
        buttonSave: string,
    ) {
        this.url = url;

        this.tableInfosCadastro = document.querySelector(tableInfosCadastro);
        this.tableInfosOnus = document.querySelector(tableInfosOnus);
        this.tableInfosNumbers = document.querySelector(tableInfosNumbers);
        this.tableInfosEstremacao =
            document.querySelector(tableInfosEstremacao);

        this.contentFinalText = document.querySelector(contentFinalText);
        this.contentMatriculas = null;

        this.notificationSaveSaneadora = document.querySelector(
            notificationSaveSaneadora,
        );

        this.buttonSave = document.querySelector(buttonSave);

        this.loadingMatricula = this.loadingMatricula.bind(this);
    }

    loadMatricula(data: Saneadora) {
        if (
            !this.tableInfosCadastro ||
            !this.tableInfosOnus ||
            !this.tableInfosNumbers ||
            !this.tableInfosEstremacao ||
            !this.contentFinalText
        )
            return;

        this.tableInfosCadastro.innerHTML = data.tableCadastro || "";
        this.tableInfosOnus.innerHTML = data.tableOnus || "";
        this.tableInfosNumbers.innerHTML = data.tableNumbers || "";
        this.tableInfosEstremacao.innerHTML = data.tableEstremacao || "";

        if (this.buttonSave && data.id) {
            this.buttonSave.setAttribute("data-id", data.id.toString());
        }

        if (this.notificationSaveSaneadora) {
            this.notificationSaveSaneadora.textContent =
                "Matrícula Carregada com Sucesso";
            this.notificationSaveSaneadora.classList.add("show");

            setTimeout(() => {
                this.notificationSaveSaneadora?.classList.remove(
                    "show",
                    "error",
                );
            }, 1500);

            initAfterLoad();
        }
    }

    async loadingMatricula(event: MouseEvent) {
        const matriculaId: string =
            (event.target as HTMLElement).closest("[data-matricula='li']")
                ?.id || "";

        if (!matriculaId) return;

        try {
            const response: Response = await fetch(
                `${this.url}/${matriculaId}`,
                {
                    method: "GET",
                },
            );

            if (!response.ok) throw new Error("Erro ao carregar matrícula");

            const data: Saneadora = await response.json();

            this.loadMatricula(data);
        } catch (error) {
            console.log(error);

            if (this.notificationSaveSaneadora) {
                this.notificationSaveSaneadora.textContent =
                    "Erro ao carregar matrícula, tente novamente mais tarde...";
                this.notificationSaveSaneadora.classList.add("error", "show");

                setTimeout(() => {
                    this.notificationSaveSaneadora?.classList.remove(
                        "show",
                        "error",
                    );
                }, 1500);
            }
        }
    }

    addEventDobleClick(contentMatriculas: HTMLElement) {
        this.contentMatriculas = contentMatriculas;
        this.contentMatriculas.removeEventListener(
            "dblclick",
            this.loadingMatricula,
        );
        contentMatriculas.addEventListener("dblclick", this.loadingMatricula);
    }
}
