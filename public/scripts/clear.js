const clearBtn = document.querySelector("#clearBtn")
const form = document.querySelector("form")
const inputs = document.querySelectorAll("input")
const selects = document.querySelectorAll("select")
clearBtn.addEventListener("click", e=> {
    inputs.forEach(inp=> {
        inp.value=""
    })
    selects.forEach(select=> {
        for(let i=0; i<select.length; i++) {
            select[i].removeAttribute("selected")
        }
        select[0].setAttribute("selected", "selected")
    })
})