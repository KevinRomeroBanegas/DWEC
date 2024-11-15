const { addToOrder, removeFromOrder, calculateTotal } = require('./public/script');

describe('Funciones de gestión del pedido', () => {
    let order;

    beforeEach(() => {
        // Antes de cada prueba, inicializamos el pedido vacío.
        order = [];
    });

    test('addToOrder agrega una pizza al pedido', () => {
        const pizzaName = 'Margarita';
        const pizzaPrice = 8.5;

        // Llamamos a la función
        const updatedOrder = addToOrder(order, pizzaName, pizzaPrice);

        // Verificamos que el pedido tenga una pizza
        expect(updatedOrder.length).toBe(1);
        expect(updatedOrder[0].name).toBe(pizzaName);
        expect(updatedOrder[0].price).toBe(pizzaPrice);
    });

    test('removeFromOrder elimina una pizza del pedido', () => {
        const pizzaName = 'Margarita';
        const pizzaPrice = 8.5;
        order = addToOrder(order, pizzaName, pizzaPrice);

        // Llamamos a la función para eliminar la pizza
        const updatedOrder = removeFromOrder(order, order[0]);

        // Verificamos que el pedido esté vacío
        expect(updatedOrder.length).toBe(0);
    });

    test('calculateTotal calcula el total correcto del pedido', () => {
        order = addToOrder(order, 'Margarita', 8.5);
        order = addToOrder(order, 'Pepperoni', 10);

        const total = calculateTotal(order);

        expect(total).toBe(18.5); // La suma de 8.5 y 10 debe ser 18.5
    });

    test('calculateTotal retorna 0 si el pedido está vacío', () => {
        const total = calculateTotal(order);

        expect(total).toBe(0); // El total debe ser 0 cuando no hay pizzas
    });
});
