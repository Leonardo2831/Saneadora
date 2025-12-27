function changeViewModalBase(event : Event, classModal : string, contentPercent : HTMLElement){
    const target = event.currentTarget as HTMLInputElement;
    contentPercent.classList.remove(classModal);
    
    if(target.value === "%") contentPercent.classList.add(classModal);
}

export default function eventRadioInput(modal : HTMLElement, classModal : string, contentPercent : HTMLElement){
    const inputsRadio : NodeListOf<HTMLInputElement> = modal.querySelectorAll('input[type="radio"]');

    inputsRadio.forEach((inputRadio) => {
        inputRadio.addEventListener("change", (event : Event) => {
            changeViewModalBase(event, classModal, contentPercent);
        });
    });
}