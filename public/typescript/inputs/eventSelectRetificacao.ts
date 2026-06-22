export default function eventSelectRetificacao(
    selectTypeAto: HTMLSelectElement,
    inputName: HTMLInputElement,
    inputCPF: HTMLInputElement,
    inputConjugeName: HTMLInputElement,
    inputConjugeCPF: HTMLInputElement,
    selectType: HTMLSelectElement
) {
    selectTypeAto.addEventListener("change", () => {
        if (selectTypeAto.value === "retificacao") {
            inputName.disabled = true;
            inputCPF.disabled = true;
            inputConjugeName.disabled = true;
            inputConjugeCPF.disabled = true;

            inputName.value = "";
            inputCPF.value = "";
            inputConjugeName.value = "";
            inputConjugeCPF.value = "";
        } else {
            inputName.disabled = false;
            inputCPF.disabled = false;

            if (
                selectType.value !== "Casado(a)" &&
                selectType.value !== "União Estável"
            ) {
                inputConjugeName.disabled = true;
                inputConjugeCPF.disabled = true;
                inputConjugeName.value = selectType.value;
                inputConjugeCPF.value = selectType.value;
            } else {
                inputConjugeName.disabled = false;
                inputConjugeCPF.disabled = false;
                inputConjugeName.value = "";
                inputConjugeCPF.value = "";
            }
        }
    });
}
