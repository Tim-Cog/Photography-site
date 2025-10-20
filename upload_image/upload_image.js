const listFileNames = document.getElementById("image-list")
const imagePreview = document.getElementById("media-preview")
const fileInputField = document.getElementById("file-input")
const fileInputList = document.getElementById("file-input-list")
const shroud = document.getElementById("shroud")
const popUp = document.getElementById("upload-delete-pop-up")
const addFileButton =  document.getElementById("add-file")
const mediaInfo = document.getElementById("media-info")
const legend = document.getElementById("legend")

shroud.addEventListener("click",() => {
	shroud.style.display = "none"
	popUp.style.display = 'none'
})

addFileButton.addEventListener("click",() => {
	shroud.style.display = "block"
	popUp.style.display = 'block'
})


let filenamesList
let selected

fetch('/api/file-record',{
	headers : {
		'Content-type' : 'application/json'
	}
})
	.then(response => response.json())
	.then(data => {
		filenamesList = data
		//console.log(filenamesList[0])
		for(let i = 0; i < filenamesList.length; i++){
			let newFile = document.createElement("div")
			newFile.innerHTML = filenamesList[i].fileName
			newFile.setAttribute("class","img-name-list")
			newFile.style.borderBottom = "1px solid gray"
			//console.log(filenamesList[i])
			listFileNames.append(newFile)
			newFile.addEventListener("click", function(){
				if(!selected){
					selected = newFile
					selected.style.color = "white"
					selected.style.backgroundColor = "black"	
				}else{
					selected.style.color = "blue"
					selected.style.backgroundColor = "white"	
					newFile.style.color = "white"
					newFile.style.backgroundColor = "black"
					selected = newFile
				}
				console.log(filenamesList[i])
				legend.innerHTML = filenamesList[i].fileName
				let mediaElement = document.createElement("img")
				console.log(`/media-files/images/${filenamesList[i].fileName}`)
				mediaElement.setAttribute("src",`/media-files/images/${filenamesList[i].fileName}`)
				if(!imagePreview.firstChild){
					//do nothing
				}else{
					imagePreview.removeChild(imagePreview.firstChild)
				}
				imagePreview.prepend(mediaElement)
				mediaInfo.value = filenamesList[i].imageInfo
			})
		}
	})
	.catch(error=>console.error('Error parsing:', error))


window.addEventListener("load", () => {
	fileInputField.value = ''
})


fileInputField.addEventListener("change",() => {

	while(fileInputList.firstChild){
		console.log(fileInputList.firstChild.innerHTML)
		fileInputList.removeChild(fileInputList.firstChild)
	}

	document.cookie = `NO=${fileInputField.files.length}; path=/api/data`

	for(let i = 0; i < fileInputField.files.length; i++){
		let file_name_and_info = document.createElement("div")
		let file_info = document.createElement("div")
		let textareaField = document.createElement("textarea")
		textareaField.setAttribute("class","file-info")
		file_name_and_info.setAttribute("class","file-name")
		file_info.append(textareaField)
		file_name_and_info.innerHTML = fileInputField.files[i].name 
		file_name_and_info.append(file_info)
		fileInputList.append(file_name_and_info)
	}
})
