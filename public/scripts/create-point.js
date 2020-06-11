function populateUFs(){
    const ufsSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json() )
    .then(states => {
        for( const state of states ){
            ufsSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citiySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citiySelect.innerHTML = "<option value=>Selecione uma Cidade</option>"
    citiySelect.disabled = true

    fetch(url)
    .then( res =>  res.json() )
    .then(cities => {
        for( const city of cities ){
            citiySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citiySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Ítens de coleta
const itensToCollect = document.querySelectorAll(".itens-grid li")

for( item of itensToCollect ){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    if ( alreadySelected >= 0 ){
        const filterdItens = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filterdItens

    }else{
        selectedItems.push(itemId)
    }

    //Atualiza o campo escondido com o ítem seleciondo
    collectedItens.value = selectedItems
}