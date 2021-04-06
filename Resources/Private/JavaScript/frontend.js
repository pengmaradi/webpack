import "../Styles/App.scss"


let checked = false
document.querySelectorAll('body').addEventListener('click',()=>{
    checked || (checked = true)
})