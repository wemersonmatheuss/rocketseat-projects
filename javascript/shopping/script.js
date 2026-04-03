const item = document.getElementById("item")
const submit = document.getElementById("submit")

const alertBox = document.querySelector(".alert")

function createItem(name, checked = false) {
    const divItem = document.createElement("div")
    divItem.classList.add("item")

    const left = document.createElement("div")
    left.classList.add("left")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add("checkbox")
    checkbox.checked = checked

    const text = document.createElement("p")
    text.classList.add("text")
    text.textContent = name

    const trash = document.createElement("img")
    trash.src = "./images/icons/trashCan.png"
    trash.classList.add("trash")

    const divItens = document.querySelector(".itens")

    left.appendChild(checkbox)
    left.appendChild(text)

    divItem.appendChild(left)
    divItem.appendChild(trash)

    trash.addEventListener("click", () => {
        if (checkbox.checked) {
            divItem.remove()
            salvarItens()

            alertBox.style.display = "flex"
        } else {
            alert("Marque o item antes de excluir!")
        }
    })

    checkbox.addEventListener("change", () => {
        salvarItens()
    })

    divItens.prepend(divItem)
}

function salvarItens() {
    const itens = []

    document.querySelectorAll(".item").forEach((item) => {
        const text = item.querySelector(".text").textContent
        const checked = item.querySelector(".checkbox").checked

        itens.push({ text, checked })
    })

    localStorage.setItem("lista", JSON.stringify(itens))
}

function carregarItens() {
    const itensSalvos = JSON.parse(localStorage.getItem("lista")) || []

    itensSalvos.forEach((item) => {
        createItem(item.text, item.checked)
    })
}

submit.addEventListener("click", () => {
    if (item.value.trim() !== "") {
        createItem(item.value)
        salvarItens()

        item.value = ""
    }
})

const removeBox = document.querySelector(".removeBox")
removeBox.addEventListener("click", () => {
    alertBox.style.display = "none"
})

carregarItens()