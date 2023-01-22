//Example fetch using DnD5eAPI - place subclasses in ul
document.querySelector('button').addEventListener('click', getFetch)
let spellList = JSON.parse(localStorage.getItem('spells')) || []
function getFetch(){
  const choice = document.querySelector('input').value.replaceAll(' ', '-')
  const url = `https://www.dnd5eapi.co/api/spells/${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        console.log(data.desc)
        // this conditional checks if user entered the correct spell if not alerts an error or displays spell is correc
        if(data['name'] !== undefined){
          const li = document.createElement('li')
          li.innerText = data.name
          li.id = data.name

          // creates objects with the spells info to append to spellList array for local storage
          let spells = {
              nameOf: data.name,
              des: data.desc,
            }
            // pushing it to the the arraty
            spellList.push(spells)
            
            // setting up the local storage 
            localStorage.setItem('spells', JSON.stringify(spellList))

            //appending spells to the dom 
            document.querySelector('ul').appendChild(li)
        } else {
          alert(`Error you didn't enter a spell`)
          document.querySelector('input').value = ''
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
// creratign a class to display interface 
class Interface{
  constructor(){
  }
      // this function will display spell data that user previously entered 
      displaySpells(){
        // this conditionally will run on page load
        // to see if theres been spells entered into the loal storage 
          if(spellList.length > 0){
            spellList.forEach(element => {
              // the following code will be similar to what we're doing in the api call with appending elements
              const ul = document.querySelector('ul')
              const li = document.createElement('li')
              li.id = element['nameOf']
              li.innerText = element['nameOf']
              ul.appendChild(li)
            })
          }
      }

      showDes(){
        
      }
}
const ui = new Interface()
ui.displaySpells()
//local storage


// document.querySelector('button').addEventListener('click', anothaOne)

// function anothaOne(){
//     let botScore = Number(localStorage.getItem('botScore'))
//     botScore = botScore + 1
//     localStorage.setItem('botScore', botScore)
// }
// if(!localStorage.getItem('spells')){
//     localStorage.setItem('spells', ` ${data.index} `)
// } else {
// let spellList = localStorage.getItem('spells')
//     if(!spellList.includes(` ${data.index} `)){
//     spellList += ` ${data.index} `
//     localStorage.setItem('spells', spellList)
//     }
// }
