//Example fetch using DnD5eAPI - place subclasses in ul

let spellList = JSON.parse(localStorage.getItem('spells')) || [];
//holds the currently searched spell
let currentSpell
function getFetch(){

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
              //adds Event listener to Each
              document.querySelector(`#${li.id}`).addEventListener('click', ui.showDes)
            })
          }
      }
      //This function makes the request to the api to search for the spell name that was entered
      searchSpells(){
        const choice = document.querySelector('input').value.replaceAll(' ', '-')
        const url = `https://www.dnd5eapi.co/api/spells/${choice}`
      
        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              // this conditional checks if user entered the correct spell if not alerts an error or displays spell is correc
              if(data['name'] !== undefined){
                document.querySelector('h2').innerText = data.name
                document.querySelector('p').innerText = data.desc                  
              // creates objects with the spells info to append to spellList array for local storage
                let spells = {
                    nameOf: data.name,
                    des: data.desc,
                  }
                  currentSpell = spells
                  console.log(currentSpell.nameOf)
              } else {
                alert(`Error you didn't enter a spell`)
                document.querySelector('input').value = ''
              }
            })
            .catch(err => {
                console.log(`error ${err}`)
            });

      }
      //this function adds the currently searched spell to your list and commits it to local storage
      addSpelltoList(){
        const li = document.createElement('li')
        li.innerText = currentSpell.nameOf
        li.id = currentSpell.nameOf
        // pushing it to the the arraty
        spellList.push(currentSpell)
                  
        // setting up the local storage 
        localStorage.setItem('spells', JSON.stringify(spellList))

        //appending spells to the dom 
        document.querySelector('ul').appendChild(li)

         //adds Event listener to new spell
         document.querySelector(`#${li.id}`).addEventListener('click', ui.showDes)

      }
      //this function will eventuall print the spell description to the DOM. maybe by toggling a 'hidden' css class?
      //for now it searches through the array of spells and consoleLogs the decription
      showDes(click){
        for (let spell of spellList){
          if(spell.nameOf === click.target.id){
            console.log(spell.des)
          }
        }
      }
}
const ui = new Interface('')
ui.displaySpells()
document.querySelector('#searchSpells').addEventListener('click', ui.searchSpells)
document.querySelector('#addToList').addEventListener('click', ui.addSpelltoList)



