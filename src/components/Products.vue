<template>
  <b-container fluid class="p-auto pt-5">
    <h3
      class="mx-xl-5 mb-4 title text-start fw-bold text-uppercase fs-3 position-relative pe-3"
    >
      <span class="pe-2">Products</span>
    </h3>
    <b-row class="px-xl-5 pb-3" id="Prod-sec">
      <b-col
        lg="3"
        md="4"
        sm="6"
        class="p-4"
        v-for="prod in Products"
        :key="prod.id"
      >
        <b-card class="position-relative mb-3 rounded-0">
          <b-card-img :src="prod.image" alt="Image"></b-card-img>
          <div
            class="card-details h-100 w-100 position-absolute left-0 d-flex justify-content-center align-items-center"
          >
            <b-button
              variant="none rounded-0 me-2"
              @click="
                addToCart({
                  id: prod.id,
                  name: prod.name,
                  price: prod.price,
                  image: prod.image,
                  qte: qte,
                })
              "
            >
              <b-icon icon="cart-fill" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              variant="none rounded-0"
              :to="{
                name: 'Product',
                params: {
                  id: prod.id,
                  name: prod.name,
                  image: prod.image,
                  price: prod.price,
                  desc: prod.description,
                },
              }"
            >
              <b-icon icon="search" aria-hidden="true"></b-icon>
            </b-button>
          </div>
          <b-card-body class="mt-4">
            <b-card-title>{{ prod.name }}</b-card-title>
            <b-card-sub-title class="my-2"
              >{{ parseInt(prod.price).toLocaleString() }} VND</b-card-sub-title
            >
            <b-card-text
              class="d-flex justify-content-center align-items-center"
            >
              <b-icon
                icon="star-fill"
                class="me-1"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
              <b-icon
                icon="star-fill"
                class="me-1"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
              <b-icon
                icon="star-fill"
                class="me-1"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
              <b-icon
                icon="star-fill"
                class="me-1"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
              <b-icon
                icon="star-half"
                variant="warning"
                aria-hidden="true"
              ></b-icon>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  getFirestore,
  query,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
const db = getFirestore();
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Products",
  data() {
    return {
      qte: 1,
      Products: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const sousCollectionRef = query(collectionGroup(db, `products`));
      const sousCollectionSnapshot = await getDocs(sousCollectionRef);
      this.Products = [];
      sousCollectionSnapshot.forEach((doc) => {
        this.Products.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          image: doc.data().image,
        });
      });
    },
    addToCart(product) {
      this.$root.$emit("addToCart", product);
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/main.scss";
.title {
  span {
    background: #f5f5f5;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    top: 50%;
    left: 0;
    border-top: 1px dashed #bec5cb;
    z-index: -1;
  }
}
.card {
  box-shadow: 5px 5px 10px #8080802e;
  height: 450px;
  overflow: hidden;
  .card-details {
    bottom: -100%;
    transition: all 0.8s ease;
    background: rgb(253 253 253 / 74%);
    .btn {
      transition: all 0.5s ease-in-out;
      border: 1px solid $color-global;
      .b-icon {
        color: $color-global;
        font-size: 15px;
      }
      &:hover {
        background: $color-global;
        .b-icon {
          color: yellow;
        }
      }
    }
  }
  &:hover .card-details {
    bottom: 0;
  }
  .card-img {
    transition: all 0.6s ease;
    width: 100%;
    height: 340px;
  }
  &:hover .card-img {
    transform: scale(1.1);
  }
  .p-auto {
    padding: auto !important;
  }
  .card-body {
    padding: 0;
    .card-title {
      font-weight: bold;
      margin: 0;
      text-transform: capitalize;
    }
  }
}
</style>
