function changeValue(event: MouseEvent) {
    event.stopPropagation();

    const targetInput: HTMLElement | null = (
        event.target as HTMLElement
    ).closest("[data-change]");

    if (!targetInput) return;

    const targetInputElement = targetInput.querySelector(
        "input",
    ) as HTMLInputElement;

    if (!targetInputElement) return;

    let value = targetInputElement.value;

    targetInputElement.oninput = () => {
        value = targetInputElement.value;
    };

    targetInputElement.onblur = () => {
        targetInput.setAttribute("data-change", value);

        if (targetInput.hasAttribute("data-remove")) {
            targetInput.setAttribute("data-remove", value);
        }

        targetInput.setAttribute("aria-label", value);

        targetInputElement.setAttribute("aria-label", value);
    };
}

export function removeChangeValueItem() {
    window.removeEventListener("click", changeValue);
}

export function changeValueItem() {
    window.addEventListener("click", changeValue);
}