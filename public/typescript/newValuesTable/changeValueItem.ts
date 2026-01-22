function changeValue(event: MouseEvent){
    event.stopPropagation();
    
    const targetInput: HTMLInputElement | null = (event.target as HTMLInputElement).closest("[data-change]");
    
    if(!targetInput) return;

    let value = targetInput.value;

    targetInput.oninput = () => {
        value = targetInput.value;
    }

    targetInput.onblur = () => {
        targetInput.parentElement?.setAttribute("data-change", value);
        targetInput.parentElement?.setAttribute("data-remove", value);
        targetInput.parentElement?.setAttribute("aria-label", value);

        targetInput.setAttribute("aria-label", value);
    }
}

export function removeChangeValueItem(){
    window.removeEventListener("click", changeValue);
} 

export function changeValueItem() {
    window.addEventListener("click", changeValue);
}