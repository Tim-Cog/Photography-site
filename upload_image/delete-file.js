const deleteForm = document.getElementById("delete")

deleteForm.addEventListener("submit", async function(e){
	e.preventDefault()
	const deleteParams = new URLSearchParams({
		opType : "delete",
		fileName : `${legend.innerHTML}`
	})
	const deleteFile = legend.innerHTML

	const opType = "delete"
	if(legend.innerHTML != ""){
		fetch(`/api/file-record?${deleteParams.toString()}`,{
			headers : {
				'contentType' : 'application/json'
			},
			method : 'PATCH'
		})

		fetch(`/api/data/${deleteFile}`,{
			method : "DELETE"
		})
	}else{
		alert("Select a file first")
		return {error:"No file selected"}
	}
})
