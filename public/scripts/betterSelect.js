const sortSelect = document.querySelector("#sortSelect")
    const selectOptions = document.querySelectorAll("#sortSelect option")
    selectOptions.forEach(option=> {
        if(option.value === sortSelect.className) {
            option.setAttribute("selected","selected")
        }
    })
const typeSelect = document.querySelector("#typeSelect")
const typeOptions = document.querySelectorAll("#typeSelect option")
typeOptions.forEach(option=> {
    if(option.value === typeSelect.className) {
        option.setAttribute("selected","selected")
    }
})