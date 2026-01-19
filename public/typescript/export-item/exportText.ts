export default function exportText(button: HTMLElement, text: string) {
    button.addEventListener("click", () => {
        const blob = new Blob(["\ufeff", text], {
            type: "application/msword",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download =
            "texto saneadora matrícula " +
            button.getAttribute("data-textExport") +
            ".doc";
        a.click();
        URL.revokeObjectURL(url);
    });
}