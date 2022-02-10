<template>
    <div class="user-info">
        <h3>Name: {{ userInfo.name }} </h3>
        <h3>Surname: {{ userInfo.surname }} </h3>
        <h3>Date of Birth: {{ userInfo.dateOfBirth }} </h3>
        <h3>Phone: {{ userInfo.phone }} </h3>
        <h3>Email: {{ userInfo.email }} </h3>
        <h3
            v-if="userInfo.created"
        > 
            Created: {{ userInfo.created }} 
        </h3>
        <h3
            v-else-if="userInfo.updated"
        >
            Updated: {{ userInfo.updated }} 
        </h3>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {}
        }
    },
    async created() {
        let id = this.$route.params.id;
        let response = await fetch(`${this.$options.URLmixin}/${id}`);
        if(response.ok) {
            let json = await response.json();
            this.userInfo = json;
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
}
</script>

<style lang="scss" scoped>
    .user-info {
        border: 1px solid #000;
        padding: 20px;
        border-radius: 5px;
        margin: 20px auto;
        width: 50%;
    }
    h3 {
        text-align: left;
        margin: 10px 0 30px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #9e9e9e;
    }
</style>