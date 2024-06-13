var fs = require("fs");

// console.log("Going to create ");

fs.mkdir('./test/src', function(err) {
    if(err) {
        return console.error(err);
    }
    console.log("Directory created successfully")
});