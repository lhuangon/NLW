//API IBGE para formulario

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {

    for( const state of states ) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

    }

  })
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
  .then(res => res.json())
  .then(cities => {

    for(const city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled = false;
  })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

//Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");

for(const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);

}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target;
  //adicionar ou removar uma classe com js
  itemLi.classList.toggle("selected");
  
  const itemId = itemLi.dataset.id;
  console.log('Item do id:', itemId)
  
//verificar se existem itens selecionado, se sim
//pegar os itens selecionados

const alreadySelect = selectedItems.findIndex( item => {
  const itemFound = item == itemId //Isso será true ou false
  return itemFound
})

//se já estiver selecionado
if( alreadySelect >= 0 ) {
  //tirar a seleção
  const filteredItems = selectedItems.filter( item => {
    const itemIsDifferent = item != itemId //vai tirar do item porque a setença é falso
    return itemIsDifferent
  })
  
  selectedItems = filteredItems
} else{
  //se não estiver selecionado
  //adicionar à seleção
  selectedItems.push(itemId)
}

console.log('selectedItem', selectedItems)

//Atualizar o campo escondido com os itens selecionados
collectedItems.value = selectedItems
}
