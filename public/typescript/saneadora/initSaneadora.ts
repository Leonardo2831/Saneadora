import type { Saneadora } from "../../interface/saneadoraFetch";
import initAfterLoad from "../initAfterLoad.js";

async function fetchSaneadora(url: string, alertError: string) {
    const alertErrorElement: HTMLElement | null =
        document.querySelector(alertError);

    if (!alertErrorElement) return;

    try {
        const response: Response = await fetch(url, {
            method: "GET",
        });

        alertErrorElement.textContent = "Matrícula Aberta com Sucesso";
        alertErrorElement.classList.add("show");

        setTimeout(() => {
            alertErrorElement.classList.remove("show", "error");
        }, 1500);

        const data: Saneadora[] = await response.json();

        if (!data?.length) throw new Error("Nenhuma matricula encontrada");

        return data;
    } catch (error) {
        console.log(error);

        alertErrorElement.textContent =
            "Erro ao Abrir Matricula, tente novamente mais tarde...";
        alertErrorElement.classList.add("error");

        setTimeout(() => {
            alertErrorElement.classList.remove("show", "error");
        }, 1500);
    }
}

export default async function initSaneadoraDocument(
    url: string,
    tableCadastro: string,
    tableOnus: string,
    tableNumeros: string,
    tableEstremacao: string,
    contentFinalText: string,
    buttonSave: string,
    alertError: string,
): Promise<void> {
    if (
        !tableCadastro ||
        !tableOnus ||
        !tableNumeros ||
        !tableEstremacao ||
        !contentFinalText
    )
        return;

    const tables: {
        tableCadastro: HTMLElement | null;
        tableOnus: HTMLElement | null;
        tableNumeros: HTMLElement | null;
        tableEstremacao: HTMLElement | null;
        contentTextFinal: HTMLElement | null;
    } = {
        tableCadastro: document.querySelector(tableCadastro),
        tableOnus: document.querySelector(tableOnus),
        tableNumeros: document.querySelector(tableNumeros),
        tableEstremacao: document.querySelector(tableEstremacao),
        contentTextFinal: document.querySelector(contentFinalText),
    };

    if (!url) return;

    const data: Saneadora[] | undefined = await fetchSaneadora(url, alertError);

    const buttonSaveElement: HTMLElement | null =
        document.querySelector(buttonSave);

    if (
        !tables.tableCadastro ||
        !tables.tableOnus ||
        !tables.tableNumeros ||
        !tables.tableEstremacao ||
        !tables.contentTextFinal ||
        !buttonSaveElement
    )
        return;

    tables.tableCadastro.innerHTML = "";
    tables.tableOnus.innerHTML = "";
    tables.tableNumeros.innerHTML = "";
    tables.tableEstremacao.innerHTML = "";

    if (!data?.length) return;

    buttonSaveElement.setAttribute(
        "data-id",
        data![data!.length - 1].id.toString(),
    );

    tables.tableCadastro.innerHTML = data![data!.length - 1].tableCadastro;
    tables.tableOnus.innerHTML = data![data!.length - 1].tableOnus;
    tables.tableNumeros.innerHTML = data![data!.length - 1].tableNumbers;
    tables.tableEstremacao.innerHTML = data![data!.length - 1].tableEstremacao;

    initAfterLoad();
}
