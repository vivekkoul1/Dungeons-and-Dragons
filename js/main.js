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
        const li = document.createElement('li')
        li.innerText = data.name
        li.id = data.name

        let spells = {
            nameOf: data.name,
            des: data.desc,
          }
          spellList.push(spells)
          console.log(spellList)
          localStorage.setItem('spells', JSON.stringify(spellList))
        document.querySelector('ul').appendChild(li)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


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