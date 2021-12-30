const clearBtn = document.querySelector("#clearBtn")
const inputs = document.querySelectorAll("input")
clearBtn.addEventListener("click", ()=> {
    inputs.forEach(inp=> {
        inp.value=""
    })
})