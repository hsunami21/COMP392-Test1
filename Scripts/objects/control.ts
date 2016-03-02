/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
       
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(public cube1RotY: number, public cube2RotY: number, 
            public cube3RotY: number, public cube4RotY: number, public cube5RotY: number, 
            public changeColor: boolean, public scale: number) {

        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        public randomColor(): void {
           this.changeColor = this.changeColor ? false : true; ; 

        }
    }
}
