import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
        databaseURL: "https://real-fdb06-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const todoApp = initializeApp(appSettings)
const database = getDatabase(todoApp)
const todoList = ref(database, "todo")


const todoListHTML = document.getElementById("input-field")
const addTaskBtn = document.getElementById("add-button")
const listItems = document.getElementById("todo--items")


addTaskBtn.addEventListener("click", () => {
        let inputValue = todoListHTML.value
        if (inputValue) {
                push(todoList, inputValue)
                clearInputValue()
        }

})

onValue(todoList, function(snapshot) {

        if (snapshot.exists()) {
                let todoArr = Object.entries(snapshot.val())

                clearListItems()

                for (let i = 0; i < todoArr.length; i++) {
                        let currentItem = todoArr[i]
                        let currentItemID = currentItem[0]
                        let currentItemValue = currentItem[1]
                        renderingHtml(currentItem)
                }
        } else {
                listItems.innerHTML = "No todo-list yet..."
        }


})

function clearListItems() {
        listItems.innerHTML = ""
}

function clearInputValue() {
        todoListHTML.value = ""
}

function renderingHtml(item) {
        let itemID = item[0]
        let itemValue = item[1]

        let newEl = document.createElement("li")
        newEl.textContent = itemValue

        newEl.addEventListener("click", function() {
                let exactLocationItemID = ref(database, `todo/${itemID}`)
                remove(exactLocationItemID)
        })


        listItems.appendChild(newEl)



}