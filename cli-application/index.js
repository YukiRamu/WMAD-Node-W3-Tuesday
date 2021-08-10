/* Assignment */

// Create a basic node module that exposes the same functionality that your created in the Basic CLI and Basic Express Status Apps. 

// Create your own NPM module based on the CLI and Express Status Apps
// Add additional functions to your NPM module to make it more useful, explore yourself what you can add from the node js core modules
// Publish this NPM module to the NPM Repository and make it available to everyone. 


/* ================= Basic CLI Status Application ================= */
const cliApp = () => {

  const express = require("express");
  const app = express();
  const apiRouter = require("./routes/api");

  //use env file 
  require('dotenv').config();
  const port = process.env.PORT || 3000;

  //set view engine
  app.set("views", "views");
  app.set("view engine", "ejs");

  //router config
  app.use("/", apiRouter);
  app.use("/api", apiRouter);


  //listen on port
  app.listen(port, () => {
    console.log(`Application is running  on the port ${port}`);
  });
};

/* ================ Basic Express version of CLI Status App  ================ */
const expressVerCliApp = () => {

  const os = require('os');
  const checkDiskSpace = require('check-disk-space').default;

  class Application {

    constructor(ExecutablePath, CommandLineParameter) {
      this.ExecutablePath = ExecutablePath;
      this.CommandLineParameter = CommandLineParameter;
    }

    //methods
    //show data on console
    showData() {
      console.log("ʕ•ᴥ•ʔ Hello My Friend ʕ•ᴥ•ʔ Here is your data ʕ•ᴥ•ʔ");

      switch (this.CommandLineParameter) {
        case "-arch":
          console.log("****************************************");
          console.log(`Computer Architecture ${os.arch()}`);
          break;

        case "-cpu":
          const cpus = os.cpus();
          for (let i = 0; i < cpus.length; i++) {
            console.log("****************************************");
            console.log(`Core ${i + 1} is ${cpus[i].model}`);
            console.log(`Computer CPU Speed is ${cpus[i].speed}`);
            console.log(`Time in user mode is ${Math.round(cpus[i].times.user / 60000)} mins`);
            console.log(`Time in nice mode is ${Math.round(cpus[i].times.nice / 60000)} mins`);
            console.log(`Time in sys mode is ${Math.round(cpus[i].times.sys / 60000)} mins`);
            console.log(`Time in idle mode is ${Math.round(cpus[i].times.idle / 60000)} mins`);
            console.log(`Time in irq mode is ${Math.round(cpus[i].times.irq / 60000)} mins`);
          }
          break;

        case "-ram":
          console.log("****************************************");
          console.log(`RAM Total Size is ${Math.round(os.totalmem() / 1024 / 1024)} MB`);
          console.log(`RAM Free Memory is ${Math.round(os.freemem() / 1024 / 1024)} MB`);
          console.log(`You are using ${Math.round((os.freemem() / 1024 / 1024) / (os.totalmem() / 1024 / 1024) * 100)}% of the total memory!`);
          break;

        case "-hdd":
          checkDiskSpace("C:/").then((diskspace) => {
            console.log("****************************************");
            console.log(`HDD Total Size is ${Math.round(diskspace.size / 1024 / 1024)} MB`);
            console.log(`HDD Free Memory is ${Math.round(diskspace.free / 1024 / 1024)} MB`);
            console.log(`You are using ${Math.round((diskspace.free / 1024 / 1024) / (diskspace.size / 1024 / 1024) * 100)}% of the total HDD memory!`);
          });
          break;

        case "-hostname":
          console.log("****************************************");
          console.log(`Hostname is ${os.hostname()}`);
          break;

        case "-ip":
          const networkInterface = os.networkInterfaces();
          console.log("****************************************");
          console.log(`Your IP address is ${networkInterface["Wi-Fi"][3].address}`);
          break;
        default:
          console.log("Oops! You have entered an invalid command! (●￣(ｴ)￣ ●)");
          break;
      }
    }
  }


  let listOfArgument = [];
  for (let i = 1; i < process.argv.length; i++) {
    listOfArgument.push(process.argv[i]);
  }

  //instantiate
  const myApplication = new Application(process.argv[0], listOfArgument[1]);

  //call methods
  myApplication.showData();

};


// exporting two modules to publish npm packages
module.exports = {
  cliApp: cliApp,
  expressVerCliApp: expressVerCliApp
};