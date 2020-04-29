document.addEventListener("DOMContentLoaded", initialize)
const dogUrl = "http://localhost:3000/dogs"
const dogTable = document.querySelector("#table-body")

function initialize() { 
    fetchDogs()
    buttonSetup()
}

function fetchDogs() { 
    fetch(dogUrl)
        .then(resp => resp.json())
        .then(dogs => { 
            renderDogs(dogs)
        })
}

function renderDogs(dogs) { 
    const dogTable = document.querySelector("#table-body")
    dogs.forEach(dog => {
        
        dogTable.innerHTML += `
            <tr><td> ${dog.name} </td> 
            <td> ${dog.breed} </td> 
            <td> ${dog.sex} </td> 
            <td><button data-id=${dog.id} class="edit-btn" >Edit</button></td></tr>
        `
        
        }
    )
}    

function buttonSetup() { 
    const dogTable = document.querySelector("#table-body")
    dogTable.addEventListener("click", (e) => { 
        if (e.target.className === "edit-btn") { 
            console.log(e.target.dataset.id)
        }
    })
}

