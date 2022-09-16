var session = require('./session');
const Product = require("../model/productModel");

exports.get = async function (request, response, webconfig, model) {
    var logged = session.logged(request)
    const productList = await Product.find();

    model.getGeneralInfo( function (generalInfo) {
        model.getProducts(function(products){
            model.getAbout(function(about){
                response.render('home',{
                    root    : '',
                    logged  : logged,
                    generalInfo : generalInfo,
                    products : products,
                    about : about,
                    productList
                }) 
            })
        }) 
    })
}