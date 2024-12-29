import data from "./data.js"


let subbutton=document.querySelector("#submitbutton")
let showbutton=document.querySelector("#show")
let formpage=document.querySelector("form")
let containers=document.querySelector(".containers")


let page=1
let inputData=""
let accessKey="-bXLzKPrMXVOBVcaH0B1pXf_JhgGMdCZAgFlHmR5GDc"
let ok="true"


containers.innerHTML=data.map((value,index,array)=>{
 return (`<div class="search_image">
                 <img src=${value.image_link} alt="">
                             <a href=${value.image_location} target="_blank">${value.description}</a>
                    </div>`)
}).join('')

 
async function searchimage(){

inputData=document.querySelector("input[type='text']").value
let url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`


let response=await fetch(url)
let data=await response.json()
let results=data.results


if(page==1){
 containers.innerHTML=""
}

page++

if(page>1){
 showbutton.style.display="block"
}


results.map((result) => {
 const imageWrapper=document.createElement("div");
 imageWrapper.classList.add("search_image");
 const image = document.createElement("img");
 image.src = result.urls.small;
 image.alt=result.alt_description;
 const imageLink = document.createElement("a");
 imageLink.href = result.links.html;
 imageLink.target="_blank";
 imageLink.textContent = result.alt_description;
 imageWrapper.appendChild(image);
 imageWrapper.appendChild(imageLink);
 containers.append(imageWrapper)
});


}



formpage.addEventListener("submit",(event)=>{
 event.preventDefault()
 page=1
 searchimage()
})
showbutton.addEventListener("click",()=>{
 searchimage()
})