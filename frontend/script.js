const container = document.getElementById("roadmap-container")

function callBackend(){

const data = [
{
title:"AI Engineer Roadmap",
description:"Learn Python, ML, Deep Learning, and deploy AI systems.",
category:"AI/ML"
},

{
title:"Full Stack Developer",
description:"Master HTML, CSS, JS, React, Node, and databases.",
category:"Web Dev"
},

{
title:"DevOps Engineer",
description:"Learn Docker, Kubernetes, CI/CD pipelines and cloud.",
category:"DevOps"
}
]

container.innerHTML=""

data.forEach(roadmap=>{

const card=document.createElement("div")
card.className="card"

card.innerHTML=`
<div class="tag">${roadmap.category}</div>
<h3>${roadmap.title}</h3>
<p>${roadmap.description}</p>
`

container.appendChild(card)

})

}

/* MODAL */

function openModal(){
document.getElementById("modal").style.display="flex"
}

function closeModal(){
document.getElementById("modal").style.display="none"
}

/* ADD ROADMAP */

function addRoadmap(){

const name=document.getElementById("name").value
const title=document.getElementById("title").value
const desc=document.getElementById("description").value
const category=document.getElementById("category").value

const card=document.createElement("div")

card.className="card"

card.innerHTML=`
<div class="tag">${category}</div>
<h3>${title}</h3>
<p>${desc}</p>
<small>Submitted by ${name}</small>
`

container.appendChild(card)

closeModal()

}
