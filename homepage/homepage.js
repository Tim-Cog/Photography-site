const parentDiv = document.getElementsByClassName("main-body")[0]
const viewedCarousel = document.getElementsByClassName("image")[0]
const closeButton = document.getElementsByClassName("close-button")[0]
const info = document.getElementsByClassName("info")[0]
const carousel = document.getElementsByClassName("carousel")[0]

let imageList = []
let imgList

let currentlyOpened


fetch('/api/file-record',{
	headers : {
		'Content-type' : 'application/json'
	}
})
	.then(response => response.json())
	.then(data => {
		imgList = data;
		console.log(imgList)
		for(let i = 0; i < imgList.length; i++){
			let newImg = document.createElement("img")
			newImg.setAttribute("src",`/media-files/images/${imgList[i].fileName}`)
			newImg.setAttribute("class","list-images")
			parentDiv.append(newImg)	
			newImg.addEventListener("click",function(){
				document.getElementsByClassName("cover")[0].style.display = "block";
				let newAppend = newImg.cloneNode();
				//to identify the image for the carousel
				openedAsset = Array.from(document.getElementsByClassName("list-images")).indexOf(newImg)
				currentlyOpened = i;
				newAppend.setAttribute("class","carousel")
				newAppend.addEventListener("click", () => {
					console.log("hmm")
					document.getElementById("info-text").innerHTML = imgList[i].imageInfo
					info.style.display = "block"
				})
				viewedCarousel.append(newAppend);

			})

		}
	})
	.catch(error=>console.error('Error parsing:', error))





document.getElementsByClassName("previous-image")[0].addEventListener("click", function(){
	if(currentlyOpened > 0){
		currentlyOpened--
		let newAppend = viewedCarousel.firstChild.cloneNode(true);
		viewedCarousel.removeChild(viewedCarousel.firstChild)
		newAppend.setAttribute("src", `/media-files/images/${imgList[currentlyOpened].fileName}`)
		document.getElementById("info-text").innerHTML = imgList[currentlyOpened].imageInfo
		newAppend.addEventListener("click", () => {
			info.style.display = "block"
		})

		viewedCarousel.append(newAppend)		
		console.log("left")
	}else{
		console.log("Can't go back. This is the first image")
	}

})


document.getElementsByClassName("next-image")[0].addEventListener("click", function(){
	if(currentlyOpened < imgList.length - 1){
		currentlyOpened++
		let newAppend = viewedCarousel.firstChild.cloneNode();
		viewedCarousel.removeChild(viewedCarousel.firstChild)
		newAppend.setAttribute("src", `/media-files/images/${imgList[currentlyOpened].fileName}`)
		document.getElementById("info-text").innerHTML = imgList[currentlyOpened].imageInfo
		newAppend.addEventListener("click", () => {
			info.style.display = "block"
		})
		viewedCarousel.append(newAppend)
		console.log("right")	
	}else{
		console.log("Can't go foward. This is the last image")
	}

})


closeButton.addEventListener("click",function(){
	document.getElementsByClassName("cover")[0].style.display = "none"
	viewedCarousel.removeChild(viewedCarousel.firstChild)
})

info.addEventListener("click",()=>{
	info.style.display = "none"
})
