<template>
  <b-container fluid class="pt-5">
    <b-row class="px-xl-5">
      <b-col>
        <b-breadcrumb :items="crumbs" class="bg-white py-2 ps-3"></b-breadcrumb>
      </b-col>
    </b-row>
    <b-row class="px-xl-5 pb-3" id="Prod-sec">
      <b-col lg="3" md="4" sm="6" v-for="prod in Products" :key="prod.id">
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
  collection,
  getFirestore,
  query,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
// import router from "@/router";
const db = getFirestore();
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AboutView",
  data() {
    return {
      qte: 1,
      Products: [],
      crumbs: [
        { text: "Home", to: { name: "home" } },
        { text: this.$route.params.typ, active: true },
        { text: this.$route.params.text, active: true },
      ],
    };
  },
  created() {
    this.getProducts(this.$route.params.text, this.$route.params.type);
  },
  methods: {
    async getProducts(text, type) {
      const sousCollectionRef = query(collectionGroup(db, `products`));
      const sousCollectionSnapshot = await getDocs(sousCollectionRef);
      this.Products = [];
      if (type == "Category") {
        sousCollectionSnapshot.forEach((doc) => {
          if (doc.ref.parent.parent.id == text)
            this.Products.push({
              id: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price,
              image: doc.data().image,
            });
        });
        const db = getFirestore(),
          q = query(collection(db, "categories"));
        const querySnapshot = await getDocs(q);
        this.Category = [];
        querySnapshot.forEach((doc) => {
          if (doc.id == text) text = doc.data().name;
        });
      }
      if (type == "Search") {
        sousCollectionSnapshot.forEach((doc) => {
          this.Products.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            image: doc.data().image,
          });
        });
        this.Products = this.Products.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        });
      }
      if (type == "Sex") {
        sousCollectionSnapshot.forEach((doc) => {
          if (
            doc.data().sex == text.toLowerCase() ||
            doc.data().sex == `bold`
          ) {
            this.Products.push({
              id: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price,
              image: doc.data().image,
            });
          }
        });
      }
      this.crumbs = [
        { text: "Home", to: { name: "home" } },
        { text: type, active: true },
        { text: text, active: true },
      ];
    },
    addToCart(product) {
      this.$root.$emit("addToCart", product);
    },
  },
  watch: {
    "$route.params": function (params) {
      this.getProducts(params.text, params.type);
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/main.scss";
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
  .card-body {
    padding: 0;
    .card-title {
      font-weight: bold;
      margin: 0;
      text-transform: capitalize;
    }
  }
}
#Prod-sec {
  margin-top: 20px;
}
.row > * {
  // flex-shrink: 0;
  // width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-top: var(--bs-gutter-y);
}
.btn.btn-none.rounded-0 {
  padding: 8px 13px 8px 13px;
  font-size: 15px;
}
</style>
