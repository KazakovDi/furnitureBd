const detailsList = document.querySelector("#detailsList")
const addBtn = document.querySelector("#add")
const selectItems = document.querySelectorAll(".selectItem")
const detailsIds = document.querySelector("#detailsIds")
let str = ''
addBtn.addEventListener("click", e => {
    selectItems.forEach(option=> {
        if(option.selected) {
            e.preventDefault()
            const li = document.createElement("li")
            const input = document.createElement("input")
            const btn = document.createElement("button")
            btn.className = "removeBtn"
            btn.innerText = "Удалить"
            input.value = option.label
            input.name = option.value
            li.appendChild(input)
            li.appendChild(btn)
            detailsList.appendChild(li)
            str = str + option.value + ","
            btn.addEventListener("click", e=> {
                e.preventDefault()
                li.remove()
            })
        } else {

        }
    })
    
    
})
addInput.addEventListener("click", ()=> {
    
})