const fs = require("fs");
const path = require("path");

const inputArray = process.argv.slice(2);
const filePathArray = [], commandArray = [];
const processedFilePathArray = [];
const processedContentArray = [];


for (let i = 0; i < inputArray.length; i++) {
    let input = inputArray[i];
    if (input.charAt(0) == '-') {
        commandArray.push(input);
    }
    else {
        filePathArray.push(input);  
    }
}


if (commandArray.length == 0) {
    for (let filePath of filePathArray) {
        let content = fs.readFileSync(filePath);
        console.log(content.toString());
    }
}




//wcat -s filepath => convert big line breaks into a singular line break ✔
if (commandArray.includes("-s")) {
    let content = "";

    for (let filePath of filePathArray) {
        content += fs.readFileSync(filePath).toString();
    }

    content = content.split("\r\n");

    for (let i = 0; i < content.length; i++) {
        if (content[i] === "") {
            while (content[i] === "") {
                i++;
            }
            i--;
        }
        processedContentArray.push(content[i]);
    }
    for (let i = 0; i < processedContentArray.length; i++) {
        console.log(processedContentArray[i]);
    }
}

//wcat -n filepath => give numbering to all the lines  ✔

if (commandArray.includes("-s")) {
    for (let i = 0; i < processedContentArray.length; i++) {
        processedContentArray[i] = i + 1 + " " + processedContentArray[i];
    }    
}
// wcat -b filepath => give numbering to non-empty lines  ✔

if (commandArray.includes("-b")) {
    let index = 1;
    for (let i = 0; i < processedContentArray.length; i++) {
        console.log(processedContentArray[i] === "" ? "" : index++ + " " + processedContentArray[i]);
    }
}




