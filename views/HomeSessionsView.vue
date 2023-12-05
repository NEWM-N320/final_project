<!-- HomeSessionsView.vue -->
<template>
  <div>
    <h1 class="intro">Conference Session Information</h1>
       <!-- holds filter btn + sess count -->
       <div class="filter-sessCount">
       <!-- filler text - display the num of sessions -->
    <p class="ses-count">Session count here</p>
    <!-- slotted btn to clear filter - for now just btn -->
    <button>Clear Filter</button>
    </div>
    <div v-for="session in sessions" :key="session.id">
    <!-- parent div to hold one entire session -->
    <div class="entire-session">
      <!-- session display info -->
      <!-- holds title and btn   -->
      <div class="sessTitle-btn">
         <h2 class="sess-title">{{ session.title }}</h2>
      <!-- btn to add item to user ses  - fix later-->
      <button>Add Item</button> 
      </div>

      <!-- holds the presenter + time -->
      <div class="pres-time">
         <p class="presenter">Presented by: <span class="span-pres">
        {{ session.presenter }}</span></p>
        <p class="time"> {{ session.sDay }} at {{ session.sTime }}</p>
      </div>
     
      <!-- line break in btwn -->
      <hr>

      <!-- description  -->
      <p class="description">Description: {{ session.desc }}</p>

      <!-- holds the tags -->
      <div class="tagging">
        <!-- tag text -->
        <p class="tag-text">Categories:</p>

        <!-- buttns w all tags -->
        <button v-for="tag in session.tags" :key="tag">{{ tag }}</button>
      </div>
    </div>
    </div>
  
  </div>
</template>

<script setup>
// Import the 'sessions' prop
const { sessions } = defineProps(['sessions']);
</script>

<style scoped>
/* h1 that is intro */
.intro {
  color: orange;
}


/* holder for filter btn and session count */
.filter-sessCount{
display: flex;
align-items: center;
justify-content: space-between;
}

/* entire session styling */
.entire-session {
  border: 1px solid black;
  padding: 10px;
  background-color: antiquewhite;
  margin-bottom: 30px;
  border-radius: 20px;
}

/* session title and btn holder  */
.sessTitle-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* session title */
.sess-title{
  width: 600px;
  color: red;
}

/* presenter text and time */
.pres-time {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* presenter span tag */
.span-pres{
  color: darkblue;
}

/* hr */
hr {
  background-color: black;
  height: 0.45px;
}

/* tags and categories */

</style>
