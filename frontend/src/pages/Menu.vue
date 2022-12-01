<template>
    <div class="menu-section">
        <div class="heading">
            <span>menu</span>
            <h3>our special dishes</h3>
        </div>

        <div class="row">
            <div class="col-sm-4 col-12 filter-box">
                <div class="row search-box">
                    <input type="text" class="search-input" v-model="foodObj.name" placeholder="Search.." />
                </div>
            </div>

            <div class="col-sm-8">
                <div class="row">
                    <div class="menu-tabs">
                        <input type="button" id="allFilterFoodBtn" name="allFilterFoodBtn" value="all"
                            class="menu-tab-item" @click="filterFoodBtn($event)" />
                        <input type="button" id="tacoFilterFoodBtn" name="tacoFilterFoodBtn" class="menu-tab-item"
                            value="taco" @click="filterFoodBtn($event)" />
                        <input type="button" id="burritoFilterFoodBtn" name="burritoFilterFoodBtn" class="menu-tab-item"
                            value="burrito" @click="filterFoodBtn($event)" />
                        <input type="button" id="nachosFilterFoodBtn" name="nachosFilterFoodBtn" class="menu-tab-item"
                            value="nachos" @click="filterFoodBtn($event)" />
                        <input type="button" id="sidesFilterFoodBtn" name="sidesFilterFoodBtn" class="menu-tab-item"
                            value="sides" @click="filterFoodBtn($event)" />
                        <input type="button" id="dessertFilterFoodBtn" name="dessertFilterFoodBtn" class="menu-tab-item"
                            value="dessert" @click="filterFoodBtn($event)" />
                        <input type="button" id="drinkFilterFoodBtn" name="drinkFilterFoodBtn" class="menu-tab-item"
                            value="drink" @click="filterFoodBtn($event)" />
                    </div>
                </div>



            </div>
        </div>
        <div class="row box-container">
            <div v-for="(f, index) in currentPageItems" :key="index">
                <div class="box">
                    <div class="image">
                        <img :src="require(`../assets/images/${f.food_src}`)" alt="" />
                    </div>
                    <div class="content">
                        <h3>{{ f.food_name }}</h3>
                        <h4>{{ f.food_status }}</h4>
                        <div class="stars">
                            <div v-for="s in Math.floor(parseFloat(f.food_star))" :key="s" class="d-inline">
                                <i class="fas fa-star"></i>
                            </div>
                            <div v-if="parseFloat(f.food_star) - Math.floor(parseFloat(f.food_star)) == 0.5"
                                class="d-inline">
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <span> ({{ f.food_vote }}) </span>
                        </div>
                        <div class="desc">
                            <p>{{ f.food_desc }}</p>
                        </div>
                        <div class="price">
                            ${{ parseFloat(f.food_price) - parseFloat(f.food_discount) }}
                            <span v-if="parseFloat(f.food_discount) != 0.00">${{ parseFloat(f.food_price)
                            }}</span>
                        </div>
                        <button class="btn" @click="addItem(index)">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="calculatePages > 1" class="action-row">

            <div v-for="(p, i) in calculatePages" :key="i" class="d-inline">
                <span v-if="i == pageNum" class="highlight" @click="set(i)">{{ i + 1 }}</span>
                <span v-else @click="set(i)">{{ i + 1 }}</span>
            </div>
        </div>

        <QuickView v-if="showQuickView" :food="sendId">
            <button class="btn" @click="closeView">X</button>
        </QuickView>
    </div>
</template>

<script>
import QuickView from "@/components/QuickView.vue";
import { mapState } from "vuex";
export default {
    name: "Menu",
    data() {
        return {
            foodObj: { name: "", category: "", status: [], price: "", type: "" },

            showQuickView: false,
            showDropDown: false,
            sendId: null,

            perPage: 8,
            pageNum: 0,
            previousCategoryClicked: "",
        };
    },

    computed: {
        ...mapState(["allFoods"]),
        //show food by filter
        filterFoods: function () {
            return this.allFoods.filter((f) => f.food_name.toLowerCase().match(this.foodObj.name.toLowerCase()) &&
                (f.food_category.match(this.foodObj.category) || this.foodObj.category == "all" || this.foodObj.category == "") &&
                f.food_type.toLowerCase().match(this.foodObj.type.toLowerCase()));
        },
        //item per page
        currentPageItems: function () {
            return this.filterFoods.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
        },
        //pagination
        calculatePages: function () {
            if (this.filterFoods.length % this.perPage != 0) {
                return Math.floor((this.filterFoods.length) / this.perPage) + 1;
            }
            else {
                return this.filterFoods.length / this.perPage;
            }
        }
    },
    methods: {
        //declare pagination
        set(val) {
            this.pageNum = val;
        },
        next() {
            this.pageNum++;
        },
        previous() {
            this.pageNum--;
        },

        //fire onchange action
        filterFoodBtn: function (e) {
            this.pageNum = 0;
            if (this.foodObj.category != e.target.value && this.previousCategoryClicked != "") {
                this.previousCategoryClicked.target.style.background = "#27ae60";
            }
            this.foodObj.category = e.target.value;
            this.previousCategoryClicked = e;
            e.target.style.background = "#057835fa";
        },

        //send id to cart (for rendering in cart component)
        addItem: function (index) {
            this.sendId = parseInt(this.currentPageItems[index].food_id);
            this.showQuickView = !this.showQuickView;
        },

        // close quick view
        closeView: function () {
            this.showQuickView = !this.showQuickView;
        },
    },
    components: { QuickView }
};
</script>

<style scoped>
input[type="button"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

hr {
    border-top: 3px solid #057835fa;
    width: 100%;
}

.search-box {
    width: 100%;
    justify-content: center;
    position: relative;
    display: flex;
}

.search-input {
    margin: 0;
    border-radius: .5rem;
    width: 100%;
    height: 40px;
    font-size: 18px;
    color: white;
    background: #27ae60;
    padding: 0 10px;
}

::placeholder {
    color: white;
}

.menu-section {
    padding: 2rem 9%;
}

.menu-section .menu-tabs {
    margin-bottom: 30px;
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    background-color: #27ae60;
    border-radius: .5rem;
}

.menu-section .menu-tabs .menu-tab-item {
    display: inline-block;
    cursor: pointer;
    padding: 5px 30px;
    border-radius: .5rem;
    font-size: 20px;
    color: whitesmoke;
    font-weight: 500;
    text-transform: capitalize;
    transition: all 0.3s ease;
    margin: 0;
}

.menu-section .menu-tabs .menu-tab-item:hover {
    background-color: #f38609 !important;

}

.menu-section .menu-tabs .menu-tab-item p {
    padding: none;
    margin: none;
}

.menu-section .box-container {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin: 0 auto;
}

.menu-section .box-container .box {
    border-radius: 0.5rem;
    background: #f7f7f7;
    padding: 2rem;
    text-align: center;
    width: 300px;
}

.menu-section .box-container .box .image {
    margin: 1rem 0;
}

.menu-section .box-container .box .image img {
    height: 15rem;
}

.menu-section .box-container .box .content h3 {
    font-size: 2rem;
    color: #130f40;
}

.menu-section .box-container .box .content .stars {
    padding: 1rem 0;
    font-size: 1.7rem;
}

.menu-section .box-container .box .content .stars i {
    color: gold;
}

.menu-section .box-container .box .content .stars span {
    color: #666;
}

.menu-section .box-container .box .content .desc p {
    font-size: 14px;
    margin: 0;
}

.menu-section .box-container .box .content .price {
    font-size: 2rem;
    color: #130f40;
}

.menu-section .box-container .box .content .price span {
    font-size: 1.5rem;
    color: #666;
    text-decoration: line-through;
}

.menu-section .action-row {
    padding-top: 30px;
    width: 100%;
    text-align: center;
    font-size: 20px;
}

.menu-section .action-row .action-btn {
    background-color: #27ae60;
    padding: 3px;
    border: 2px solid #27ae60;
    border-radius: 30%;
    color: white;
}

.menu-section .action-row span {
    margin-right: 15px;
}

.menu-section .action-row span:hover {
    cursor: pointer;
}

.menu-section .action-row span.highlight {
    color: #f38609;
}

.menu-section .action-row span:first-of-type {
    margin-left: 15px;
}

.filter-drop-down {
    display: none;
}

@media (min-width: 576px) {

    .filter-heading,
    .filter-section {
        display: block !important;
    }
}

@media (max-width: 768px) {
    .menu-section .box-container {

        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        gap: 1rem;
    }

    .menu-section .box-container .box .content h3 {
        height: 4rem;
    }
}

@media (max-width: 576px) {

    .search-box,
    .filter-heading,
    .filter-section {
        width: auto;
    }

    .filter-option {
        width: 100%;
    }

    .filter-drop-down {
        display: block;
        background-color: #27ae60;
        color: white;
        font-weight: 400;
        margin-bottom: 15px;
        margin-top: 15px;

    }

    .filter-drop-down p {
        font-size: 20px;
        padding: 5px 0px;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    .filter-drop-down p span {
        font-size: 20px;
        padding-right: 10px;
        text-transform: lowercase;
        font-weight: 300;
    }

    .filter-heading,
    .filter-section {
        display: none;
    }

    .menu-tabs .menu-tab-item {
        font-size: 12px !important;
        padding: 5px 20px !important;
    }

    .menu-section .action-row {
        font-size: 16px !important;
    }

    .menu-section .action-row span {
        margin-right: 5px;
    }

    .menu-section .box-container .box .image img {
        height: 10rem;
    }

    .menu-section .box-container .box .desc p,
    .menu-section .box-container .box .content .stars {
        font-size: 10px !important;
    }

    .menu-section .box-container .box .content h3 {
        font-size: 14px !important;
        height: 28px;
    }
}
</style>
