var fs = require('fs');
const createLocalStorage = (req, res) => {
    const projectId = req.params.projectId

    var dir = '/Users/bubz/Developer/master-project/aolme-backend/local-storage/'+projectId

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir)
        console.log('LOG: local storage created: ', projectId)
    }


    return dir
}

module.exports = {
    createLocalStorage
}