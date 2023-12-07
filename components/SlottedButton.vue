<!-- slot btn -->
<template>
        <button class="slotted-btn">
                <slot></slot>
        </button>
</template>


<!-- styling for btn -->
<style scoped>
.slotted-btn {
        height: 40px;
        width: 100px;
        background-color: #98a4a8;

        border: none;
        font-size: 14px;
        color: #fff;
        border-radius: 20px;
}

.slotted-btn:hover {
        cursor: pointer;
        background-color: #62777e;

}
</style>