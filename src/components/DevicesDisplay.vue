<script lang="ts">

import SingleDeviceDisplay from './SingleDeviceDisplay.vue';

import { Device } from '@/scripts/device';

import axios from 'axios';

export default {
    props: ['devices', 'locations'],
    data() {
      return {
	    new_device: new Device(),
            editor_hidden: true,
	    adding: false
        };
    },
  mounted() {
    this.new_device.id = 1
    this.new_device.name=""
    this.new_device.device_type=""
    this.new_device.location_id=1
  },
    methods: {
        toggleEditor() {
            this.editor_hidden = !this.editor_hidden;
        },
      toggle_add() {
	this.adding = !this.adding;
      },
      add_type() {
	this.toggle_add();

	// http://localhost:8080/api/add_type/?type_id=3&type_name=as&type_unit=df
	axios.post("/api/add_device/?name=" + this.new_device.name + "&location_id=" + this.new_device.location_id + "&_type=" + this.new_device.device_type, {
	}).then((result) => {
	  console.log(result)
	  this.devices.push(this.new_device)
	})
      }
    },
    components: { SingleDeviceDisplay },
    emits: ['update_type']
}
</script>

<template>
  <div class="row bg-primary mt-1">
    <span class="col-2">Device Editor</span>
    <span class="col text-end" v-on:click="toggleEditor()">
      <i class="bi bi-caret-down-fill" title="Show TypeEditor" v-if="editor_hidden"></i>
      <i class="bi bi-caret-up-fill" title="Hide TypeEditor" v-else></i>
    </span>
  </div>
  <span v-if="!editor_hidden">

    <div class="row rounded mt-1 mb-0 p-0">
      <div class="col bg-secondary rounded"><b>Device Name</b></div>
      <div class="col bg-secondary rounded"><b>Device Type</b></div>
      <div class="col bg-secondary rounded"><b>Device Location</b></div>
    </div>

    
    <SingleDeviceDisplay :device_prop="device" :locations="locations" v-for="device in devices" :key="device" @update_type="$emit('device')"/>

    <div class="row rounded mt-1 mb-0 p-0" v-if="!adding">
      <button class="col bg-danger rounded" v-on:click="toggle_add()">add</button>
    </div>
    <div class="row rounded mt-1 mb-0 p-0" v-if="adding">
      <input class="col bg-secondary rounded me-1" v-model="new_device.name" />
      <input class="col bg-secondary rounded" v-model="new_device.device_type" />

      <select class="col bg-secondary rounded" v-model="new_device.location_id" v-on:change="update_changed">
	<option v-for="location in locations" :value="location.id">{{ location["name"] }}</option>
      </select>
<!--      
      <input class="col bg-secondary rounded" v-model="new_device.location_id" />
-->
      <button class="col bg-primary text-end rounded mb-1" v-on:click="toggle_add()">cancle</button>
      <button class="col bg-primary text-end rounded mb-1" v-on:click="add_type()">submit</button>
    </div>
  </span>
</template>
