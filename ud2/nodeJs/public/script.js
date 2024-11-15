/**
 * @file script.js
 * @description Funciones para gestionar el pedido de pizzas en la pizzería, incluyendo agregar y eliminar pizzas,
 * calcular el total y mostrar el resumen del pedido.
 */

document.addEventListener("DOMContentLoaded", function () {

    /**
     * Contenedor del listado de items del pedido.
     * @type {HTMLElement}
     */
    const orderItems = document.getElementById("order-items");

    /**
     * Botón para finalizar el pedido.
     * @type {HTMLElement}
     */
    const finishOrderButton = document.getElementById("finish-order");

    /**
     * Elemento que muestra el precio total del pedido.
     * @type {HTMLElement}
     */
    const totalPriceElement = document.getElementById("total-price");

    /**
     * Elemento que muestra la fecha del pedido.
     * @type {HTMLElement}
     */
    const orderDateElement = document.getElementById("order-date");

    /**
     * Elemento que muestra el resumen del pedido.
     * @type {HTMLElement}
     */
    const orderSummary = document.getElementById("order-summary");

    /**
     * Lista de objetos que representan las pizzas en el pedido.
     * @type {Array<{name: string, price: number}>}
     */
    let order = [];

    /**
     * Total acumulado del precio de las pizzas en el pedido.
     * @type {number}
     */
    let total = 0;

    /**
     * Agrega una pizza al pedido, actualizando el total y el resumen visual.
     * 
     * @param {string} name - Nombre de la pizza a agregar al pedido.
     * @param {number} price - Precio de la pizza a agregar al pedido.
     */
    function addToOrder(name, price) {
        const pizza = { name, price };
        order.push(pizza);
        total += price;

        // Crear un elemento de lista para mostrar la pizza en el pedido
        const li = document.createElement("li");
        li.textContent = `${ name } - ${ price }€`;

        // Crear botón de eliminación para la pizza
        const removeButton = document.createElement("button");
        removeButton.textContent = "Eliminar";
        removeButton.classList.add("remove-item");
        removeButton.addEventListener("click", function () {
            removeFromOrder(pizza, li);  // Llama a la función para eliminar la pizza
        });

        li.appendChild(removeButton);
        orderItems.appendChild(li);

        finishOrderButton.disabled = false; // Habilitar el botón de finalizar pedido
        updateSummary();
    }

    /**
     * Elimina una pizza del pedido, actualizando el total y la visualización.
     * 
     * @param {Object} pizza - Objeto que representa la pizza a eliminar.
     * @param {HTMLElement} listItem - Elemento de la lista HTML que contiene la pizza.
     */
    function removeFromOrder(pizza, listItem) {
        const index = order.indexOf(pizza);
        if (index > -1) {
            order.splice(index, 1);
            total -= pizza.price;
            orderItems.removeChild(listItem); // Eliminar el elemento de la lista visualmente
            updateSummary();
        }

        // Deshabilitar el botón de finalizar si no hay pizzas en el pedido
        if (order.length === 0) {
            finishOrderButton.disabled = true;
        }
    }

    /**
     * Actualiza el resumen del pedido, mostrando el precio total actualizado.
     */
    function updateSummary() {
        totalPriceElement.textContent = total.toFixed(2); // Mostrar el precio total con dos decimales
    }

    /**
     * Agrega los eventos a los botones de "Añadir al pedido" que permiten agregar pizzas.
     */
    const addButtons = document.querySelectorAll(".add-to-order");
    addButtons.forEach(button => {
        button.addEventListener("click", function () {
            const pizzaElement = button.parentElement;
            const name = pizzaElement.getAttribute("data-name");
            const price = parseFloat(pizzaElement.getAttribute("data-price"));

            addToOrder(name, price);
        });
    });

    /**
     * Finaliza el pedido y muestra la fecha y hora actual.
     * Al finalizar, muestra el resumen con la fecha y deshabilita el botón de finalizar.
     */
    finishOrderButton.addEventListener("click", function () {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        orderDateElement.textContent = formattedDate;
        orderSummary.style.display = "block";
        finishOrderButton.disabled = true; // Deshabilitar el botón después de finalizar
    });
});

module.exports = { addToOrder, removeFromOrder, calculateTotal };