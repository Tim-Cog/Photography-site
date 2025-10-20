const fs = require('fs')
const multer = require('multer')
const path = require('path')
const cookieParser = require('cookie-parser')
const jsonpatch = require('fast-json-patch')
const express = require('express')
const router = express.Router()


const storage = multer.diskStorage({
	destination : function(req, file, cb){
		cb(null, path.join(__dirname,'../media-files/images'))
	},
	filename : function(req, file, cb){
		const extension = path.extname(file.originalname)
		const name = path.basename(file.originalname,extension)
		const newName = `${name}-${req.query.currentDate}${extension}`
		cb(null, newName)
	}
})
const upload = multer({
	//dest: path.join(__dirname,'../media-files/images')
	storage: storage
})


let newFileNames

router.use(cookieParser())
router.post('/api/data', upload.any(),(req, res) =>{
	const number_of_files_uploaded = parseInt(req.cookies.NO)
	if(req.files.length !== number_of_files_uploaded){
		return res.status(400).json({
			error: "Expected different numbers"
		})
	}
	
	newFileNames = req.files.map(file => file.filename)
	console.log(newFileNames)

	res.json({
		message : "All Uploaded",
		number : req.files.length
	})
})


router.delete('/api/data/:deleteFile', (req, res) => {
	const deleteFile = req.params.deleteFile;
	fs.unlink(path.join(__dirname,`../media-files/images/${deleteFile}`), (err) => {
		if(err){
			return res.status(500).json({error : "Error Deleting File"})
		}else{
			res.status(200).json({success : "File Deleted"})
		}
	})
})




module.exports = router;
