var fs = require('fs')

module.exports.JsonToData =  function JsonToData(res){
    fs.readFile('./out.json', 'utf8', (err, data) => {
        if( err ){
            console.error(err)
            return res.json({code: 1})
        }
        var obj = JSON.parse(data)
        return res.json(obj)
    })
}

module.exports.WriteToJson = function WriteToJson(data, res){
    fs.writeFile('./out.json', JSON.stringify(data), (err) => {
        if (err){
            console.error(err)
            return res.json({code: 0})
        }
        
        return res.json({code: 1})
    })
}
