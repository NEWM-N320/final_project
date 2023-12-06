<!-- HomeSessionsView.vue -->
<template>
  <div style="width: 850px; margin: 0 auto;">
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
        <p class="time"> {{ session.sDay }} at {{ TwelveHourFormat(session.sTime) }}</p>
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

<!-- other script -->
<script>
export default {
  data() {

    return {

    } 
    
  },
  methods: {
    //twelve hour func 
    //taking the military time as a param
  TwelveHourFormat(militaryTime) {
  
    // convert the military time into a string since it is a number
    if (typeof militaryTime === 'number') {
      militaryTime = militaryTime.toString();
    }

    //ensure that even single digit times changes. using padStart() to do this
    militaryTime = militaryTime.padStart(2, '0');

    //create a new Date() func, convert the military time
    const date = new Date(`2000-01-01T${militaryTime}:00`);

    //set the new var standard time read as a string
    const standardTime = date.toLocaleTimeString('en-US', {

      //hour and minute is numeric
      hour: 'numeric',
      minute: 'numeric',

      //it is in 12 hour format
      hour12: true,
    });


    //return the new time, will have am or pm depending what time it is
    return standardTime;
  }
}
}
</script>

<style scoped>
/* h1 that is intro */
.intro {
  color: #000;
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
  border-radius: 20px;
  margin-bottom: 30px;
  width: 900px;
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
