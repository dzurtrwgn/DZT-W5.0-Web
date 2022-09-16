const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();
const URI = process.env.MONGO_URL;

mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(err) throw err;
        console.log("Connected to MongoDB");
    }
);

var datasource = require('./datasource/simple-datasource.js')
var model = require('./model/model').create(datasource)

var express = require('express')
var app = express()

app.set('view engine', 'ejs')
app.use(require('cookie-parser')())
app.use(express.json())
app.use(cors());

var multer = require('multer')
var upload = multer({ dest: 'tmp/' })

var router = express.Router()
router.use(express.static('public'))
var webconfig = require('./webconfig')
var urlencodedParser = require('body-parser').urlencoded({ extended: false})

function controller(name){
    return require('./controllers/' + name + '-controller')
}
router.get('/', function (request, response){
    controller('home').get(request, response, webconfig, model)
})
router.get('/login', function (request, response){
    controller('login').get(request, response, webconfig, model)
})
router.post('/login', urlencodedParser , function (request, response){
    controller('login').post(request, response, webconfig, model)
})
router.get('/logout', function (request, response){
    controller('logout').get(request, response, webconfig)
})

router.get('/edit-general-info', function (request, response) {
    controller ('edit-general-info').get(request, response, webconfig, model)
})

router.post('/edit-general-info', upload.single('featureImage'), function (request,response) {
    controller ('edit-general-info').post(request, response, webconfig, model)
})

router.get('/edit-about', function(request, response){
    controller('edit-about').get(request, response, webconfig, model)
})

router.post('/edit-about', urlencodedParser, function(request, response){
    controller('edit-about').post(request, response, webconfig ,model)
})

router.get('/add-product', function(request, response){
    controller('add-product').get(request, response, webconfig, model)
}) 

router.post('/add-product', upload.single('productImage'), function(request, response){
    controller('add-product').post(request, response, webconfig, model)
})
router.get('/edit-product', function(request, response){
    controller('edit-product').get(request, response, webconfig, model)
})

app.use(webconfig.root, router)
app.use("/", require("./routes/productRoute"));
app.use("/showroom/images", express.static("./images"));

const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
    console.log(`Server on localhost:${PORT}`)
});