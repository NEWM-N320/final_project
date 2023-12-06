<!-- HomeSessionsView.vue -->
<template>
  <div style="width: 850px; margin: 0 auto;">
    <p class="intro">Conference Session Information</p>
       <!-- holds filter btn + sess count -->
       <div class="filter-sessCount">
       <!-- filler text - display the num of sessions -->
    <p class="ses-count">Session count here</p>
    <!-- slotted btn to clear filter -->
    <FilterSlottedButton>Clear Filter</FilterSlottedButton>
  
    </div>
    <div v-for="session in sessions" :key="session.id">
    <!-- parent div to hold one entire session -->
    <div class="entire-session">
      <!-- session display info -->
      <!-- holds title and btn   -->
      <div class="sessTitle-btn">
         <h2 class="sess-title">{{ session.title }}</h2>
      <!-- btn to add item to user ses  - fix later-->
     <SlottedButton>Add Item</SlottedButton>
      </div>

      <!-- holds the presenter + time -->
      <div class="pres-time">
         <p class="presenter">Presented by: <span class="span-pres">
        {{ session.presenter }}</span></p>
        <p class="time"> {{ session.sDay }} at {{ TwelveHourFormat(session.sTime, session.sDay) }}</p>
      </div>
     
      <!-- line break in btwn -->
      <hr>

      <!-- description  -->
      <p class="description">{{session.desc}}</p>

      <!-- holds the tags -->
      <div class="tagging">
        <!-- tag text -->
        <p class="tag-text">Categories:</p>

        <!-- buttns w all tags -->
        <TagsSlottedButton v-for="tag in session.tags" :key="tag">{{ tag }}
        </TagsSlottedButton>
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
      //validating session data 
      session: {

      //start id at 0, work way down (int)
      id: 0,

      //start title as empty (string)
      title: '',

      //start desc as empty (string)
      desc: '',

      //start tags empty (arr)
      tags: [],

      //start sTime as if it were 0 o'clock (int)
      sTime: 0,

      //start sDay as empty (string)
      sDay: '',

      //start added as false (boolean)
      added: false,
    }
  }
},
  methods: {
    //twelve hour func 
    TwelveHourFormat(sTime) {
  // validating sTime to make sure it is only military values
  const validTimes = [8, 10, 13, 15, 20];

  //if it the valid times do not include any vals in sTime
  if (!validTimes.includes(sTime)) {

    //console out the err w a msg
    console.error('Invalid Time:', sTime);

    //return an empty time
    return ''; 
  }

 //convert the military time to a string, since its default is an int
  let militaryTime = sTime.toString();

  //making sure single digit times change
  //using padStart to acheive this
  militaryTime = militaryTime.padStart(2, '0');

  //create a new Date() func and convert military time
  const date = new Date(`2000-01-01T${militaryTime}:00`);

//make sure new standard time is also a string
  const standardTime = date.toLocaleTimeString('en-US', {
    // Hour and minute are numeric
    hour: 'numeric',
    minute: 'numeric',

    //making sure we are in 12 hr format
    hour12: true,
  });

  //return the new time, will have AM or PM depending on what time it is
  return standardTime;
}

}
}
</script>

<style scoped>
/* h1 that is intro */
.intro {
  color: #000;
  font-size: 30px;
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
  padding: 20px;
  background-color: #dad5ce;
  border-radius: 20px;
  margin-bottom: 30px;
  width: 900px;
  box-shadow: 5px 10px 18px #47464557;

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
  color: #a06f5f;
}

/* presenter text and time */
.pres-time {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* presenter span tag */
.span-pres{
  font-weight: bold;
  color: #634f5c;
}

.span-pres:hover{
  cursor: pointer;
  color: #362b32 ;
}

/* hr */
hr {
  background-color: #fff;
  height: 1px;
}


/* desc of sessions */
.description{
  font-size: 17px;
}
/* tags and categories */
.tagging {
  display: flex;
  align-items: center;
}

/* tag text */
.tag-text{
  font-size: 17px;
  margin-right: 20px;
}
</style>
