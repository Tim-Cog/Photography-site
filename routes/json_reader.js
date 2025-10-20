const fs = require('fs')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const jsonpatch = require('fast-json-patch')
const router = express.Router()

router.use(express.json())


//read the json file
router.get('/api/file-record', (req, res)=>{
	try{
		const file = fs.readFileSync("text-resources/image-info.json","utf8")
		const jsonData = JSON.parse(file)
		console.log(jsonData)
		res.json(jsonData)
	}catch(err){
		console.error("Couldn't find json file because : ",err)
	}

})


//add a new file record to the json file
router.put('/api/file-record',(req, res) =>{
	const filepath = path.join(__dirname,'../text-resources','image-info.json')
	fs.readFile(filepath, 'utf8', (err, data) =>{
		if(err){
			return res.status(500).json({error: 'JSON file did not load'})
		}

		let json

		try{
			json = JSON.parse(data)
			const newNames =  req.body.arrFileInfo
			
			json = [...json, ...newNames]
			console.log(newNames)
					
			fs.writeFile(filepath, JSON.stringify(json), 'utf8', (err)=>{
				if(err){
					return res.status(500).json({error:"Couldn't write file"})
				}
				//res.json({message:"File udated"})
			})


		}catch{
			return res.status(400).json({error: 'JSON file format invalid'})
		}

		res.status(200).json({message:json})
	})
})



//edit the file records after file-info is updated

router.patch('/api/file-record', (req, res) => {
	const filepath = path.join(__dirname,'../text-resources','image-info.json')
	fs.readFile(filepath, 'utf8', (err, data) =>{
		if(err){
			return res.status(500).json({error: 'JSON file did not load'})
		}
		if(req.query.opType == "edit"){
			let json
			try{
				const newInfo = req.body.fileInfo
				json = JSON.parse(data)
				const changeAtIndex = json.findIndex(record => record.fileName === req.query.fileName)

				if(changeAtIndex > -1){
					const patch = [
						{op : "replace", path : `/${changeAtIndex}/imageInfo`, value : req.body.fileInfo}
					]
		
					const patchedFile = jsonpatch.applyPatch(json, patch).newDocument
					//do the frontend js and html
					fs.writeFile(filepath, JSON.stringify(patchedFile), 'utf8', (err)=>{
						if(err){
							console.log("Error in paradise?")
							res.status(300).json({error : "Can't patch to file"})
						}else{
							res.status(200).json({success : "Record successfully updated"})
						}
					})
				}else{
					res.status(400).json({error: "Couldn't find file in record"})
				}
			}catch{
				console.error("File could not be parsed for editing")
			}
		}else if(req.query.opType == "delete"){

			//fix the deletion from the json file
			//add unlink for file itself
			
			try{
				let json
				json = JSON.parse(data)
				const deleteAtIndex = json.findIndex(record => record.fileName === req.query.fileName)
				if(deleteAtIndex > -1){
					const patch = [
						{op : "remove", path : `/${deleteAtIndex}`}
					]
					const patchedFile = jsonpatch.applyPatch(json, patch).newDocument
					console.log(patchedFile)

					fs.writeFile(filepath, JSON.stringify(patchedFile), 'utf8', (err)=>{
						if(err){
							console.log("Error in paradise?")
							res.status(300).json({error : "Can't patch to file"})
						}else{
							res.status(200).json({success : "Record successfully deleted"})
						}
					})

				}else{
					res.status(400).json({error:"Record coould not be found"})
				}
			}catch{
				res.status(300).json({error : "The File could not be parsed for deletion"})
			}
		}else{
			res.status(300).json({error : "Invalid route"})
			return
		}
	})
})


module.exports = router;
