var session = require('./session')

exports.delete = function(request, response, webconfig, model){
    if(!session.logged(request)){
        response.redirect(webconfig.root)
        return
    }
    const productId = request.body.params;
    console.log('productId :>> ', productId);
    response.send("hello")
    // model.deleteProduct(productId, function(errorMessage){
    //     if (errorMessage){
    //         render(response, webconfig, errorMessage, model)
    //         return;
    //     }
    //     response.redirect(webconfig.root + '#products')
    // })
}