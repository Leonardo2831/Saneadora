var UseState = /** @class */ (function () {
    function UseState(initialState) {
        var _this = this;
        // Os métodos devem ser criados dessa maneira para ser possível a desestruturação.
        this.getState = function () {
            return _this.state;
        };
        this.setState = function (data) {
            _this.state = _this.state.slice(0, _this.pointer + 1);
            _this.state.push(data);
            _this.pointer++;
        };
        this.lastState = function () {
            if (_this.pointer <= 0)
                return null;
            _this.pointer--;
            return _this.state[_this.pointer];
        };
        this.state = [initialState];
        this.pointer = 0;
    }
    return UseState;
}());
export default UseState;
