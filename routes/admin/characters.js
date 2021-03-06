let express = require('express');
var router = express.Router();

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.render('page', {page: 'subdirectory/characters.ejs', pageData: 'Here comes the characters page.'});  
});

// about page route (http://localhost:8080/about)
router.get('/:id', function(req, res) {
    res.send('I have id:' + req.params.id); 
});

module.exports = router;