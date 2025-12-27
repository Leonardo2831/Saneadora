export default class UseState<T>{
    public state: T[];
    public pointer : number;

    constructor(initialState: T){
        this.state = [initialState];
        this.pointer = 0;
    }

    // Os métodos devem ser criados dessa maneira para ser possível a desestruturação.
    getState = () : T[] => {
        return this.state;
    };

    setState = (data : T) => {
        this.state = this.state.slice(0, this.pointer + 1);

        this.state.push(data);
        this.pointer++;
    };

    lastState = () : T | null => {
        if (this.pointer <= 0) return null;

        this.pointer--;
        return this.state[this.pointer];
    };
}