export function addEventChangeActive(event: MouseEvent): void {
    event.stopPropagation();
    const atoCancel = (event.target as HTMLTableRowElement).closest(
        '[data-ato="cancel"]'
    );

    if (!atoCancel) return;

    let activeOnus = atoCancel.classList.contains("table-value-red")
        ? false
        : true;

    activeOnus = !activeOnus;

    const toggleActive = activeOnus ? "red" : "green";
    const inverseToggleActive = !activeOnus ? "red" : "green";

    atoCancel.classList.replace(
        `table-value-${toggleActive}`,
        `table-value-${inverseToggleActive}`
    );

    atoCancel.textContent = activeOnus ? "Cancelado" : "Ativo";
}

export function addEventWindowChangeActive() {
    window.addEventListener("click", addEventChangeActive);
}