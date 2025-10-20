const editFileInfoForm = document.getElementById("edit-info-form")
const editFileInfo = document.getElementById("media-info")
//const legend = document.getElementById("legend")

editFileInfoForm.addEventListener("submit", async function(e){
	e.preventDefault()
	const editFileInfoParams = new URLSearchParams({
		opType : "edit",
		fileName : `${legend.innerHTML}`
	})
	const newFileInfo = {
		fileInfo : editFileInfo.value
	}
	fetch(`/api/file-record?${editFileInfoParams.toString()}`,{
		headers : {
			'Content-type' : 'application/json'
		},
		method : 'PATCH',
		body : JSON.stringify(newFileInfo)
	})
	.then(response => response.json())
	.catch(error=>console.error("Error Uploading"))
})
