document.addEventListener("DOMContentLoaded", initialize)
const dogUrl = "http://localhost:3000/dogs"
const dogTable = document.querySelector("#table-body")
const headers = { 
    "Content-Type" : "application/json",
    "Accept" : "application/json"
}

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
    const editForm = document.querySelector("#dog-form")
    // const submitButton = document.querySelectorAll("input")[3]

    dogTable.addEventListener("click", (e) => { 
        if (e.target.className === "edit-btn") { 
            populateEditForm(e.target.dataset.id)
        } 
    })

    editForm.addEventListener("submit", (e) => { 
        event.preventDefault()
        fetch(`${dogUrl}/${dogId}`, { 
            method: "PATCH", 
            headers, 
            body: JSON.stringify({
                name: e.target.name.value,
                breed: e.target.breed.value,
                sex: e.target.sex.value,
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        
    })
}

function populateEditForm(dogId) { 

    fetch(`${dogUrl}/${dogId}`)
        .then(resp => resp.json())
        .then(dog => {  
            
            let nameInput = document.querySelectorAll("input")[0]
            let breedInput = document.querySelectorAll("input")[1]
            let sexInput = document.querySelectorAll("input")[2]

            nameInput.value = dog.name
            breedInput.value = dog.breed
            sexInput.value = dog.sex

        })        
}

