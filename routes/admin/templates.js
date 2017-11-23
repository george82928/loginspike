let express = require('express');
var router = express.Router();

var pageData = [{
    id: '1',
    name: 'template_1',
    display_name: 'Frozen',
    image: 'frozen.jpg',
    banner_image: 'banner1.jpg',
    external_id: 'abcd123',
    sort_order: 1
},{
    id: '2',
    name: 'template_2',
    display_name: 'Micky',
    image: 'Micky.jpg',
    banner_image: 'Micky.jpg',
    external_id: 'abcd456',
    sort_order: 1
},{
    id: '1',
    name: 'template_3',
    display_name: 'Tinkerbell',
    image: 'Tinkerbell.jpg',
    banner_image: 'banner3.jpg',
    external_id: 'abcd789',
    sort_order: 1
},{
    id: '1',
    name: 'template_4',
    display_name: 'Spiderman',
    image: 'Spiderman.jpg',
    banner_image: 'banner4.jpg',
    external_id: 'abcd666',
    sort_order: 1
}];

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.render('page', { page: 'subdirectory/templates.ejs', pageData: pageData });
});

// about page route (http://localhost:8080/about)
router.get('/:id', function(req, res) {
    res.send('I have id:' + req.params.id);
});

module.exports = router;