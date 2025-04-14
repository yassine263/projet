let movable=false
const boule=document.getElementById("boule")
window.addEventListener("mousemove",(event)=>{
    if (movable){
    console.log(event.clientX,event.clientY)
    boule.style.left=(event.clientX-boule.clientWidth/2)+"px"
    boule.style.top=(event.clientY-boule.clientHeight/2)+"px"
    }
})

document.getElementById("boule").addEventListener("click",()=>{
movable=!movable
})

window.addEventListener("keydown",(event)=>{
    switch(event.key){
        case "ArrowLeft": boule.style.left=(boule.offsetLeft-5)+"px";break;
        case "ArrowRight": boule.style.left=(boule.offsetLeft+5)+"px";break;
        case "ArrowUp": boule.style.top=(boule.offsetTop-5)+"px";break;
        case "ArrowDown": boule.style.top=(boule.offsetTop+5)+"px";break;
    }
})