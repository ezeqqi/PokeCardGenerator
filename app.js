const typeColor = {
  bug: "#a0a65f",
  dragon: "#5055bc",
  dark: "#140b35",
  electric: "#e2ad1e",
  fighting: "#bb4333",
  fire: "#e46845",
  fairy: "#ecb1ea",
  flying: "#d6ddf4",
  grass: "#85bf5d",
  ground: "#cab274",
  ghost: "#4b407d",
  ice: "#b2e8f9",
  normal: "#c4b8ad",
  poison: "#913f90",
  psychic: "#e45b8a",
  steel: "#96979c",
  rock: "#8c743c",
  water: "#4381c1",
};
const url = " https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
    let id = Math.floor(Math.random() * 251) + 1;
    const finalUrl = url + id;
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
      generateCard(data);
    });
};



let generateCard = (data) => {
  console.log(data);
  const id = data.id
  const hp = data.stats[0].base_stat;
  const imgSrc = `https:raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpecAttack = data.stats[3].base_stat;
  const statSpecDefense = data.stats[4].base_stat;
  const statSpeed = data.stats[5].base_stat;  
  const primaryColorName = data.types[0].type.name;
  const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name)
  let secondaryColorName
  let secondaryColor
  if(data.types.length > 1) {
    secondaryColorName = data.types[1].type.name;
    secondaryColor = typeColor[secondaryColorName];
  }

  const primaryColor = typeColor[primaryColorName];
   
  console.log(data.stats);

  card.innerHTML = `      
        <div class="sprite-div">
          <img src=${imgSrc} />
        
        </div>

        <div class="info-div">
            <div class="fields">
              <h3 class="id">#${id} </h3>
              <div class="types">Types: </div>
              <div class="possible-abilities">Abilities: </div>
            </div>
           
        </div>
                
        <div class="competitive-div">
          <div class="stats"> 
            <p id="hp">HP:  </p>
            <p id="atk">Atack:  </p>
            <p id="def">Defense: </p>
            <p id="spec-atk">Sp. Atk: </p>
            <p id="spec-def">Sp. Def: </p>
            <p id="speed">Speed:  </p>
          </div>

          <div class="stats-value"> 
            <p class="hp"> ${hp} </p>
            <p class="attack"> ${statAttack} </p>
            <p class="defense"> ${statDefense} </p>
            <p class="special-attack"> ${statSpecAttack} </p>
            <p class="special-defense"> ${statSpecDefense} </p>
            <p class="speed"> ${statSpeed} </p>
          </div>
             
        </div>
  `;
  
  appendInfo(pokeName)
  appendAbility(abilities)
  appendTypes(data.types);
  styleCard(primaryColor);
  styleSecondColor(secondaryColorName, secondaryColor);
};
let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    span.id = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};
let styleCard = color => {
  //card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};
 let styleSecondColor = (colorname, color) => {
  const div = document.getElementById(`${colorname}`)
  div.style.backgroundColor = color
}
let appendInfo = data => {
  const spanName = document.createElement("SPAN");
  spanName.textContent = data;
  document.querySelector(".id").appendChild(spanName)
}
let appendAbility = abilities => {
  abilities.forEach(ability => {
    let span = document.createElement("SPAN");
    span.id = ability
    span.textContent = ability;
    document.querySelector(".possible-abilities").appendChild(span)
  });
}

let createButton = (stats) => {
  stats.forEach(stat => {
    let span = document.createElement("div");
    span.className = "progress-bar";
    span.role = "progress-bar"
    span.ariaValueMax = 255
    span.ariaValueMin = 0
    span.ariaValueNow = stat.base_stat;
    document.querySelector(`.${stat.name}`).appendChild(span)
  })
}

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);