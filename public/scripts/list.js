const detailsList = document.querySelector("#detailsList")
const addBtn = document.querySelector("#add")
const selectItem = document.querySelector("#selectItem")
const detailsIds = document.querySelector("#detailsIds")
let str = ''
addBtn.addEventListener("click", e => {
    e.preventDefault()
    const li = document.createElement("li")
    const btn = document.createElement("button")
    btn.className = "removeBtn"
    btn.innerText = "Удалить"
    li.innerHTML = selectItem.label
    li.appendChild(btn)
    detailsList.appendChild(li)
    str = str + selectItem.value + ","
    detailsIds.value = str
    btn.addEventListener("click", e=> {
        e.preventDefault()
        console.log(li.innerText)
        str.slice(li.innerText)
        detailsIds.value = str
        li.remove()
    })
})
addInput.addEventListener("click", ()=> {
    
})