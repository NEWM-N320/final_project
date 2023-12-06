<!-- slot btn -->
<template>
        <button class="filter-slot-btn">
                <slot></slot>
        </button>
</template>


<!-- styling for tags btn -->

<style scoped>
.filter-slot-btn{
        height: 40px;
        width: 120px;
        background-color: #d5bcb6;
        border: none;
        font-size: 15px;
        color: #fff;
        border-radius: 20px;
}

.filter-slot-btn:hover {
        cursor: pointer;
        background-color:#ae887b ;
}

</style>