const tarjeta = document.querySelector('#tarjeta'),
	  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	  formulario = document.querySelector('#payment-form'),
	  numeroTarjeta = document.querySelector('#tarjeta .numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	  logoMarca = document.querySelector('#logo-marca'),
	  firma = document.querySelector('#tarjeta .firma p'),
	  mesExpiracion = document.querySelector('#tarjeta .mes'),
	  yearExpiracion = document.querySelector('#tarjeta .year');
	  ccv = document.querySelector('#tarjeta .ccv');

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});


// * Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// Volteamos la tarjeta para que el usuario vea el frente.
	mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Jhon Doe';
	}

	mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});

//..............kushki......................

const kushki = new Kushki({
  merchantId: "98f21ac851f54da09d5d1f8594e8de36", // Your public merchant id 
  inTestEnvironment: true,
});

kushki.requestToken({
  amount: '49.99',
  currency: "USD",
  card: {
    name: form.name,
    number: form.number,
    cvc: form.cvv,
    expiryMonth: form.expiry_month,
    expiryYear: form.expiry_year,
  },
}, (response) => {
  if(!response.code){
    console.log(response);
    // Submit your code to your back-end
  } else {
    console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
  }
});

var request = require("request");

var options = {
    method: 'POST',
    headers: {
      'Private-Merchant-Id': "aba4d595375f4bdc8eb904823a4985ca" // Replace with your Private merchant id
      'Content-Type': 'application/json'
    },
    url: 'https://api-uat.kushkipagos.com/card/v1/charges', // Test environment
    body: {
      token: "V0OzRB100000xhxQB8035251pHLBQsq5", // Replace with the token you recieved
      amount: {
        subtotalIva: 0,
        subtotalIva0: 149900,
        ice: 0,
        iva: 0,
        currency: "COP"
      },
      metadata: {
        contractID: "157AB"
      },
      contactDetails: {
        documentType: "CC",
        documentNumber: "1009283738",
        email: "test@test.com",
        firstName: "Diego",
        lastName: "Cadena",
        phoneNumber: "+5730162826289"
      },
      orderDetails: {
        siteDomain: "tuebook.com",
        shippingDetails: {
          name: "Diego Cadena",
          phone: "+5730162826289",
          address: "Eloy Alfaro 139 y Catalina Aldaz",
          city: "Medellín",
          region: "Antioquia",
          country: "Colombia",
          zipCode: "170402"
        },
        billingDetails: {
        name: "Diego Osorio",
        phone: "+593988734644",
        address: "Eloy Alfaro 139 y Catalina Aldaz",
        city: "Medellín",
        region: "Antioquia",
        country: "Colombia",
        zipCode: "170402"
      }
    },
    productDetails: {
      product: [{
          id: "198952AB",
          title: "eBook Digital Services",
          price: 69900,
          sku: "10101042",
          quantity: 1
        },
        {
          id: "198953AB",
          title: "eBook Virtual Selling",
          price: 99900,
          sku: "004834GQ",
          quantity: 1
        }
      ]
    },
    fullResponse: true
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

