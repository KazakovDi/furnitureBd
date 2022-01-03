const clearBtn = document.querySelector("#clearBtn")
const form = document.querySelector("form")
const inputs = document.querySelectorAll("input")
const options = document.querySelectorAll("option")
clearBtn.addEventListener("click", e=> {
    inputs.forEach(inp=> {
        inp.value=""
    })
    options.forEach(option=> {
        option.removeAttribute("selected")
    })
})