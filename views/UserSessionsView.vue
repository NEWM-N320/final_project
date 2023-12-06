<!-- UserSessionsView.vue -->
<template>
  <div style="width: 850px; margin: 0 auto;">

    <!-- intro text -->
    <p class="intro">User Sessions</p> 
     <!-- display the num of sessions -->
     <p class="ses-count">{{ userSessionCount }}</p>
     <!-- for each session in newSessions -->
     <div v-for="session in newSessions" :key="session.id">
      <!-- div to hold all session w info -->
      <div class="user-sess-parent">
        <!-- session title added -->
        <h2 class="sess-title">{{ session.title }}</h2>

        <!-- session time and day  -->
           <p class="time"> {{ session.sDay }} at {{ TwelveHourFormat(session.sTime, session.sDay) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
//begin props
 props: {
    newSessions: Array,
  },
  //being computed methods
  computed: {
    
    //display the user session count
    userSessionCount() {

      //conditional: check to make sure newSessions is defined before naming how many sessions are added
      const newLength = this.newSessions ? this.newSessions.length : 0;
      return `${newLength} sessions added:`;
    }
  },

  //begin methods
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
},
  }
  
};
</script>

<!-- begin styling -->
<style scoped>
/* h1 that is intro */
.intro {
  color: #000;
  font-size: 30px;
}

/* session count */
.ses-count {
  font-size: 17px;
  font-style: italic;
  margin-left: 10px;
}
</style>
