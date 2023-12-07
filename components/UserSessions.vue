
<!-- UserSessions.vue -->
<template>
  <div style="width: 850px; margin: 0 auto;">

    <!-- intro text -->
    <p class="intro">User Sessions</p> 
     <!-- display the num of sessions -->
     <p class="ses-count">{{ userSessionCount }}</p>
     <!-- for each session in userSession -->
     <div v-for="sessionId in userSessions" :key="sessionId">
      <!-- div to hold all session w info -->
      <div class="user-sess-parent">
        <p class="session-info">
          title: {{ getSessionTitle(sessionId) }}
          Time: {{ TwelveHourFormat(getSessionTime(sessionId)) }} |
          Day: {{ getSessionDay(sessionId) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
//begin props
 props: {
    userSessions: Array,
    sessions: Array,
  },
  //being computed methods
  computed: {
    
    //display the user session count
    userSessionCount() {

      //conditional: check to make sure userSession is defined before naming how many sessions are added
      const newLength = this.userSessions ? this.userSessions.length : 0;
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

 // Get session title based on session ID
 getSessionTitle(sessionId) {
      const session = this.sessions.find((s) => s.id === sessionId);
      return session ? session.title : '';
    },

    // Get session time based on session ID
    getSessionTime(sessionId) {
      const session = this.sessions.find((s) => s.id === sessionId);
      return session ? session.sTime : 0;
    },

       // Get session day based on session ID
    getSessionDay(sessionId) {
      const session = this.sessions.find((s) => s.id === sessionId);
      return session ? session.sDay : '';
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