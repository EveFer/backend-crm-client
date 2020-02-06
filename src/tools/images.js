const multer = require('multer')
const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

const configurationMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1]
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        }else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuracion y el campo
const upload = multer(configurationMulter).single('image')
//  sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({message: error})
        }
        return next()
    })
}

exports.deleteFile = (filename) => {
    pathDir = path.normalize(__dirname+'/../uploads/')
    fs.unlink(pathDir+filename, (err) => {
        if (err) throw err;
        console.log(pathDir+filename+' was deleted');
    })

}