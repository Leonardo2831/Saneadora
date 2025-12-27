export default class ValidateCPF {
    private inputsCPF : NodeListOf<HTMLInputElement | HTMLParagraphElement>;
    private classError : string;

    constructor(inputsCPF : string, classError : string) {
        this.inputsCPF = document.querySelectorAll(inputsCPF);
        this.classError = classError;
    }

    clean(cpf : string) : string {
        return cpf.replace(/\D/g, "");
    }

    build(cpf : string) : string {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }

    formatar(cpf : string) : string {
        const cpfLimpo = this.clean(cpf);
        return this.build(cpfLimpo);
    }

    validateFirstNumber(cpf : number[]){
        let sum = 0;

        for (let i = 0; i < 9; i++) {
            sum += cpf[i] * (10 - i);
        }

        const result = (sum * 10) % 11;

        if (result < 10) return cpf[9] == result;

        return cpf[9] == 0;
    }

    validateSecondNumber(cpf : number[]) {
        let sum = 0;

        for (let i = 0; i < 10; i++) {
            sum += cpf[i] * (11 - i);
        }

        const result = (sum * 10) % 11;

        if (result < 10) return cpf[10] == result;

        return cpf[10] == 0;
    }

    verifyExistCPF(cpf : string) : boolean {
        const cpfBase = cpf.replace(/[.-]/g, "");

        const cpfNumbers : number[] = cpfBase.split("").map((number) => parseInt(number));

        const allEqual : boolean = cpfNumbers.every((number) => number === cpfNumbers[0]);
        if (allEqual) return false;

        const validateFirst : boolean = this.validateFirstNumber(cpfNumbers);
        const validateSecond : boolean = this.validateSecondNumber(cpfNumbers);

        return validateFirst && validateSecond;
    }

    validate(cpf : string) : boolean | null {
        const cpfFormatted = this.formatar(cpf);
        const matchCpf = cpfFormatted.match(/(?:\d{3}[.-]?){3}\d{2}/g);

        const verifyCpf : boolean | null =
                (matchCpf && matchCpf[0] == cpfFormatted) 
                    && 
                this.verifyExistCPF(cpf);

        return verifyCpf;
    }

    justNumbers(input : HTMLInputElement | HTMLParagraphElement){
        if(input instanceof HTMLInputElement) {
            const cleaned = this.clean(input.value);
            if(input.value !== cleaned) input.value = cleaned;
        }
        if(input instanceof HTMLParagraphElement) {
            const content = input.textContent || "";
            const cleaned = this.clean(content);
            if(content !== cleaned) input.textContent = cleaned;
        }
    }

    validateChange(cpfElement : HTMLInputElement | HTMLParagraphElement) {
        let cpfSize : number = 0;

        if(cpfElement instanceof HTMLInputElement) cpfSize = cpfElement.value.length;
        else if(cpfElement instanceof HTMLParagraphElement) cpfSize = cpfElement.textContent.length;

        if(cpfSize >= 11){
            if(cpfElement instanceof HTMLInputElement) {
                
                if (this.validate(cpfElement.value)) {
                    cpfElement.value = this.formatar(cpfElement.value);

                    cpfElement.classList.remove(this.classError);
                } else {
                    cpfElement.classList.add(this.classError);
                }

            } else if (cpfElement instanceof HTMLParagraphElement) {
                
                if (this.validate(cpfElement.textContent)) {
                    cpfElement.classList.remove(this.classError);
                } else {
                    cpfElement.classList.add(this.classError);
                }
            }
        }

    }

    addEvent() {
        // Deve deixar como arrow function, caso mudar para uma função padrão anônima, o this não irá apontar para o objeto
        this.inputsCPF.forEach((input) => {
            input.addEventListener("input", () => {
                input.classList.remove(this.classError);
                this.justNumbers(input);
                this.validateChange(input);
            });
        });

        this.inputsCPF.forEach((input) => {
            if(input instanceof HTMLParagraphElement){
                input.addEventListener('click', () => {
                    input.textContent = this.clean(input.textContent);
                });
                input.addEventListener('blur', () => {
                    if(input.textContent.length >= 11){
                        input.textContent = this.formatar(input.textContent);
                    }
                });
            }
        });
    }

    init() {
        if(this.inputsCPF.length) this.addEvent();

        return this;
    }
}