var session = require('./session');

async function render(request, response, webconfig, errorMessage, model){
    model.getGeneralInfo (function (generalInfo){      
        response.render('edit-product', {
            root        : webconfig.root,
            logged      : true,
            generalInfo,
            errorMessage,
        })              
    })
}

exports.get = function (request, response, webconfig, model){
    if (!session.logged(request)) {
        response.redirect(webconfig.root)
        return
    }
    render(request, response, webconfig, false, model);
}