<!-- HomeSessions.vue -->
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
<SlottedButton @click="addItem(session, idx)"> {{ userSessions.includes(session.id) ? 'Remove Item' : 'Add Item' }}</SlottedButton>
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
      id: 0,
      title: '',
      desc: '',
      tags: [],
      sTime: 0,
      sDay: '',
      added: false,
    },
    presenterFilter: '',
    tagFilter: '',
    userSessions: [],
    add: {},
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


//add an item to the arr
//passing the session and the id
addItem(session, idx) {

  //check to see if userSessions includes an id from session arr
  const isAdded = this.userSessions.includes(session.id);

  //conditional for which emit to use depending on state of obj
    const eventName = isAdded ? 'remove-item' : 'add-item';


    //if it is added to arr
    if (isAdded) {
      //find the index off userSessions and session
      const index = this.userSessions.indexOf(session.id);

      //be able to remove the session from the arr
      this.userSessions.splice(index, 1);
    } else { //if not added

      //push the arr id into userSession
      this.userSessions.push(session.id);
    }

    //emit the event name, the session, and the id
    this.$emit(eventName, session, idx);
  },
},

//emits 
emits: ['add-item', 'remove-item'],
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