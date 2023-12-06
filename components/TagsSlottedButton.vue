<!-- slot btn -->
<template>
        <button class="tags-slot-btn">
                <slot></slot>
        </button>
</template>


<!-- styling for tags btn -->

<style scoped>
.tags-slot-btn{
        height: 40px;
        width: 120px;
        background-color: #aaa583;
        margin-right: 20px;
        border: none;
        font-size: 15px;
        color: #fff;
        border-radius: 20px;
}

.tags-slot-btn:hover{
        cursor: pointer;
        background-color:#888469 ;
}

</style>