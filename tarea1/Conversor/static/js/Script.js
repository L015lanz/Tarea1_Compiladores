// Script.js

/* Redirecciones */

function redirectHome() {
    window.location.href = "/";
}

function redirectBinario() {
    window.location.href = "binario";
}

function redirectDecimal() {
    window.location.href = "decimal";
}

function redirectHexadecimal() {
    window.location.href = "hexadecimal";
}

function redirectOctal() {
    window.location.href = "octal";
}

/* Redirecciones */


/* Recibe datos del formulario y los envía al servidor */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('conversionForm');
    const inputType = document.getElementById('inputType');
    const inputValue = document.getElementById('inputValue');
    //const resultContainer = document.getElementById('resultContainer');
    const resultNumber = document.getElementById('result-screen');
    const convertButton = document.getElementById('convertButton');
    const converterType = document.getElementById('convertidorTipo');

    convertButton.addEventListener('click', function (event) {
        event.preventDefault();

        const selectedValue = inputType.value;
        const value = inputValue.value;

        if (selectedValue === "") {
            alert('Por favor, selecciona un tipo de conversión');
            return;
        }

        if (value === "") {
            alert('Por favor, ingresa un valor');
            return;
        }

        if (selectedValue === "decimal") {
            if (isNaN(value)) {
                alert('El valor ingresado no es un número');
                return;
            }
        } else if (selectedValue === "binario") {
            if (!/^[0-1]+$/.test(value)) {
                alert('El valor ingresado no es un número binario');
                return;
            }
        } else if (selectedValue === "octal") {
            if (!/^[0-7]+$/.test(value)) {
                alert('El valor ingresado no es un número octal');
                return;
            }
        } else if (selectedValue === "hexadecimal") {
            if (!/^[0-9A-Fa-f]+$/.test(value)) {
                alert('El valor ingresado no es un número hexadecimal');
                return;
            }
        }

            // GET a bases_to_binary recibe un httpresponse

            //Verifica el nombre del Convertidor
            if (converterType.innerText === "Convertir a Binario") {
                
                fetch(`/Conversor/bases_to_binary/${value}/${selectedValue}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    return response.json();
                })
                .then(data => {

                    // Separa cada 4 las cifras binarias de derecha a izquierda
                    let binary = data.Binario;
                    let result = '';
                    for (let i = binary.length - 1; i >= 0; i -= 4) {
                        result = binary.substring(i - 3, i + 1) + ' ' + result;
                    }
                    result = result.trim();
                    data.Binario = result;

                    // si hacen faltas 0 a la izquierda para completar un grupo de 4
                    if (binary.length % 4 !== 0) {
                        let zeros = '0'.repeat(4 - (binary.length % 4));
                        data.Binario = zeros + data.Binario;
                    }

                    resultNumber.innerHTML = data.Binario;
                })
                .catch(error => {
                    alert('Error en la solicitud');
                });

            }

            //Verifica el nombre del Convertidor
            if (converterType.innerText === "Convertir a Decimal") {
                fetch(`/Conversor/bases_to_decimal/${value}/${selectedValue}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    return response.json();
                })
                .then(data => {

                    console.log(data.Decimal);
                    resultNumber.innerHTML = data.Decimal;

                })
                .catch(error => {
                    alert('Error en la solicitud');
                });
            }

            //Verifica el nombre del Convertidor
            if (converterType.innerText === "Convertir a Hexadecimal") {
                fetch(`/Conversor/bases_to_hexadecimal/${value}/${selectedValue}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    return response.json();
                })
                .then(data => {
                    
                    // Separa cada 6 las cifras hexadecimales de derecha a izquierda
                    let hexadecimal = data.Hexadecimal;
                    let result = '';
                    for (let i = hexadecimal.length - 1; i >= 0; i -= 6) {
                        result = hexadecimal.substring(i - 5, i + 1) + ' ' + result;
                    }
                    result = result.trim();
                    data.Hexadecimal = result;

                    // si hacen faltas 0 a la izquierda para completar un grupo de 6
                    if (hexadecimal.length % 6 !== 0) {
                        let zeros = '0'.repeat(6 - (hexadecimal.length % 6));
                        data.Hexadecimal = zeros + data.Hexadecimal;
                    }

                    console.log(data.Hexadecimal);

                    resultNumber.innerHTML = data.Hexadecimal;

                })
                .catch(error => {
                    alert('Error en la solicitud');
                });
            }

            //Verifica el nombre del Convertidor
            if (converterType.innerText === "Convertir a Octal") {
                fetch(`/Conversor/bases_to_octal/${value}/${selectedValue}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    return response.json();
                })
                .then(data => {
                    
                    // Separa cada 3 las cifras hexadecimales de derecha a izquierda
                    let octal = data.Octal;
                    let result = '';
                    for (let i = octal.length - 1; i >= 0; i -= 3) {
                        result = octal.substring(i - 2, i + 1) + ' ' + result;
                    }
                    result = result.trim();
                    data.Octal = result;

                    // si hacen faltas 0 a la izquierda para completar un grupo de 3
                    if (octal.length % 3 !== 0) {
                        let zeros = '0'.repeat(3 - (octal.length % 3));
                        data.Octal = zeros + data.Octal;
                    }

                    console.log(data.Octal);

                    resultNumber.innerHTML = data.Octal;

                })
                .catch(error => {
                    alert('Error en la solicitud');
                });
            }
    });
});

/* Recibe datos del formulario y los envía al servidor */
        

/* Animaciones con GSAP */

document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los botones con la clase .btn-primary
    const buttons = document.querySelectorAll('.btn-primary');
    const conversionMenu = document.querySelector('.conversion-menu');

    // Añade el evento de mouseenter (cuando el mouse entra) a cada botón
    buttons.forEach(button => {
        gsap.set(button, { scale: 1, opacity: 1 }); // Establece la escala inicial y la opacidad

        // Animación de palpitación y fade
        const pulseAnimation = gsap.to(button, {
            scale: 1.075,
            opacity: 0.9,
            duration: 0.4,
            ease: 'power2.out',
            paused: true,
            yoyo: true, // Hace que la animación vuelva al estado inicial
            repeat: -1 // Repite indefinidamente
        });

        button.addEventListener('mouseenter', () => {
            pulseAnimation.play();
        });

         // Añade el evento de mouseleave (cuando el mouse sale)
         button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.inOut', // Suaviza la transición al revertir la animación
                onComplete: () => pulseAnimation.pause(0) // Detiene la animación y vuelve al principio
            });
        });

        button.addEventListener('click', () => {
                // Animación de desplazamiento hacia abajo con fadeout
                gsap.to(button, { y: '-=25', opacity: 0, duration: 0.1, ease: 'power2.out'
            });
        });

        // Añade el evento de progreso de la animación
        pulseAnimation.eventCallback("onUpdate", () => {
            if (!button.matches(':hover')) {
                pulseAnimation.pause();
            }
        });
    });
});



//Animación de la barra de navegación
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector('.navbar-nav .dropdown');

    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    gsap.set(dropdownMenu, { opacity: 0, y: -10 });

    let isDropdownVisible = false;

    dropdown.addEventListener('mouseenter', function () {
        if (!isDropdownVisible) {
            $(dropdown).dropdown('toggle');
            gsap.to(dropdownMenu, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
            isDropdownVisible = true;
        }
    });

    dropdown.addEventListener('mouseleave', function (event) {
        if (isDropdownVisible && !dropdown.contains(event.relatedTarget)) {
            $(dropdown).dropdown('toggle');
            gsap.to(dropdownMenu, { opacity: 0, y: -10, duration: 0.3, ease: 'power2.out' });
            isDropdownVisible = false;
        }
    });
});

//Animación de los campos de conversión

document.addEventListener("DOMContentLoaded", function () {
    const inputTypeSelect = document.getElementById('inputType');
    const inputValueContainer = document.getElementById('inputValueContainer');
    const convertButton = document.getElementById('convertButton');

    // Asegurémonos de que los elementos estén inicialmente ocultos
    gsap.set([inputValueContainer, convertButton], { opacity: 0 });

    inputTypeSelect.addEventListener('change', function () {
        // Obtén el valor seleccionado
        const selectedValue = inputTypeSelect.value;

        // Detenemos cualquier animación actual
        gsap.killTweensOf([inputValueContainer, convertButton]);

        // Verifica si se seleccionó un valor
        if (selectedValue !== "") {
            // Animación de fade in
            gsap.to([inputValueContainer, convertButton], { opacity: 1, duration: 0.5, ease: 'power2.out' });

            // Cambia el estilo del cursor a 'pointer' cuando el botón está visible
            convertButton.style.cursor = 'pointer !important';
        } else {
            // Si no hay opción seleccionada, ocultar los elementos
            gsap.to([inputValueContainer, convertButton], { opacity: 0, duration: 0.5, ease: 'power2.out' });

            // Cambia el estilo del cursor a 'initial' cuando el botón está oculto
            convertButton.style.cursor = 'initial !important';
        }
    });

    // Animación de hover del botón de convertir
    convertButton.addEventListener('mouseover', function () {
        // Verifica si el botón está visible antes de aplicar la animación
        if (convertButton.style.opacity === '1') {
            gsap.to(convertButton, { scale: 1.1, duration: 0.2 });
        }
    });

    convertButton.addEventListener('mouseout', function () {
        // Verifica si el botón está visible antes de aplicar la animación
        if (convertButton.style.opacity === '1') {
            gsap.to(convertButton, { scale: 1, duration: 0.2 });
        }
    });
});
/* Animaciones con GSAP */