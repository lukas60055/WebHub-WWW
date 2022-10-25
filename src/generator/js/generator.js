'use strict';

const getAllAttributes = el => el
.getAttributeNames()
.reduce((obj, name) => ({
    ...obj,
    [name]: el.getAttribute(name)
}), {})

var all = document.getElementsByTagName("*");
var table = [];

let markery = [];

function getAllIndexes(arr, val) {
    let indexes = [];
    for(let i = 0; i < arr.length; i++)
        if (arr[i] === val) {
            indexes.push(i);
        }
    return indexes;
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

function generator() {
    for(let i=3, max=all.length; i < max-3; i++) {

        let name = all[i].localName;
        let cls = all[i].getAttribute("class");
        let argument = JSON.stringify(getAllAttributes(document.querySelectorAll("*")[i]));
        let parent = all[i].parentElement.getAttribute("class");

        // Klasy głownych znaczników - rodziców
        if(cls !== null) {
            markery.push(cls.split(" ")[0]);
        }

        // Dziecko 1 które szuka rodzica
        if(parent !== null) {
            if(getAllIndexes(markery, parent.split(" ")[0]).length <= 1) {
                var number = 0;
            } else {
                var number = getAllIndexes(markery, parent.split(" ")[0]).length - 1;
            }
            parent = parent.split(" ")[0];
        } else {
            parent = "ERROR";
        }

        // text
        if(all[i].textContent.length === all[i].innerHTML.length && all[i].textContent.length !== 0 && cls !== null) {
            var counter = getAllIndexes(markery, cls.split(" ")[0]).length - 1;
            var text = {[counter]: all[i].innerText};
        } else if(all[i].textContent.length === all[i].innerHTML.length && all[i].textContent.length !== 0) {
            var text = {null: all[i].innerText};
        } else {
            var text = null;
        }

        if(text !== null) {
            table.push(`\r\n["${name}", ${argument}, "${parent}:eq(${number})", ${JSON.stringify(text)}]`)
        } else {
            table.push(`\r\n["${name}", ${argument}, "${parent}:eq(${number})"]`)
        }
    }
    console.log(`Gotowe: Wpisz download("Nazwa")`);
}

generator();

function download(name) {
    var blob = new Blob([table], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "generatorHTML - "+name+".txt");
}
