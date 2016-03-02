/// <reference path="../../typings/tsd.d.ts"/>

/*
    Source name: COMP392-MidTerm
    Author: Wendall Hsu 300739743
    Last Modified By: Wendall Hsu
    Date Last Modified: March 2, 2016
    Program Description: Creation of a tower for COMP392-MidTerm using THREEJS and TypeScript

*/

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
