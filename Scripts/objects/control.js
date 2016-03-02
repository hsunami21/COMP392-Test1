/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(cube1RotY, cube2RotY, cube3RotY, cube4RotY, cube5RotY, changeColor, scale) {
            this.cube1RotY = cube1RotY;
            this.cube2RotY = cube2RotY;
            this.cube3RotY = cube3RotY;
            this.cube4RotY = cube4RotY;
            this.cube5RotY = cube5RotY;
            this.changeColor = changeColor;
            this.scale = scale;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.randomColor = function () {
            this.changeColor = this.changeColor ? false : true;
            ;
        };
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
