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

const url = "https://pokeapi.co/api/v2/pokemon/";
const progBar = document.querySelector(".progress");
const generateBtn = document.querySelector(".generateBtn");
const card = document.querySelector(".card")
const form = document.querySelector("#searchPokemon");
const search = document.querySelector(".search-submit");

search.addEventListener("click", () => {
    let id = form.value;
    getOnePokemon(id);
})

let randomPokeData = () => {
    let id = Math.floor(Math.random() * 251 )+ 1;
    const finalUrl = url+id;
    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            generateCard(data);
        })
}

let getOnePokemon = (id) => {
    const finalUrl = url + id;
    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
        generateCard(data);
    });
}

let generateCard = (data) => {
    const id = data.id;
    const hp = data.stats[0].base_stat;
    let imgSrc = `https:raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
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

    card.innerHTML = `<div class="info sprites">
                        <h3>${pokeName}</h3>
                        <div class="pokeFrame">
                            <img id="image" src=${imgSrc}>
                        </div>
                        <div class="sprites" id="sprite-tag">
                        </div>
                        <div class="group-button">
                            <button id="RG"> I </button>
                            <button id="GS"> II </button>
                            <button id="RB"> III </button>
                            <button id="DP"> IV </button>
                            <button id="BW"> V </button>
                        </div>
                    </div>
                    <div class="info types">
                        <div class="type-keys"> 
                            <p id="id">Id:</p>
                            <p id="type-type">Types:</p>
                            <p id="abilities">Abilities: </p>
                        </div>

                        <div class="type-values"> 
                            <div>
                                <p id="idNumber">${id}</p>
                            </div>    
                            <div id="tipostipos">
                            </div>
                            <div class="possible-abilities">
                            </div>
                        </div>
                    </div>
                    <div class="info stats">
                        <div class="atributes-names"> 
                            <p>HP:  </p>
                            <p>Atack:  </p>
                            <p>Defense: </p>
                            <p>Sp. Atk: </p>
                            <p>Sp. Def: </p>
                            <p>Speed:  </p>
                        </div>

                        <div class="atribute-value"> 
                            <p class="hp">${hp}</p>
                            <p class="attack">${statAttack}</p>
                            <p class="defense">${statDefense}</p>
                            <p class="special-attack">${statSpecAttack}</p>
                            <p class="special-defense">${statSpecDefense}</p>
                            <p class="speed">${statSpeed}</p>
                        </div>
                        
                        <div class="atribute-value number">
                            <div class="progress">
                                <div class="progress__fill" id="hp"></div>
                            </div>
                            <div class="progress">
                                <div class="progress__fill" id="attack"></div>
                            </div>
                            <div class="progress">
                                <div class="progress__fill" id="defense"></div>
                            </div>
                            <div class="progress">
                                <div class="progress__fill" id="special-attack"></div>
                            </div>
                            <div class="progress">
                                <div class="progress__fill" id="special-defense"></div>
                            </div>
                            <div class="progress">
                                <div class="progress__fill" id="speed"></div>
                            </div>
                        </div>
                    </div>`;
    
    makeButtonsWork();
    updateProgressBar('hp', hp);
    updateProgressBar('attack', statAttack);
    updateProgressBar('defense', statDefense);
    updateProgressBar('special-attack', statSpecAttack);
    updateProgressBar('special-defense', statSpecDefense);
    updateProgressBar('speed', statSpeed);
    appendTypes(data.types);
    styleCard(primaryColor);
    appendAbility(abilities);
    styleSecondColor(secondaryColorName, secondaryColor)
};
let makeButtonsWork = () => {
    const RGBtn = document.querySelector("#RG");
    const GSBtn = document.querySelector("#GS");
    const RSBtn = document.querySelector("#RB");
    const DPBtn = document.querySelector("#DP");
    const BWBtn = document.querySelector("#BW"); 

    RGBtn.addEventListener("click", changeImgYellow)
    GSBtn.addEventListener("click", changeImgCrystal)
    RSBtn.addEventListener("click", changeImgEmerald)
    DPBtn.addEventListener("click", changeImgPlatinum)
    BWBtn.addEventListener("click", changeImgBlack)
}
let appendTypes = (types) => {
    types.forEach((item) => {
    let span = document.createElement("COLUMN-SPAN");
    span.textContent = item.type.name;
    span.id = item.type.name;
    document.querySelector("#tipostipos").appendChild(span);
    });
}

let styleCard = color => {
    card.querySelectorAll(".types column-span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
};

let styleSecondColor = (colorname, color) => {
    const div = document.querySelector(`#${colorname}`)
    div.style.backgroundColor = color
}

let appendAbility = abilities => {
    abilities.forEach(ability => {
      let span = document.createElement("SPAN");
      span.id = ability
      span.textContent = ability + "/ ";
      document.querySelector(".possible-abilities").appendChild(span)
    });
}

let updateProgressBar = (stat, value) => {
    value = Math.floor((value / 2.55));
    const element = document.querySelector(`#${stat}`)
    element.style.width = `${value}%`;
}

let changeImgYellow = () => {
    let id = document.querySelector("#idNumber").innerText;
    let img = document.querySelector("#image");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/${id}.png`;
}
let changeImgCrystal = () => {
    let id = document.querySelector("#idNumber").innerText;
    let img = document.querySelector("#image");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${id}.png`;
}
let changeImgEmerald = () => {
    let id = document.querySelector("#idNumber").innerText;
    let img = document.querySelector("#image");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${id}.png`;
}
let changeImgPlatinum = () => {
    let id = document.querySelector("#idNumber").innerText;
    let img = document.querySelector("#image");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/${id}.png`;
}
let changeImgBlack = () => {
    let id = document.querySelector("#idNumber").innerText;
    let img = document.querySelector("#image");
    img.src = `https:raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
}

generateBtn.addEventListener("click", randomPokeData);
window.addEventListener("load", randomPokeData);