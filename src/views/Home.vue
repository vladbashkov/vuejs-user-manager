<template>
  <div class="main">
      <div 
        @click="pushToRouter()"
        class="add-btn"
      >
          <router-link
            :to="link.url ? link.url : ``"
            :key="link.url"
          >
              <div 
                class="btn add-btn"
              >
              Add new User
              </div>
          </router-link>
      </div>
      <section class="section">
        <div 
          class="user"
          v-for="(user, index) in items"
          :key="index"
        >
          
          <user-card 
            :userData="user"
          />
          <div class="btn-container">
            <input 
              type="button" 
              value="Read"
              class="btn"
              @click="pushToRouterInfo(user.id)"
            >
            <input 
              type="button" 
              value="Update"
              class="btn"
              @click="pushToRouter(user.userID)"
            >
            <input
              type="button" 
              value="Delete"
              class="btn" 
              @click.stop="modal(user.id)"
            >
          </div>
        </div>
      </section>
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'waves-effect teal lighten-1'"
      >
      </paginate>
      <modal
        v-if="isDeleting"
        @modal-reject="modal()"
        @modal-confirm="confirmDel()"
      >
        <h6>Are you sure you want to delete this user?</h6>
      </modal>
  </div>
</template>

<script>
// @ is an alias to /src
import paginationMixin from '../mixins/Pagination.mixin'
import UserCard from '../components/User-card.vue';
import Modal from "../components/Modal.vue";

export default {
  name: 'Home',
  components: {
    UserCard, Modal
  },
  mixins: [paginationMixin],
  data() {
    return {
      usersCollection: [],
      link: { url: '/' },
      uniqueID: Date.now(),
      isDeleting: false,
      delItem: ``
    }
  },
  async created() {
    let response = await fetch(this.$options.URLmixin);
    if(response.ok) {
      let json = await response.json();
      this.usersCollection = json;
      this.setupPagination(this.usersCollection);
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  },
  methods: {
    pushToRouter(id=this.uniqueID) {
        this.$router.push({ path: `/${id}`});
    },
    pushToRouterInfo(id) {
        this.$router.push({ path: `/info/${id}`})
    },
    modal(id) {
      this.delItem = id;
      this.isDeleting = !this.isDeleting;
    },
    async confirmDel() {
      try {
        let request = await fetch(`${this.$options.URLmixin}/${this.delItem}`, {
          method: 'DELETE',
          headers: this.$options.headers
        });
        let response = await request.json();
        this.spliceItem(this.delItem);
        this.modal();
        return response;
      } catch (error) {
        alert(error);
      }
    },
    spliceItem(id) {
      this.items.forEach((el, index) => {
        if(el.id == id) {
          this.items.splice(index, 1);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    padding: 50px;
  }
  .section {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 0 auto;
  }
  .user {
    border: 1px solid #000;
    padding: 20px;
    border-radius: 5px;
    margin: 20px auto;
    width: 40%;
  }
  .add-btn {
    width: 40%;
    margin: 0 auto;
  }
  .btn-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
  }
</style>