async function ask(){
    await fetchLicences();
  //   console.log("licences: " + licences[0][0])
      
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
              name: "tests",
              message: "Enter Testing Instructions"
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