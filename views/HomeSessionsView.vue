<!-- HomeSessionsView.vue -->
<template>
  <div style="width: 850px; margin: 0 auto;">
    <p class="intro">Conference Session Information</p>
       <!-- holds filter btn + sess count -->
       <div class="filter-sessCount">
       <!--display the num of sessions -->
    <p class="ses-count">{{ changeSessionCount }}</p>
    <!-- slotted btn to clear filter -->
    <!-- will clear the filters only when the filters are active -->
    <!-- onclick to clear the filter and revert to original results -->
    <FilterSlottedButton v-if="isFilterActive" @click="clearFilter">Clear Filter</FilterSlottedButton>
    </div>
    <div v-for="session in filteredSessions" :key="session.id">
    <!-- parent div to hold one entire session -->
    <div class="entire-session">
      <!-- session display info -->
      <!-- holds title and btn   -->
      <div class="sessTitle-btn">
         <h2 class="sess-title">{{ session.title }}</h2>
      <!-- btn to add item to user session-->
<!-- Update the SlottedButton usage -->
<SlottedButton @click="checkUserSessions(session)">
  {{ session.added ? 'Remove Item' : 'Add Item' }}</SlottedButton>
     </div>

      <!-- holds the presenter + time -->
      <div class="pres-time">
        <!-- for each presenter, using the presenter key in sessions, invoke the func thatll filter results by presenters -->
         <p class="presenter">Presented by: <span class="span-pres" @click="filterPresenters(session.presenter)">{{ session.presenter }}</span></p>
         <!-- time and day  -->
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

        <!-- btns w all tags -->
        <!-- for all tagsm using the tag key in sessions, invoke func thatll filter results by tags -->
        <TagsSlottedButton v-for="tag in session.tags" :key="tag" @click="filterTags(tag)">{{ tag }}
        </TagsSlottedButton>
      </div>
    </div>
    </div>
  
  </div>
</template>

<!-- begin script -->
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
    },
    
    //empty off the bat - no filter chosen yet
    presenterFilter: '',

    //empty - no tags chosen
    tagFilter: '',

    newSessions: [], //empty arr for now, will have items added
  }
},

//begin props
props: {
  sessions: Array,
},

//begin computed methods
computed: {

//begin filtering content

//filter through presenters
allPresenters() {
  //return a new session arr w only the appropriate presenters
  return [...new Set(this.sessions.map(session => session.presenter))];
},

//filter through tags
allTags() {
  //return a new session arr w only the appropriate tags
  return [...new Set(this.sessions.map(session => session.tags))];
},

//filtered sessions based on specific tags or presenters
filteredSessions(){
  //using filter method to filter the arr based on choices
  return this.sessions.filter(session => {
    //creating a const to find the right presenter
    //using includes to make sure the sessions chosen include the right presenter
    const rightPresenter = session.presenter.includes(this.presenterFilter) || this.presenterFilter === '';

    //creating a const to find the right tags
    //using the some to make sure the right tag shows up at least one
    const rightTags = session.tags.some(tag => tag.includes(this.tagFilter)) || this.tagFilter === '';

    //show the results if there is a match for presenter OR tags
    return rightPresenter && rightTags;
  });
},

//checking if any filter is active
isFilterActive() {
  //return the specific filter if there is a filter active
  return this.presenterFilter !== '' || this.tagFilter !== '';
},

//changing the count of the sessions
changeSessionCount() {
  //create a total sessions var = will calculate the length of the sessions
  const totalSessions = this.sessions.length;

  //same gist but for filtered sessions
  const totalSessionsFiltered = this.filteredSessions.length;

  //return a ternery: if there is a filter, say __ of 10 sessions
  //if there is no filter, say "10 sessions"
  return this.isFilterActive ? `${totalSessionsFiltered} of ${totalSessions} sessions: ` : `${totalSessions} sessions:`;
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

//filtering methods

//set the presenter filter, clear tag filter
filterPresenters(presenter) {
  //make the presenter filter match its appropriate person
  this.presenterFilter = presenter;
  //clear the tag filter
  this.tagFilter = '';
},

//set the tag filter, clear presenter filter
filterTags(tag) {
  //make the tag filter match its appropriate tag
  this.tagFilter = tag;
  //clear the presenter filter
  this.presenterFilter = '';
},

//clear both filters when btn is clicked 
clearFilter() {
  this.presenterFilter = '';
  this.tagFilter = '';
},

//check the user sessions if anything was added
checkUserSessions(session) {
  console.log('checkUserSessions method is called!');

  session.added = !session.added; // Vue automatically makes this reactive

  if (session.added) {
    this.addedUserSession(session);
  } else {
    this.removedUserSession(session);
  }

  console.log('newSessions after update:', this.newSessions);
    },

//add to user sessions
addedUserSession(session) {
  //push the user sessions to arr
  this.newSessions.push(session);
},

//remove from user sessions
removedUserSession(session) {
  //finding by idx. will locate it as long as idx in both arr match up
  const index = this.newSessions.findIndex(newSessions => newSessions.id === session.id);

  //as long as the idx exist, remove from arr. using splice to do this
  if (index !== -1) {
    this.newSessions.splice(index, 1);
  }
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

/* session count */
.ses-count {
  font-size: 17px;
  font-style: italic;
  margin-left: 10px;
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
