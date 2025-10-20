let input_element = document.getElementById("file-input")
let fileInfoElement = document.getElementsByClassName("file-info")
let fileNameElement = document.getElementsByClassName("file-name")
const inputElementForm = document.getElementById("file-input-form")



inputElementForm.addEventListener("submit", async function(e){
	const currentDate = Date.now()
	const currentDateParam = new URLSearchParams({
		currentDate : `${currentDate}`
	})

	const files = input_element.files
	e.preventDefault()
	if(!files){
		alert("No file(s) selected")
		return
	}
	
	//console.log('Before Submit : ',files)
	const formData = new FormData()

	for(const file of files){
		formData.append("file",file)
	}
	const fileNames = 
	console.log(formData)
	try{
		const response = await fetch(`/api/data?${currentDateParam.toString()}`,{
			method : 'POST',
			body : formData,
			credentials : 'include'
		})

		const result = await response.json()
		console.log("Upload response : ", result)			
	}catch(error){
		console.error("Upload media error : ", error)
	}


	const fileInfoFormData = new FormData()
	
	
	let arrFileInfo = []
	for(let i = 0; i < fileInfoElement.length; i++){
		let unique =  fileNameElement[i].innerText
		unique= unique.slice(0,unique.lastIndexOf('.')) + '-' +currentDate+unique.slice(unique.lastIndexOf('.'))
		const objAppend = {
			fileName: unique,
			imageInfo: fileInfoElement[i].value
		}
		console.log(objAppend)
		arrFileInfo.push(objAppend)
	}

	try{
		const response = await fetch('/api/file-record',{
			method :'PUT',
			headers : {
				'Content-type': 'application/json'
			},
			body : JSON.stringify({arrFileInfo})
		})
	}catch(error){
		console.error("File info upload error :", error)
	}
})

