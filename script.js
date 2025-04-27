const menuDiv = document.getElementById('menu');

// Function 1 - getMenu()
async function getMenu() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
    const data = await response.json();

    data.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price}/-</p>
        <button class="add-btn">+</button>
      `;
      menuDiv.appendChild(menuItem);
    });

  } catch (error) {
    console.error('Error fetching menu:', error);
  }
}

// Function 2 - takeOrder()
function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const data = await response.json();
        const burgers = data.filter(item => item.name.toLowerCase().includes('burger'));

        const selectedBurgers = [];
        for (let i = 0; i < 3; i++) {
          const randomBurger = burgers[Math.floor(Math.random() * burgers.length)];
          selectedBurgers.push(randomBurger);
        }

        resolve({ burgers: selectedBurgers });
      } catch (error) {
        reject(error);
      }
    }, 2500);
  });
}

// Function 3 - orderPrep()
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// Function 4 - payOrder()
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

// Function 5 - thankyouFnc()
function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

// Handling all promises one after the other
async function processOrder() {
  try {
    await takeOrder();
    await orderPrep();
    const payment = await payOrder();
    if (payment.paid) {
      thankyouFnc();
    }
  } catch (error) {
    console.error('Error processing order:', error);
  }
}

// Trigger order process manually or automatically after load (optional)
setTimeout(() => {
  processOrder();
}, 3000); // after 3 seconds
