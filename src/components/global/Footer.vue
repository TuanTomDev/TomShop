<template>
  <footer class="text-white">
    <b-container fluid class="mt-5 pt-5">
      <b-row class="text-start px-xl-5 pb-3">
        <b-col lg="4" md="12" class="mb-5 pe-3 pe-xl-5">
          <h5 class="text-secondary text-uppercase mb-4">Get In Touch</h5>
          <p class="mb-2">
            <b-icon
              icon="pin-map-fill"
              class="me-3"
              variant="warning"
              aria-hidden="true"
            ></b-icon>
            Trieu Khuc, Thanh Tri, Ha Noi, Viet Nam
          </p>
          <p class="mb-2">
            <b-icon
              icon="envelope-fill"
              class="me-3"
              variant="warning"
              aria-hidden="true"
            ></b-icon>
            Tuantomdeveloper@gmail.com
          </p>
          <p class="mb-0">
            <b-icon
              icon="telephone-fill"
              class="me-3"
              variant="warning"
              aria-hidden="true"
            ></b-icon>
            +84 379 151 795
          </p>
        </b-col>
        <b-col lg="8" md="12">
          <b-row>
            <b-col md="4" class="mb-5">
              <h5 class="text-secondary text-uppercase mb-4">Quick Shop</h5>
              <div class="d-flex flex-column justify-content-start">
                <a class="mb-2 text-decoration-none text-light" href="/">
                  <b-icon
                    icon="chevron-right"
                    class="me-1"
                    variant="light"
                    font-scale="1"
                  ></b-icon>
                  Home</a
                >
                <a
                  class="mb-2 text-decoration-none text-light"
                  href="#"
                  v-for="cat in Category"
                  :key="cat.id"
                  @click="filterItems(`Category`, cat.id)"
                >
                  <b-icon
                    icon="chevron-right"
                    class="me-1"
                    variant="light"
                    font-scale="1"
                  ></b-icon>
                  {{ cat.name }}</a
                >
              </div>
            </b-col>
            <b-col md="4" class="mb-5">
              <h5 class="text-secondary text-uppercase mb-4">My Account</h5>
              <div class="d-flex flex-column justify-content-start">
                <a
                  class="mb-2 text-decoration-none text-light"
                  href="/login"
                  v-if="user == null"
                >
                  <b-icon
                    icon="chevron-right"
                    class="me-1"
                    variant="light"
                    font-scale="1"
                  ></b-icon>
                  Sign In</a
                >
                <a
                  class="mb-2 text-decoration-none text-light"
                  href="/register"
                  v-if="user == null"
                >
                  <b-icon
                    icon="chevron-right"
                    class="me-1"
                    variant="light"
                    font-scale="1"
                  ></b-icon>
                  Sign Up</a
                >
                <a
                  class="mb-2 text-decoration-none text-light"
                  href="/login"
                  v-if="user"
                  @click="logout()"
                >
                  <b-icon
                    icon="chevron-right"
                    class="me-1"
                    variant="light"
                    font-scale="1"
                  ></b-icon>
                  Sign Out</a
                >
              </div>
            </b-col>
            <b-col md="4" class="mb-5">
              <h5 class="text-secondary text-uppercase mb-4">Newsletter</h5>
              <p class="mb-3">
                Sign up to receive the latest information from us
              </p>
              <form action="">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control rounded-0"
                    placeholder="Your Email Address"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-warning rounded-0">Sign Up</button>
                  </div>
                </div>
              </form>
              <h6 class="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
              <div class="d-flex">
                <b-button href="#" variant="warning" class="me-2 rounded-0">
                  <b-icon icon="twitter" aria-hidden="true"></b-icon>
                </b-button>
                <b-button href="#" variant="warning" class="me-2 rounded-0">
                  <b-icon icon="facebook" aria-hidden="true"></b-icon>
                </b-button>
                <b-button href="#" variant="warning" class="me-2 rounded-0">
                  <b-icon icon="linkedin" aria-hidden="true"></b-icon>
                </b-button>
                <b-button href="#" variant="warning" class="rounded-0">
                  <b-icon icon="instagram" aria-hidden="true"></b-icon>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row
        class="border-top py-4 px-xl-5"
        style="border-color: rgba(256, 256, 256, 0.1) !important"
      >
        <b-col md="12" lg="6" class="text-lg-start">
          <p>
            &copy; {{ new Date().getFullYear() }} All Right Reserved.Designed by
            <em class="text-warning fw-bold">Tuan Tom Dev</em>
          </p>
        </b-col>
        <b-col md="12" lg="6" class="text-lg-end mt-lg-0 mt-2">
          <img
            class="img-fluid"
            src="../../assets/sass/images/payments.png"
            alt=""
          />
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
/* eslint-disable */
import {
  collection,
  getFirestore,
  query,
  getDocs,
} from "firebase/firestore";
import router from "../../router";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
export default {
  name: "Footer",
  data() {
    return {
      user: null,
      Category: [],
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        this.user = userAuth;
      } else {
        this.user = null;
      }
    });
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const db = getFirestore(),
        q = query(collection(db, "categories"));

      const querySnapshot = await getDocs(q);
      this.Category = [];
      querySnapshot.forEach((doc) => {
        this.Category.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.removeItem("User");
          router.push({
            name: "login",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterItems(type, text) {
      router.push({
        name: "AboutView",
        params: {
          type: type,
          text: text,
        },
      });
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";

footer {
  background: $color-global;
  z-index: 1001;
  position: sticky;
  .b-icon {
    color: $color-global;
  }
}
</style>
