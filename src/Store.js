import { configureStore, createSlice } from "@reduxjs/toolkit";
import Orders from "./Orders";

    const productSlice = createSlice ({
        name: 'products',
        initialState: {
            Veg : [
                { id: 1, name: 'Paneer Butter Masala', price: 200, image: '/Pannerbuttermasala.jpeg' },
                { id: 2, name: 'Paneer Tikka', price: 150, image: '/Pannertikka.jpeg' },
                { id: 3, name: 'Veg Biryani', price: 180, image: '/Vegbiryani.jpeg' },
                { id: 4, name: 'Veg Pulao', price: 160, image: '/Vegpulao.jpeg' },
                { id: 5, name: 'Veg Manchurian', price: 140, image: '/Vegmanchurian.jpeg' },
                { id: 6, name: 'Veg Fried Rice', price: 120, image: '/Vegfriedrice.jpeg' },
                { id: 7, name: 'Mixed Vegetable Curry', price: 110, image: '/Mixedvegetablecurry.jpeg' },
                { id: 8, name: 'Tindora Curry (Ivy Gourd Curry)', price: 130, image: '/Tindoracurry.jpeg' },
                { id: 9, name: 'Lauki (Bottle Gourd) Curry', price: 90, image: 'Lauki.jpeg' },
                { id: 10, name: 'Kadhi Pakora', price: 80, image: '/Kadhipakora.jpeg' },
                { id: 11, name: 'Vegetable Korma', price: 70, image: '/VegetableKorma.jpeg' },
            ],
            NonVeg : [
                { id: 1, name: 'Chicken Curry', price: 250, image: '/Chickenvinodolaa.jpeg' },
                { id: 2, name: 'Chicken Tikka', price: 220, image: '/Chickentikka.jpeg' },
                { id: 3, name: 'Chicken Biryani', price: 280, image: '/Chickenbiryani.jpeg' },    
                { id: 4, name: 'Mutton Biryani', price: 260, image: '/Muttonbiryani.jpeg' },
                { id: 5, name: 'Chicken Manchurian', price: 240, image: '/Chickentandoori.jpeg' },
                { id: 6, name: 'Chicken Fried Rice', price: 220, image: '/Chickenfriedrice.jpeg' },
                { id: 7, name: 'Chicken Shahi', price: 210, image: '/Chickenshahi.jpeg' },
                { id: 8, name: 'Chicken Malai', price: 230, image: '/Chickenmalai.jpeg' },
                { id: 9, name: 'Chicken Changezi', price: 200, image: '/Chickenchangezi.jpeg' },
                { id: 10, name: 'Mutton Boneless', price: 190, image: '/Muttonboneless.jpeg' },
                { id: 11, name: 'Mutton Curry', price: 180, image: '/Muttoncurry.jpeg' },
                { id: 12, name: 'Mutton Nalli', price: 170, image: '/Muttonnalli.jpeg' },
            ],
            Deserts : [
                { id: 1, name: 'Gulab Jamun', price: 50, image: '/Gulabjamun.jpg' },
                { id: 2, name: 'Ras Malai', price: 60, image: '/Rasmalai.jpg' },
                { id: 3, name: 'Kheer', price: 70, image: '/Kheer.jpg' },
                { id: 4, name: 'Ice Cream', price: 80, image: '/Icecream.jpg' },
                { id: 5, name: 'Brownie', price: 90, image: '/Brownie.jpg' },
                { id: 6, name: 'Fruit Salad', price: 100, image: '/Fruitsalad.jpg' },
            ],
            Beverages : [
                { id: 1, name: 'Coke', price: 30, image: '/Coke.jpg' },
                { id: 2, name: 'Pepsi', price: 30, image: '/Pepsi.jpg' },
                { id: 3, name: 'Sprite', price: 30, image: '/Sprite.jpg' },
                { id: 4, name: 'Fanta', price: 30, image: '/Fanta.jpg' },
                { id: 5, name: 'Thums Up', price: 30, image: '/Thumsup.jpg' },
                { id: 6, name: 'Mountain Dew', price: 30, image: '/Mountaindew.jpg' },
            ],
            Milkshakes : [
                { id: 1, name: 'Chocolate Milkshake', price: 120, image: '/ChocolateMilkshake.jpg' },
                { id: 2, name: 'Vanilla Milkshake', price: 110, image: '/VanillaMilkshake.jpg' },
                { id: 3, name: 'Strawberry Milkshake', price: 130, image: '/StrawberryMilkshake.jpg' },
                { id: 4, name: 'Mango Milkshake', price: 140, image: '/MangoMilkshake.jpg' },
                { id: 5, name: 'Banana Milkshake', price: 150, image: '/BananaMilkshake.jpg' },
                { id: 6, name: 'Oreo Milkshake', price: 160, image: '/OreoMilkshake.jpg' },
            ],
            Thickshakes : [
                { id: 1, name: 'Chocolate Thickshake', price: 200, image: '/ChocolateThickshake.jpg' },
                { id: 2, name: 'Vanilla Thickshake', price: 190, image: '/VanillaThickshake.jpg' },
                { id: 3, name: 'Strawberry Thickshake', price: 210, image: '/StrawberryThickshake.jpg' },
                { id: 4, name: 'Mango Thickshake', price: 220, image: '/MangoThickshake.jpg' },
                { id: 5, name: 'Banana Thickshake', price: 230, image: '/BananaThickshake.jpg' },
                { id: 6, name: 'Oreo Thickshake', price: 240, image: '/OreoThickshake.jpg' },
            ],
    },
    reducers:{}
    });

    const cartSlice= createSlice({
        name: 'cart',
        initialState: [],
        reducers: {
        
            addtocart: (state, inputitem) => {
                let product=state.find(product=>product.name===inputitem.payload.name);
                if (product) {
                    product.quantity +=1;
                } 
                else {
                    state.push({ ...inputitem.payload, quantity: 1 });
                }
            },
           

        // Remove Product
        removeProduct: (state, inputitem) => {
            const index = state.findIndex(product => product.name === inputitem.payload.name);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },

        // Increment Product Quantity
        incrementQuantity: (state, inputitem) => {
            let product = state.find(product => product.name === inputitem.payload.name);
            if (product) {
                product.quantity += 1;
            }
        },

        clearCart:()=>[],

        // Decrement Product Quantity
        decrementQuantity: (state, inputitem) => {
            let product = state.find(product => product.name === inputitem.payload.name);
            if (product && product.quantity > 0) {
                product.quantity -= 1;
                if (product.quantity === 0) {
                    const index = state.findIndex(item => item.name === inputitem.payload.name);
                    if (index !== -1) {
                        state.splice(index, 1);
                    }
                }
            }
        }

        },
    });
    export let { addtocart ,incrementQuantity,decrementQuantity,removeProduct,clearCart} = cartSlice.actions;

    const Orderslice= createSlice({
        name: 'orders',
        initialState: [],
        reducers: {
            OrderDetails: (state, action) => {
                const OrderDetails= action.payload;
                state.push(OrderDetails);
            },
        },
    });


    export const { OrderDetails } = Orderslice.actions;
    const Store = configureStore({
        reducer: {
            products: productSlice.reducer,
            cart: cartSlice.reducer,
            Orders:Orderslice.reducer,
        },
    });
    export default Store;
