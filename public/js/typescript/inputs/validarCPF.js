var ValidateCPF = /** @class */ (function () {
    function ValidateCPF(inputsCPF, classError) {
        this.inputsCPF = document.querySelectorAll(inputsCPF);
        this.classError = classError;
    }
    ValidateCPF.prototype.clean = function (cpf) {
        return cpf.replace(/\D/g, "");
    };
    ValidateCPF.prototype.build = function (cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    };
    ValidateCPF.prototype.formatar = function (cpf) {
        var cpfLimpo = this.clean(cpf);
        return this.build(cpfLimpo);
    };
    ValidateCPF.prototype.validateFirstNumber = function (cpf) {
        var sum = 0;
        for (var i = 0; i < 9; i++) {
            sum += cpf[i] * (10 - i);
        }
        var result = (sum * 10) % 11;
        if (result < 10)
            return cpf[9] == result;
        return cpf[9] == 0;
    };
    ValidateCPF.prototype.validateSecondNumber = function (cpf) {
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            sum += cpf[i] * (11 - i);
        }
        var result = (sum * 10) % 11;
        if (result < 10)
            return cpf[10] == result;
        return cpf[10] == 0;
    };
    ValidateCPF.prototype.verifyExistCPF = function (cpf) {
        var cpfBase = cpf.replace(/[.-]/g, "");
        var cpfNumbers = cpfBase.split("").map(function (number) { return parseInt(number); });
        var allEqual = cpfNumbers.every(function (number) { return number === cpfNumbers[0]; });
        if (allEqual)
            return false;
        var validateFirst = this.validateFirstNumber(cpfNumbers);
        var validateSecond = this.validateSecondNumber(cpfNumbers);
        return validateFirst && validateSecond;
    };
    ValidateCPF.prototype.validate = function (cpf) {
        var cpfFormatted = this.formatar(cpf);
        var matchCpf = cpfFormatted.match(/(?:\d{3}[.-]?){3}\d{2}/g);
        var verifyCpf = (matchCpf && matchCpf[0] == cpfFormatted)
            &&
                this.verifyExistCPF(cpf);
        return verifyCpf;
    };
    ValidateCPF.prototype.justNumbers = function (input) {
        if (input instanceof HTMLInputElement) {
            var cleaned = this.clean(input.value);
            if (input.value !== cleaned)
                input.value = cleaned;
        }
        if (input instanceof HTMLParagraphElement) {
            var content = input.textContent || "";
            var cleaned = this.clean(content);
            if (content !== cleaned)
                input.textContent = cleaned;
        }
    };
    ValidateCPF.prototype.validateChange = function (cpfElement) {
        var cpfSize = 0;
        if (cpfElement instanceof HTMLInputElement)
            cpfSize = cpfElement.value.length;
        else if (cpfElement instanceof HTMLParagraphElement)
            cpfSize = cpfElement.textContent.length;
        if (cpfSize >= 11) {
            if (cpfElement instanceof HTMLInputElement) {
                if (this.validate(cpfElement.value)) {
                    cpfElement.value = this.formatar(cpfElement.value);
                    cpfElement.classList.remove(this.classError);
                }
                else {
                    cpfElement.classList.add(this.classError);
                }
            }
            else if (cpfElement instanceof HTMLParagraphElement) {
                if (this.validate(cpfElement.textContent)) {
                    cpfElement.classList.remove(this.classError);
                }
                else {
                    cpfElement.classList.add(this.classError);
                }
            }
        }
    };
    ValidateCPF.prototype.addEvent = function () {
        var _this = this;
        // Deve deixar como arrow function, caso mudar para uma função padrão anônima, o this não irá apontar para o objeto
        this.inputsCPF.forEach(function (input) {
            input.addEventListener("input", function () {
                input.classList.remove(_this.classError);
                _this.justNumbers(input);
                _this.validateChange(input);
            });
        });
        this.inputsCPF.forEach(function (input) {
            if (input instanceof HTMLParagraphElement) {
                input.addEventListener('click', function () {
                    input.textContent = _this.clean(input.textContent);
                });
                input.addEventListener('blur', function () {
                    if (input.textContent.length >= 11) {
                        input.textContent = _this.formatar(input.textContent);
                    }
                });
            }
        });
    };
    ValidateCPF.prototype.init = function () {
        if (this.inputsCPF.length)
            this.addEvent();
        return this;
    };
    return ValidateCPF;
}());
export default ValidateCPF;
