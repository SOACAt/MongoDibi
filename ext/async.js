"use strict";
var Sem = (function () {
    function Sem() {
        this._end = false;
    }
    Sem.prototype.Wait = function () {
        while (this._end === false) {
            setTimeout(function () { var a = 0; }, 1000);
        }
    };
    Sem.prototype.Red = function () {
        this._end = false;
    };
    Sem.prototype.Green = function () {
        this._end = true;
    };
    return Sem;
}());
module.exports = Sem;
//# sourceMappingURL=async.js.map