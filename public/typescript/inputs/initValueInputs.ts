export default function initValueInputs() {
    const inputs = document.querySelectorAll('input[aria-label]');

    inputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
            input.value = input.getAttribute("aria-label") || "";
        }
    });
}