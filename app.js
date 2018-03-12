const menuButt = document.getElementById("butt")
const image = document.getElementById('image')
const save = document.getElementById('submit')
let idNumber = 0


fetch("https://secure-eyrie-78012.herokuapp.com/roles")
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    populate(data)
    changeImage(data)
  })
  .catch(console.error)


function populate(data) {
  data.forEach(function(curretName, i) {
    var option = document.createElement('option')
    option.innerText = curretName.label
    option.id = curretName.id
    menuButt.appendChild(option)
  })
}

function changeImage(data) {


  menuButt.addEventListener('change', function(event) {
    guyChosen = document.querySelector('select').value
    if (guyChosen === "Assassin") {
      image.src = data[0].imageURL
      idNumber = 1
    } else if (guyChosen === "Siren") {
      image.src = data[2].imageURL
      idNumber = 3
    } else if (guyChosen === "Commando") {
      image.src = data[1].imageURL
    } else if (guyChosen = "Choose Roll") {
      image.src = "assets/placeholder.jpg"
      idNumber = 2
    }
  }, false)

}

submit.addEventListener('click', event => {
  event.preventDefault()
  sendFormData()
})


function sendFormData() {
  let data = new FormData(document.querySelector("form"))
  let status = document.getElementById('status')
  fetch(`https://secure-eyrie-78012.herokuapp.com/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: data.get("firstName"),
        lastName: data.get("secondName"),
        role: idNumber,
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      status.innerText = data.message
      setTimeout(function() {
        status.innerText = ''
      }, 4000);
    })
    .catch(err => alert(err))
}
