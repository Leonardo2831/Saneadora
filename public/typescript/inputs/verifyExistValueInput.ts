export default function verifyExistValueInput(inputs: HTMLInputElement[]) {
    inputs.forEach((input) => {
        if(input.value == "" && input.dataset.input !== "cpf") {
            input.classList.add("invalid");
        }

        if(input.dataset.input == "cpf" && input.value.length < 11){
            input.classList.add("invalid");
        }

        input.addEventListener("click", () => {
            if (input.classList.contains("invalid")) {
                input.classList.remove("invalid");
            }
        });
    });
}
