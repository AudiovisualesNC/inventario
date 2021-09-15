<template>
  <div class="main-table">
    <div class="tools">
        <div class="tools-search">
          <input class="search-input" v-model="search" @input="filterData" type="search" id="site-search" name="q"
                 aria-label="Search through site content" placeholder="Filter rooms">
          <button class="delete-button" type="button">Delete</button>
        </div>

      </div>
    <span v-show="loading" class="lds-dual-ring"></span>
    <p class="total-label" v-show="loaded">Total: {{rooms_show.length}}</p>
    <div class="room-table">
        <table v-show="loaded" class="table" ref="table">
          <tr class="column-name">
            <th>Select</th>
            <th @click="sortId">ID</th>
            <th @click="sortName">Name</th>
            <th @click="sortIp">IP</th>
            <th @click="sortHostname">Hostname</th>
            <th>RS232 Port</th>
            <th @click="sortOpen">Status Port</th>
            <th @click="sortVersion">Script Version</th>
            <th @click="sortButton">Keypad</th>
            <th>Windows</th>
            <th @click="sortDevice">Hardware Model</th>
            <th @click="sortCam">Camera</th>
            <th @click="sortMonitor">Monitor</th>
            <th @click="sortZone">Zona</th>
            <th @click="sortProvince">Provincia</th>
            <th @click="sortOffice">Oficina</th>
            <th @click="sortBuilding">Edificio</th>
            <th>Online</th>
            <th>Last Connection</th>
          </tr>
          <tr v-for="room in rooms_show" :key="room.id">
            <td><input type="checkbox" name="name2" /></td>
            <td>{{room.room_id}}</td>
            <td>{{room.room_name}}</td>
            <td>{{room.ip}}</td>
            <td>{{room.hostname}}</td>
            <td>{{room.port_name}}</td>
            <td>{{room.open_port}}</td>
            <td>{{room.script_version}}</td>
            <td>{{room.with_button}}</td>
            <td>{{room.operating_system}}</td>
            <td>{{room.device}}</td>
            <td>{{room.cam}}</td>
            <td>{{room.monitor}}</td>
            <td>{{room.zone}}</td>
            <td>{{room.province}}</td>
            <td>{{room.office}}</td>
            <td>{{room.building_name}}</td>
            <td><span v-bind:style= "[ moment().diff(moment.utc(room.last_connection).local()) < 120000 ? {'background': 'green'} : {'background': 'red'}]" class="dot"></span></td>
            <td>{{moment.utc(room.last_connection).local().format("DD MMM YYYY - HH:mm")}}</td>
          </tr>
        </table>
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
      rooms_show:[],
      loading: true,
      loaded: false,
      polling: null,
      search: "",
      desId: false,
      desIp: false,
      desHostname: false,
      desName: false,
      desButton: false,
      desOpen: false,
      desVersion: false,
      desDevice: false,
      desCam: false,
      desMonitor: false,
      desZone: false,
      desProvince: false,
      desOffice: false,
      desBuilding: false,


    };
  },
  created() {
    this.pollData()
    RoomService.getAll().then(response => {
      this.loading = false
      this.loaded = true
      this.rooms = response.data
      if(this.search === ""){
        this.rooms_show = this.rooms
      }
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
    filterData() {
      const regExp = /[a-zA-Z0-9]/g;
      this.rooms_show = []
      if (regExp.test(this.search)) {
        for (let i = 0; i < this.rooms.length; i++) {
          let values = Object.values(this.rooms[i])
          for (let a = 0; a < values.length; a++){
            if(values[a]){
              let value = values[a].toString().toLowerCase()
              let search = this.search.toString().toLowerCase()
              if(value.includes(search) && !this.rooms_show.some(e => e.id === values[0])) {
                this.rooms_show.push(this.rooms[i])
              }
            }
          }
        }

      } else {
        this.rooms_show = this.rooms
      }
    },
    sortId(){
      if(this.desId){
        this.desId = false
        this.rooms_show.sort((a,b) => (parseInt(b.room_id) > parseInt(a.room_id)) ? 1 : ((parseInt(a.room_id) > parseInt(b.room_id)) ? -1 : 0))
      }else{
        this.desId = true
        this.rooms_show.sort((a,b) => (parseInt(a.room_id) > parseInt(b.room_id)) ? 1 : ((parseInt(b.room_id) > parseInt(a.room_id)) ? -1 : 0))
      }
    },
    sortName(){
      if(this.desName){
        this.desName = false
        this.rooms_show.sort((a,b) => (b.room_name > a.room_name) ? 1 : ((a.room_name > b.room_name) ? -1 : 0))
      }else{
        this.desName = true
        this.rooms_show.sort((a,b) => (a.room_name > b.room_name) ? 1 : ((b.room_name > a.room_name) ? -1 : 0))
      }

    },
    sortIp() {
      if(this.desIp){
        this.desIp = false
        this.rooms_show.sort((a,b) => (b.ip > a.ip) ? 1 : ((a.ip > b.ip) ? -1 : 0))
      }else{
        this.desIp = true
        this.rooms_show.sort((a,b) => (a.ip > b.ip) ? 1 : ((b.ip > a.ip) ? -1 : 0))
      }

    },
    sortHostname() {
      if(this.desHostname){
        this.desHostname = false
        this.rooms_show.sort((a,b) => (b.hostname > a.hostname) ? 1 : ((a.hostname > b.hostname) ? -1 : 0))
      }else{
        this.desHostname = true
        this.rooms_show.sort((a,b) => (a.hostname > b.hostname) ? 1 : ((b.hostname > a.hostname) ? -1 : 0))
      }

    },
    sortOpen(){
      if(this.desOpen){
        this.desOpen = false
        this.rooms_show.sort((a,b) => (b.open_port > a.open_port) ? 1 : ((a.open_port > b.open_port) ? -1 : 0))
      }else{
        this.desOpen = true
        this.rooms_show.sort((a,b) => (a.open_port > b.open_port) ? 1 : ((b.open_port > a.open_port) ? -1 : 0))
      }

    },
    sortVersion(){
      if(this.desVersion){
        this.desVersion = false
        this.rooms_show.sort((a,b) => (b.script_version > a.script_version) ? 1 : ((a.script_version > b.script_version) ? -1 : 0))
      }else{
        this.desVersion = true
        this.rooms_show.sort((a,b) => (a.script_version > b.script_version) ? 1 : ((b.script_version > a.script_version) ? -1 : 0))
      }

    },
    sortButton(){
      if(this.desButton){
        this.desButton = false
        this.rooms_show.sort((a,b) => (b.with_button > a.with_button) ? 1 : ((a.with_button > b.with_button) ? -1 : 0))
      }else{
        this.desButton = true
        this.rooms_show.sort((a,b) => (a.with_button > b.with_button) ? 1 : ((b.with_button > a.with_button) ? -1 : 0))
      }

    },
    sortDevice(){
      if(this.desDevice){
        this.desDevice = false
        this.rooms_show.sort((a,b) => (b.device > a.device) ? 1 : ((a.device > b.device) ? -1 : 0))
      }else{
        this.desDevice = true
        this.rooms_show.sort((a,b) => (a.device > b.device) ? 1 : ((b.device > a.device) ? -1 : 0))
      }

    },
    sortCam(){
      if(this.desCam){
        this.desCam = false
        this.rooms_show.sort((a,b) => (b.cam.toString() > a.cam.toString()) ? 1 : ((a.cam.toString() > b.cam.toString()) ? -1 : 0))
      }else{
        this.desCam = true
        this.rooms_show.sort((a,b) => (a.cam.toString() > b.cam.toString()) ? 1 : ((b.cam.toString() > a.cam.toString()) ? -1 : 0))
      }

    },
    sortMonitor(){

      if(this.desMonitor){
        console.log("AQUI")
        this.desMonitor = false
        this.rooms_show.sort((a,b) => (b.monitor > a.monitor) ? 1 : ((a.monitor > b.monitor) ? -1 : 0))
      }else{
        console.log("AQUI1")
        this.desMonitor = true
        this.rooms_show.sort((a,b) => (a.monitor > b.monitor) ? 1 : ((b.monitor > a.monitor) ? -1 : 0))
      }

    },
    sortZone(){
      if(this.desZone){
        this.desZone = false
        this.rooms_show.sort((a,b) => (b.zone > a.zone) ? 1 : ((a.zone > b.zone) ? -1 : 0))
      }else{
        this.desZone = true
        this.rooms_show.sort((a,b) => (a.zone > b.zone) ? 1 : ((b.zone > a.zone) ? -1 : 0))
      }

    },
    sortProvince(){
      if(this.desProvince){
        this.desProvince = false
        this.rooms_show.sort((a,b) => (b.province > a.province) ? 1 : ((a.province > b.province) ? -1 : 0))
      }else{
        this.desProvince = true
        this.rooms_show.sort((a,b) => (a.province > b.province) ? 1 : ((b.province > a.province) ? -1 : 0))
      }

    },
    sortOffice(){
      if(this.desOffice){
        this.desOffice = false
        this.rooms_show.sort((a,b) => (b.office > a.office) ? 1 : ((a.office > b.office) ? -1 : 0))
      }else{
        this.desOffice = true
        this.rooms_show.sort((a,b) => (a.office > b.office) ? 1 : ((b.office > a.office) ? -1 : 0))
      }
    },
    sortBuilding(){
      if(this.desBuilding){
        this.desBuilding = false
        this.rooms_show.sort((a,b) => (b.building_name > a.building_name) ? 1 : ((a.building_name > b.building_name) ? -1 : 0))
      }else{
        this.desBuilding = true
        this.rooms_show.sort((a,b) => (a.building_name > b.building_name) ? 1 : ((b.building_name > a.building_name) ? -1 : 0))
      }

    }
  },
}
</script>

<style scoped>
.main-table {
  overflow-x: auto;
}
/* Herramientas de búsqueda y manejo de las salas sobre la tablas */
.tools{
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
button{
  color: white;
  width: 6rem;
  height: 2rem;
  border-radius: 5px;
}
.search-button{
  background: #004481;
  margin-left: 1rem;
  border: none;
}
.delete-button{
  background: #DA3851;
  margin-left: 1rem;
  border: none;
}
.search-input{
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 2rem;
}
textarea:focus, input:focus{
  outline: none;
  -webkit-box-shadow: 0px 0px 13px 0px #028484;
  box-shadow: 0px 0px 13px 0px #028484;
}

/* Diseño de la tabla */
.room-table{

}
table{
  border-collapse: collapse;
  white-space: nowrap;
  margin-left: 2rem;

}
th, td {
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: center;

}
td{
  color: black;

}
th {
  background: #072146;
  cursor: pointer;
}
tr:hover {background-color: #f5f5f5;}
tr:nth-child(even) {background-color: #f2f2f2;}
.dot {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
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

.total-label{
  color: #072146;
  align-self: flex-start;
  margin-left: 2rem;
}
</style>