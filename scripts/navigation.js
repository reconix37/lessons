import { NAV_LIST } from "./constants.js";

function createNav() {
    const nav = document.getElementById("main-nav")
    const list = document.createElement("ul")

    fillList(NAV_LIST, list)
    nav.appendChild(list)
}

function fillList(list, listNode){
    list.forEach((object) => {

        const listItem = document.createElement("li")
        const linkItem = document.createElement("a")

        linkItem.innerText = object.title
        linkItem.href = window.location.origin + object.link

        listItem.appendChild(linkItem)
        listNode.appendChild(listItem)

    })
}

createNav()