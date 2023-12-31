const inquirer = require("inquirer");
const fs = require("fs");

var licences = [];
var selectedLicence;
var licenceInfo;
var userInput;

async function fetchLicences() {
    const response = await fetch('https://api.github.com/licenses')
    const data = await response.json();
    for(i=0; i<data.length; i++){
        licences[i] = [{
            licenceName: data[i].name,
            licenceURL: data[i].url
        }];
    }
    return licences;
  }

  async function fetchLicenceInformation(selectedLicence) {
    const response = await fetch(selectedLicence)
    const data = await response.json();
    licenceInfo  = data.description;
    return licenceInfo;
  }

async function ask(){
  await fetchLicences();    
    inquirer
    .prompt([
        {
            type: "input",
            name: "repoName",
            message: "Enter Repository Name"
        },
        {
            type: "input",
            name: "description",
            message: "Enter the description of your respository"
        },
        {
            type: "input",
            name: "install",
            message: "Enter your installation instructions"
        },
        {
            type: "input",
            name: "usage",
            message: "Enter Usage instructions"
        },
        {
            
            type: "input",
            name: "contributing",
            message: "Enter contribution guidelines"
        },
        {
            type: "input",
            name: "username",
            message: "Enter your Github username"
        },
        {
            type: "input",
            name: "userEmail",
            message: "Enter your contact email address"
        },
        {
            type: "list",
            name: "licence",
            message: "Select Relevant licence",
            choices: [licences[0][0].licenceName, licences[1][0].licenceName, licences[2][0].licenceName, licences[3][0].licenceName, licences[4][0].licenceName, licences[5][0].licenceName, licences[6][0].licenceName, licences[7][0].licenceName, licences[8][0].licenceName, licences[9][0].licenceName, licences[10][0].licenceName, licences[11][0].licenceName, licences[12][0].licenceName]
        }
        
    ])
    .then((response) => {
        userInput = response;
        for(i = 0; i < licences.length; i++){
          if(response.licence == licences[i][0].licenceName){
              selectedLicence = licences[i][0].licenceURL;
          }
      }
        fetchLicenceInformation(selectedLicence)
    .then((licenceInfo) => {
      currentLicence = licenceInfo;
        badgeLicence = userInput.licence.split(" ").join("_");

        var markdown = (userInput, currentLicence) => {
return `# ${userInput.repoName} 
![Static Badge](https://img.shields.io/badge/Licence-${badgeLicence}-blue)
## Table of Contents: 
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Licence](#licence)
* [Contributing](#contributing)
* [Questions](#questions)
## Description:
${userInput.description}
## Installation: 
${userInput.install}
## Usage: 
${userInput.usage}
## Licence: 
**${userInput.licence}** <br>
${currentLicence}            
## Contributing:
${userInput.contributing}
## Questions:
Find my work at [${userInput.username}](https://github.com/${userInput.username}), or email me at ${userInput.userEmail}.
`
        }

        fs.writeFile("README.md", (markdown(userInput, currentLicence)), (err) => {
            err ? console.log(err) : console.log("file created");
        })
    })
  })
}

ask();