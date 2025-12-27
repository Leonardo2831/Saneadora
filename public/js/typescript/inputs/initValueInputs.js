export default function initValueInputs() {
    var inputs = document.querySelectorAll('input[aria-label]');
    inputs.forEach(function (input) {
        if (input instanceof HTMLInputElement) {
            input.value = input.getAttribute("aria-label") || "";
        }
    });
}
