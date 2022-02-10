<template>
    <div class="overlay">
        <div class="modal-container">
            <input type="button" value="X" class="close-btn" @click.stop="reject()">
            <h5>Confirm</h5>
            <slot></slot>
            <div class="btn-container">
                <input 
                    type="button" 
                    value="Yes" 
                    class="btn"
                    @click.stop="confirm()"
                >
                <input 
                    type="button" 
                    value="No" 
                    class="btn"
                    @click.stop="reject()"
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        reject() {
            this.$emit('modal-reject');
        },
        confirm() {
            this.$emit('modal-confirm');
        }
    }
}
</script>

<style lang="scss" scoped>
    .overlay {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal-container {
        width: 500px;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);
        border-radius: 2px;
        padding: 10px;
    }
    .close-btn {
        background: transparent;
        border: 4px double #009688;
        border-radius: 10px 0px 10px 0px;
        cursor: pointer;
        color: #009688;
        align-self: flex-end;
    }
    .btn-container {
        width: 200px;
        margin: 20px 0;
        display: flex;
        justify-content: space-around;
    }
</style>