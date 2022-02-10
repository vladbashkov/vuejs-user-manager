<template>
    <div class="current-card">
        <h3> Name: {{ userData.name }} </h3>
        <h3> Surname: {{ userData.surname }} </h3>
    </div>
</template>

<script>
export default {
    name: 'UserCard',
    props: {
        userData: {
            type: Object,
        }
    }
}
</script>

<style lang="scss" scoped>
    .current-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    h3 {
        text-align: left;
        margin: 10px 0 20px 0;
        border-bottom: 1px solid #9e9e9e;
    }
</style>