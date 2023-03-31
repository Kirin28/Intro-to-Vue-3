const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: false,
        }
    },
    methods: {
        updateCart(id) {
            //this.cart += 1;
            this.cart.push(id)
        },

        removeById(id) {
            const index = this.cart.indexOf(id)
            if (index > -1 && this.cart.length > 0) {
                this.cart.splice(index, 1)
            }
        }
    }
   
})


//@mouseover="updateImage(variant.image)"
