
// function capitalLetters(req, res, next) {
//     const name = req.body.name || "" //if there name is an empty string it will give an error letting us know exactly whats wrong

//     if (name.toUpperCase() === name) {
//         next()
//     } else {
        
//         res.status(403).json({message: "Name that you entered needs to have only Capital Letters."})
//     }
// }

function capitalLetters(req, res, next) {
    const name = req.body.name.toUpperCase()
    
    req.body.name = name;
    next()
}




module.exports = {
    capitalLetters
}