<template>
  <div class="main-roomlist">
      <div class="div-tree">
        <ul class="tree">
        <li class="tree__li">
          <img class="icon-tree" src=@/assets/globe.png>
          <span class="tree__span">Salas ({{rooms.length}})</span>
          <ul>
            <!-- NORTE -->
            <li class="tree__li">
              <img class="icon-tree" src=@/assets/map.png>
              <span class="tree__span" @click="clicked_tree">Norte ({{rooms.filter((obj) => obj.zone === "NORTE").length}})</span>
              <ul class="nested">
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/building.png>
                  <span class="tree__span" @click="clicked_tree">Edificios ({{rooms.filter((obj) => obj.zone === "NORTE" && obj.office === "False").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.room_name">
                      <li class="tree__room" v-if='room.zone === "NORTE" && room.office === "False"' >
                        <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                        {{room.room_name}}  - {{room.hostname}}
                      </li>
                  </ul>
                </li>
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/bank.png>
                  <span class="tree__span" @click="clicked_tree">Oficinas ({{rooms.filter((obj) => obj.zone === "NORTE" && obj.office === "True").length}})</span>
                    <ul class="nested"  v-for="room in rooms"  :key="room.room_id">
                      <li class="tree__room" v-if='room.zone === "NORTE" && room.office === "True"' >
                        <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                        {{room.room_name}}  - {{room.hostname}}
                      </li>
                    </ul>
                </li>
              </ul>
            </li>
            <!-- SUR -->
            <li class="tree__li">
              <img class="icon-tree" src=@/assets/map.png>
              <span class="tree__span" @click="clicked_tree">Sur ({{rooms.filter((obj) => obj.zone === "SUR").length}})</span>
              <ul class="nested">
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/building.png>
                  <span class="tree__span" @click="clicked_tree">Edificios ({{rooms.filter((obj) => obj.zone === "SUR" && obj.office === "False").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "SUR" && room.office === "False"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/bank.png>
                  <span class="tree__span" @click="clicked_tree">Oficinas ({{rooms.filter((obj) => obj.zone === "SUR" && obj.office === "True").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "SUR" && room.office === "True"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- ESTE -->
            <li class="tree__li">
              <img class="icon-tree" src=@/assets/map.png>
              <span class="tree__span" @click="clicked_tree">Este ({{rooms.filter((obj) => obj.zone === "ESTE").length}})</span>
              <ul class="nested">
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/building.png>
                  <span class="tree__span" @click="clicked_tree">Edificios ({{rooms.filter((obj) => obj.zone === "ESTE" && obj.office === "False").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "ESTE" && room.office === "False"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/bank.png>
                  <span class="tree__span" @click="clicked_tree">Oficinas ({{rooms.filter((obj) => obj.zone === "ESTE" && obj.office === "True").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "ESTE" && room.office === "True"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- OESTE -->
            <li class="tree__li">
              <img class="icon-tree" src=@/assets/map.png>
              <span class="tree__span" @click="clicked_tree">Oeste ({{rooms.filter((obj) => obj.zone === "OESTE").length}})</span>
              <ul class="nested">
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/building.png>
                  <span class="tree__span" @click="clicked_tree">Edificios ({{rooms.filter((obj) => obj.zone === "OESTE" && obj.office === "False").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "OESTE" && room.office === "False"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/bank.png>
                  <span class="tree__span" @click="clicked_tree">Oficinas ({{rooms.filter((obj) => obj.zone === "OESTE" && obj.office === "True").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "OESTE" && room.office === "True"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- CENTRO -->
            <li class="tree__li">
              <img class="icon-tree" src=@/assets/map.png>
              <span class="tree__span" @click="clicked_tree">Centro ({{rooms.filter((obj) => obj.zone === "CENTRO").length}})</span>
              <ul class="nested">
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/building.png>
                  <span class="tree__span" @click="clicked_tree">Edificios ({{rooms.filter((obj) => obj.zone === "CENTRO" && obj.office === "False").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "CENTRO" && room.office === "False"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/bank.png>
                  <span class="tree__span" @click="clicked_tree">Oficinas ({{rooms.filter((obj) => obj.zone === "CENTRO" && obj.office === "True").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "CENTRO" && room.office === "True"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- CANARIAS -->
            <li class="tree__li">
              <img class="icon-tree" src=@/assets/map.png>
              <span class="tree__span" @click="clicked_tree">Canarias ({{rooms.filter((obj) => obj.zone === "CANARIAS").length}})</span>
              <ul class="nested">
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/building.png>
                  <span class="tree__span" @click="clicked_tree">Edificios ({{rooms.filter((obj) => obj.zone === "CANARIAS" && obj.office === "False").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "CANARIAS" && room.office === "False"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/bank.png>
                  <span class="tree__span" @click="clicked_tree">Oficinas ({{rooms.filter((obj) => obj.zone === "CANARIAS" && obj.office === "True").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone === "CANARIAS" && room.office === "True"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- CATALUÑA -->
            <li class="tree__li">
              <img class="icon-tree" src=@/assets/map.png>
              <span class="tree__span" @click="clicked_tree">Cataluña ({{rooms.filter((obj) => obj.zone != null && obj.zone.startsWith("CAT")).length}})</span>
              <ul class="nested">
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/building.png>
                  <span class="tree__span" @click="clicked_tree">Edificios ({{rooms.filter((obj) =>obj.zone != null && obj.zone.startsWith("CATA") && obj.office === "False").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone != null && room.zone.startsWith("CATA")  && room.office === "False"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
                <li class="tree__li">
                  <img class="icon-tree" src=@/assets/bank.png>
                  <span class="tree__span" @click="clicked_tree">Oficinas ({{rooms.filter((obj) =>obj.zone != null && obj.zone.startsWith("CATA") && obj.office === "True").length}})</span>
                  <ul class="nested"  v-for="room in rooms"  :key="room.id">
                    <li class="tree__room" v-if='room.zone != null && room.zone.startsWith("CATA") && room.office === "True"' >
                      <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                      {{room.room_name}}  - {{room.hostname}}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- INDEFINIDO -->
            <li class="tree__li">
              <img class="icon-tree" src=@/assets/map.png>
              <span class="tree__span" @click="clicked_tree">Indefinido ({{rooms.filter((obj) => obj.zone === null || obj.zone === "").length}})</span>
              <ul class="nested"  v-for="room in rooms"  :key="room.id">
                <li class="tree__room" v-if='room.zone === null || room.zone === ""'>
                  <span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span>
                  {{room.room_name}}  - {{room.hostname}}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      </div>
  </div>
</template>

<script>
import RoomService from '../services/room.service'
export default {
  name: "Home",
  data() {
    return {
      rooms: [],
      loading: true,
      loaded: false,
      polling: null,
    };
  },
  created() {
    this.pollData()
    RoomService.getAll().then(response => {
      this.loading = false
      this.loaded = true
      this.rooms = response.data
    }).catch(err => {
      this.loading = false
      this.loaded= false
      console.log(err)
    })
  },
  methods: {
    pollData () {
      this.polling = setInterval(() => {
        RoomService.getAll().then(response => {
          this.rooms = response.data
        })
      }, 60000)
    },
    clicked_tree (event) {
      for(let a = 0; a < event.target.parentNode.childNodes.length; a++){
        if(event.target.parentNode.childNodes[a].className === "nested"){
          event.target.parentNode.childNodes[a].classList.toggle("active")
        } else if(event.target.parentNode.childNodes[a].className === "nested active"){
          event.target.parentNode.childNodes[a].classList.remove("active")
        }
      }

    }
  },
}
</script>

<style scoped>
ul, .tree {
  list-style-type: none;
}
.div-tree {

}
.dot {
  height: 15px;
  width: 15px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-bottom: -2px;
  margin-left: 0.5rem;
}
.tree {
  margin-top: 3rem;
  margin-left: 3rem;
  padding: 0;
}
.tree__li {
  margin-top: 1rem;
  color: #072146;
  text-align: left;
}
.tree__span{
  cursor: pointer;
  user-select: none; /* Prevent text selection */
  margin-left: 0.5rem;

}
.icon-tree{
  width: 15px;
  margin-bottom: -3px;
  margin-left: 0.5rem;
}
.tree__room {
  color: #1464A5;
  margin-top: 0.5rem;
}
.nested {
  display: none;
}
.active {
  display: block;
}
button{
  color: white;
  width: 6rem;
  height: 2rem;
  border-radius: 5px;
}
.lds-dual-ring {
  align-self: center;
  margin-top: 2rem;
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #072146;
  border-color: #072146 transparent #072146 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>