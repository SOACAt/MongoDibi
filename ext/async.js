"use strict";
var Sem = (function () {
    function Sem() {
        this._end = false;
    }
    Sem.prototype.Wait = function () {
        while (this._end === false) {
            setTimeout(function () { }, 100);
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