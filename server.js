//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
/*app.use(express.static(__dirname + '/dist/CaloriesInput_front'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/CaloriesInput_front/index.html'));
});*/

app.use(express.static(`${__dirname}/CaloriesInput_front/dist/`));

app.get('*', (req, res) => {
    res.sendFile(`./CaloriesInput_front/dist/index.html`); // load the single view file (angular will handle the page changes on the front-end)
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);