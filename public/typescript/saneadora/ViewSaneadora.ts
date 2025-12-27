import type { Saneadora } from "../../interface/saneadoraFetch.js";
import DeleteSaneadora from "./DeleteSaneadora.js";
import LoadSaneadora from "./LoadSaneadora.js";

export default class ViewSaneadora extends DeleteSaneadora {
    loadSaneadora: LoadSaneadora;

    constructor(
        buttonView: string,
        modal: string,
        buttonClose: string,
        url: string,
        contentLoad: string,
        notificationSaveSaneadora: string,
        modalAlert: string,
        buttonCloseAlert: string,
        buttonAcceptAlert: string,
        // Selectors for LoadSaneadora
        tableInfosCadastro: string,
        tableInfosOnus: string,
        tableInfosNumbers: string,
        tableInfosEstremacao: string,
        contentFinalText: string,
        buttonSave: string,
    ) {
        super(
            buttonView,
            modal,
            buttonClose,
            url,
            contentLoad,
            notificationSaveSaneadora,
            modalAlert,
            buttonCloseAlert,
            buttonAcceptAlert
        );

        this.loadSaneadora = new LoadSaneadora(
            url,
            tableInfosCadastro,
            tableInfosOnus,
            tableInfosNumbers,
            tableInfosEstremacao,
            contentFinalText,
            notificationSaveSaneadora,
            buttonSave,
        );
    }

    addMatriculas(data: Saneadora[] | undefined): void {
        if (!data) return;

        const matriculasLi = data.map((matricula: Saneadora) => {
            return this.createMatricula(matricula);
        });

        if (!this.contentMatriculas) {
            const contentMatriculas: HTMLElement = document.createElement("ul");
            contentMatriculas.classList.add("list-matriculas");
            contentMatriculas.setAttribute("data-content", "matriculas");
            this.contentMatriculas = contentMatriculas;
        }

        this.contentMatriculas.innerHTML = "";
        this.contentMatriculas?.append(...matriculasLi);

        this.contentLoad?.parentElement?.insertBefore(
            this.contentMatriculas,
            this.contentLoad
        );

        this.addEventDelete();
        this.loadSaneadora.addEventDobleClick(this.contentMatriculas);
    }

    async openModal() {
        super.openModal();
        // passar com await para resolver a promisse antes de passa como parâmetro
        this.addMatriculas(await this.fetchMatriculas());
    }

    createMatricula(matricula: Saneadora) {
        const li = document.createElement("li");
        li.setAttribute("id", String(matricula.id));
        li.setAttribute("data-matricula", "li");

        const contentLi: string = `
            <span>${matricula.nome}</span>
                <svg
                    data-buttonIcon="delete"
                    data-id="${matricula.id}"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                    class="cursor-pointer p-1 w-8 h-8 text-gray-600 hover:text-red-400 transition-colors"
                >
                    <path
                        d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"
                    />
            </svg>
        `;

        li.innerHTML = contentLi;
        return li;
    }

    async fetchMatriculas(): Promise<Saneadora[] | undefined> {
        try {
            if (!this.url) throw new Error("URL not found");

            const response: Response = await fetch(this.url, {
                method: "GET",
            });
            const data = await response.json();

            if (this.contentLoad) this.contentLoad.innerHTML = "";

            return data;
        } catch (error) {
            console.log(error);

            if (!this.contentLoad) return;

            const infoError: HTMLElement = document.createElement("p");
            const classesInfoError: string[] = [
                "text-center",
                "text-red-500",
                "font-bold",
                "text-lg",
                "my-5",
            ];
            infoError.classList.add(...classesInfoError);
            infoError.textContent =
                "Erro ao carregar as matrículas, tente novamente mais tarde";

            this.contentLoad.innerHTML = "";
            this.contentLoad.appendChild(infoError);
        }
    }
}
