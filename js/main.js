
let spellList = JSON.parse(localStorage.getItem('spells')) || [];
//holds the currently searched spell

// creratign a class to display interface 
class Interface{
  constructor(){
    this.unique = true
    this.currentSpell = ''
  }
    
  // this function will display spell data that user previously entered 
  displaySpells(){
    const ul = document.querySelector('ul')
    ul.innerHTML = ''

    // this conditionally will run on page load
    // to see if theres been spells entered into the loal storage 
    if(spellList.length > 0){
      spellList.forEach(element => {
        //creates an li for the spell name and adds it to the DOM.
        const li = document.createElement('li')
        li.id = element.index
        li.innerText = element.nameOf
        //clears ul of children to prevent rendering twice
        ul.appendChild(li)
        //adds Event listener to Each that displays description when clicked
        document.querySelector(`#${li.id}`).addEventListener('click', ui.showDes)
        ui.createDes(element)
      })
    }
  }
  //This function makes the request to the api to search for the spell name that was entered
  async searchSpells() {
    const choice = document.querySelector('input').value.replaceAll(' ', '-').toLowerCase()
    const url = `https://www.dnd5eapi.co/api/spells/${choice}`
    //async/await syntax to make more readable
    const res = await fetch(url) // parse response as JSON
    const data = await res.json()
    // this conditional checks if user entered the correct spell if not alerts an error or displays spell is correct
    try {
      if (data['name'] !== undefined) {
        document.querySelector('#searchName').innerText = data.name
        document.querySelector('#searchDesc').innerText = data.desc
        // creates objects with the spells info to append to spellList array for local storage
        let spells = {
          nameOf: data.name,
          des: data.desc,
          index: data.index,
        }
        console.log(spells)
        //makes the object available outside this function, would be good to tidy up the global variables though
        ui.currentSpell = spells
        //checks to see if spell is already on list
        spellList.forEach(spell => {
          if (spell.nameOf === ui.currentSpell.nameOf) ui.unique = false
          else { ui.unique = true }
        })
      }
      else {
        alert(`Error you didn't enter a spell`)
        document.querySelector('input').value = ''
      }
    }
    catch {
      err => {
        console.log(`error ${err}`)
      }
    };

  }
  //this function adds the currently searched spell to your list and commits it to local storage
  addSpelltoList() {
    //only adds if spell is not on list already
    if (ui.currentSpell && ui.unique) {
      // pushing it to the the arraty
      spellList.push(ui.currentSpell)

      // setting up the local storage 
      localStorage.setItem('spells', JSON.stringify(spellList))

      //updates the list by re-rendering in the DOM
      ui.displaySpells()
      //clears the current spell so the and statement above prevents adding the same spell repeatedly
      ui.currentSpell = false
      //removes the searched spell from the dom
      document.querySelector('#searchName').innerText = ''
      document.querySelector('#searchDesc').innerText = ''
    }
  }

  createDes(spell) {
    //adds spell description to Dom then hides it separate method so it can be called during page load and adding
    const p = document.createElement('p')
    p.innerText = spell.des
    //adds the hidden class and the spell's name to the description and appends to the li
    p.classList.add(`hidden`, `${spell.index}desc`)
    document.querySelector(`#${spell.index}`).appendChild(p)
  }
  //this function will print the spell description to the DOM by toggling a 'hidden' css class. It gathers the clicked
  //elements id then checks for a <p> with a class of that name and toggles hidden. 
  showDes(click) {
    console.log(click.target.id)
    document.querySelector(`.${click.target.id}desc`).classList.toggle('hidden')
  }
  emptyList(){
    localStorage.clear()
    spellList = []
    ui.displaySpells()
  }
}
const ui = new Interface('')
//populates the list from storage
ui.displaySpells()
document.querySelector('#searchSpells').addEventListener('click', ui.searchSpells)
document.querySelector('#addToList').addEventListener('click', ui.addSpelltoList)
document.querySelector('#clearList').addEventListener('click', ui.emptyList)



