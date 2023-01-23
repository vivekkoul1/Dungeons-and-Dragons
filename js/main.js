//Example fetch using DnD5eAPI - place subclasses in ul

let spellList = JSON.parse(localStorage.getItem('spells')) || [];
//holds the currently searched spell
let currentSpell
let unique = true
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
              li.id = element.index
              li.innerText = element.nameOf
              ul.appendChild(li)
              //adds Event listener to Each
              document.querySelector(`#${li.id}`).addEventListener('click', ui.showDes)
              ui.createDes(element)
            })
          }
      }
      //This function makes the request to the api to search for the spell name that was entered
      async searchSpells(){
        const choice = document.querySelector('input').value.replaceAll(' ', '-')
        const url = `https://www.dnd5eapi.co/api/spells/${choice}`
      
        
            const res = await fetch(url) // parse response as JSON
            const data = await res.json()
              // this conditional checks if user entered the correct spell if not alerts an error or displays spell is correc
              try{
              if(data['name'] !== undefined){
                document.querySelector('h2').innerText = data.name
                document.querySelector('p').innerText = data.desc                  
              // creates objects with the spells info to append to spellList array for local storage
                let spells = {
                    nameOf: data.name,
                    des: data.desc,
                    index: data.index,
                  }
                  console.log(spells)
                  //makes the object available outside this function, would be good to tidy up the global variables though
                  currentSpell = spells
                   //checks to see if spell is already on list
                  spellList.forEach(spell=>{
                    if(spell.nameOf === currentSpell.nameOf) unique = false
                    else{ unique = true}
                  })
              }
              else {
                alert(`Error you didn't enter a spell`)
                document.querySelector('input').value = ''
              }
            }
            catch {err => {
                console.log(`error ${err}`)
            }};

      }
      //this function adds the currently searched spell to your list and commits it to local storage
      addSpelltoList(){
        //only adds if spell is on list   maybe the correct way would be to add to local storage then call .displaySpells?
       if(currentSpell && unique){
        const li = document.createElement('li')
        li.innerText = currentSpell.nameOf
        li.id = currentSpell.index
        // pushing it to the the arraty
        spellList.push(currentSpell)
                  
        // setting up the local storage 
        localStorage.setItem('spells', JSON.stringify(spellList))

        //appending spells to the dom 
        document.querySelector('ul').appendChild(li)

         //adds Event listener to new spell
         document.querySelector(`#${li.id}`).addEventListener('click', ui.showDes)

         ui.createDes(currentSpell)

        //clears the current spell so the and statement above prevents adding the same spell repeatedly
        currentSpell = false
      }
    }

    createDes(spell){        
      //adds spell description to Dom then hides it separate method so it can be called during page load and adding
      const p = document.createElement('p')
      p.innerText = spell.des
      p.classList.add(`hidden`, `${spell.index}desc`)
      document.querySelector(`#${spell.index}`).appendChild(p)
    }
      //this function will print the spell description to the DOM by toggling a 'hidden' css class. It gathers the clicked
      //elements id then checks for a <p> with a class of that name and toggles hidden. 
      showDes(click){
        console.log(click.target.id)
        document.querySelector(`.${click.target.id}desc`).classList.toggle('hidden')
      }
      
      }
const ui = new Interface('')
//populates the list from storage
ui.displaySpells()
document.querySelector('#searchSpells').addEventListener('click', ui.searchSpells)
document.querySelector('#addToList').addEventListener('click', ui.addSpelltoList)



