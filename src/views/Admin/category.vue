<template>
  <b-container class="py-5">
    <b-row>
      <b-button v-b-modal.modal-center class="add-cat py-2 w-50 mx-auto mb-3">
        Add New Category
      </b-button>
      <b-modal id="modal-center" centered title="Add New Product">
        <b-form @submit.prevent="AddCat" class="py-2">
          <b-form-input
            id="name"
            v-model="cat.name"
            type="text"
            placeholder="Name Category"
            class="mb-3 bg-white"
            required
          ></b-form-input>
          <b-form-file
            id="image"
            type="file"
            accept=".jpg, .png, .jpge, .webp"
            class="mb-3 bg-white"
            required
            @change="previewImage"
          ></b-form-file>
          <b-button type="submit" class="add-cat py-2">Add</b-button>
        </b-form>
      </b-modal>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col md="8">
        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cat, index) in Category" :key="cat.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ cat.name }}</td>
              <td>
                <b-button
                  v-b-modal.modal-edit
                  variant="success"
                  class="me-2 p-2"
                  @click="GetOneCategory(cat.id, cat.name)"
                >
                  Edit
                </b-button>
                <button class="btn btn-danger p-2" @click="DeleteCat(cat.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-modal id="modal-edit" centered title="Update Category">
      <b-form @submit.prevent="EditCategory()" class="py-2">
        <b-form-input
          id="name"
          type="text"
          placeholder="Name Category"
          class="mb-3 bg-white"
          v-model="DataCatID.name"
          required
        ></b-form-input>
        <b-button type="submit" class="add-cat py-2">Update</b-button>
      </b-form>
    </b-modal>
  </b-container>
</template>
<script>
import {
  collection,
  addDoc,
  getFirestore,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const db = getFirestore();
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "category",
  data() {
    return {
      cat: {
        name: "",
        image: "",
      },
      Category: [],
      DataCatID: {
        name: "",
        id: "",
      },
      uploadValue: 0,
      img: null,
      imageData: null,
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    AddCat() {
      addDoc(
        collection(db, "categories"),
        {
          name: this.cat.name,
          image: this.img,
          amount: 0,
        },
        location.reload()
      );
    },
    GetOneCategory(id, name) {
      this.DataCatID.name = name;
      this.DataCatID.id = id;
    },
    async EditCategory() {
      const washingtonRef = doc(db, "categories", this.DataCatID.id);
      await updateDoc(washingtonRef, {
        name: this.DataCatID.name,
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    AddImg() {
      // Upload Image here
      this.img = null;
      const storage = getStorage();
      // Create a child reference
      const imagesRef = ref(storage, "images");
      // imagesRef now points to 'images'
      // Child references can also take paths delimited by '/'
      const storageRef = ref(imagesRef, `${this.imageData.name}`);
      const uploadTask = uploadBytesResumable(storageRef, this.imageData);
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            this.img = url;
            // console.log(this.img);
          });
        }
      );
    },
    async DeleteCat(id) {
      await deleteDoc(doc(db, "categories", id))
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCategory() {
      const q = query(collection(db, "categories")),
        querySnapshot = await getDocs(q);
      this.Category = [];
      querySnapshot.forEach((doc) => {
        this.Category.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img = null;
      this.imageData = event.target.files[0];
      this.AddImg();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";
.add-cat {
  background: $color-global;
  &:hover {
    background: $color-global;
  }
}
</style>
