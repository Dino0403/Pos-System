// Step1 : Drink Constructor Function
function Drink(name, ice, sugar) {
  this.name = name
  this.ice = ice
  this.sugar = sugar
}

let blackTea = new Drink('Black Tea', 'Less', 'Less')
console.log(blackTea)

// Step2 : Drink Price Function
Drink.prototype.getPrice = function () {
  switch (this.name) {
    case 'Espresso':
    case 'Fruit Tea':
      return 60
    case 'Apple Juice':
    case 'Cocoa':
    case 'Milk Tea':
      return 50
    case 'Green Tea':
    case 'Black Tea':
    case 'Oolong Tea':
      return 30
  }
}

// Stpe3 : POS SYSTEM Constructor Function
function PosSystem() { }
const pos = new PosSystem()

// Step5 : get checked drink info
PosSystem.prototype.checkedValue = function (input) {
  let value = ''
  const items = document.querySelectorAll(`[name="${input}"]`)
  items.forEach(item => {
    if (item.checked) {
      value = item.value
    }
  })
  return value
}

// Step6 : add card to html Function
const orderLists = document.querySelector('[data-order-lists]')
PosSystem.prototype.addCard = function (drink) {
  let htmlContent = `
    <div class="card mb-3">
      <div class="text-right p-2 corss">
        <i class="far fa-times-circle" data-pos="delete"></i>
      </div>
      <div class="card-body text-center">
        <i class="fas fa-coffee"></i>
        <h5 class="card-title mt-3">${drink.name}</h5>
        <span class="card-text item">${drink.ice}</span>
        <span class="card-text item">${drink.sugar}</span>
      </div>
      <div class="card-footer text-muted text-right">
        <i class="fas fa-dollar-sign"></i><span data-drink-price>${drink.getPrice()}</span>
      </div>
    </div>
  `
  orderLists.insertAdjacentHTML('afterbegin', htmlContent)
}

// Step7 : remove card Function
PosSystem.prototype.delete = function (target) {
  target.remove()
}

// Step8 : checkout Function
const checkoutButton = document.querySelector('[data-pos="checkout"]')
PosSystem.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(item => {
    totalAmount += Number(item.textContent)
  })
  return totalAmount
}

// Step9 : clear Function
PosSystem.prototype.clearCard = function (target) {
  target.querySelectorAll('.card').forEach(item => {
    item.remove()
  })
}


// Stpe4 : Get add drink info
const addButton = document.querySelector('[data-add]')
addButton.addEventListener('click', function () {
  // 取得飲料資訊
  const drinkName = pos.checkedValue('drink')
  const ice = pos.checkedValue('ice')
  const sugar = pos.checkedValue('sugar')
  console.log(drinkName, ice, sugar)
  // 如沒有選擇飲料 跳出提示
  if (!drinkName) {
    alert('Please choose drink')
    return
  }
  // 建立飲料實例
  const drink = new Drink(drinkName, ice, sugar)
  console.log(drink)
  // 產生飲料卡片
  pos.addCard(drink)
})

// Step7 : remove card
orderLists.addEventListener('click', function (event) {
  const target = event.target
  const deleteTarget = target.parentElement.parentElement
  if (target.matches('[data-pos="delete"]')) {
    pos.delete(deleteTarget)
  }
})


// checkout and clear card
checkoutButton.addEventListener('click', function () {
  alert(`Total amount of drinks：$${pos.checkout()}`)
  pos.clearCard(orderLists)
})


/**
    const drinks = document.querySelectorAll('[name="drink"]')
    drinks.forEach(drink => {
      if (drink.checked) {
        console.log(drink.value)
      }
    })
    const ice = document.querySelectorAll('[name="ice"]')
    ice.forEach(item => {
      if (item.checked) {
        console.log(item.value)
      }
    })
    const sugar = document.querySelectorAll('[name="sugar"]')
    sugar.forEach(item => {
      if (item.checked) {
        console.log(item.value)
      }
    })
    console.log(drinks, ice, sugar)
*/