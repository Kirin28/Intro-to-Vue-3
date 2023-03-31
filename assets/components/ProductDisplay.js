app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: 
     /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :class="{ 'out-of-stock-img': !inStock}" :src="image">
            <!-- image goes here -->
            <a :href="url">{{url}}</a>
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p>
            <p>{{ sale }}</p>
            <p>Shipping: {{ shipping }}</p>
            <product-details :details="details"></product-details>
           
            <div v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }"> <!--backgroundColor is a CSS property-->
            <!-- {{ variant.color }} this will display the text color-->
          </div>
            <ul>
              <li v-for="size in sizes">{{size}}</li>
            </ul>
            <button 
            class="button" 
            :class="{ disabledButton: !inStock }"
            :disabled="!inStock"
            @click="addToCart">
            Add to Cart
            </button>

            <button class="button2" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock"
            @click="removeFromCart">
            Remove from Cart
            </button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,

      data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            //image: './assets/images/socks_green.jpg',
            selectedVariant: 0,
            description: "",
            url: 'https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3/',
            inventory: 8,
            details: ['50% cotton', '30% wool', '20% polyester'],
            //inStock: true,
            onSale: true,
            variants: [
                {id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 5 },
            ],
            sizes: ['36-40', '40-45', '44-47'],
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },

    /* updateImage(variantImage) {
        this.image = variantImage
    }, */
    updateVariant(index) {
        this.selectedVariant = index;
    },

    removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    
    addReview(review) {
        this.reviews.push(review)
    }
    
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },

        image() {
            return this.variants[this.selectedVariant].image
        },

        inStock() {
            return this.variants[this.selectedVariant].quantity
        },

        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale'
            }
        return ''
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return '€'+ 2.99
        }
    }
})