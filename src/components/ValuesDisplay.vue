<script lang="ts">
import { Value } from '@/scripts/value'

import axios from 'axios';

export default {
  props: ['values', 'value_types', 'devices', 'locations'],
  data() {
    return {
      new_value: new Value(),
      adding: false,
      editing: false
    };
  },
  mounted() {
    this.new_value.id=1
    this.new_value.value_type_id=1
    this.new_value.time=1
    this.new_value.value=1
    this.new_value.value_device=1
  },
      
      
  setup(props) {
    console.log(props.values)
  },
  emits: ['rename'],
  methods: {
    getTypeName(value: Value) {
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].id == value.value_type_id) {
          return this.value_types[i].type_name
        }
      }
      return 'XXX'
    },
    getUnit(value: Value) {
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].id == value.value_type_id) {
          return this.value_types[i].type_unit
        }
      }
      return 'XXX'
    },
    getDeviceName(value: Value) {
      for (var i = 0; i < this.devices.length; i++) {
	if (this.devices[i].id == value.device_id) {
	  return this.devices[i].name
	}
	else if (this.devices[i].id == value.value_device) {
	  return this.devices[i].name
	}

      }
      return 'XXX'
    },
    getLocationName(device_id: number, value_device: number) {
      var location_id = 0
      for (var i = 0; i < this.devices.length; i++) {
	if (device_id == this.devices[i].id) {
	  location_id = this.devices[i].location_id
	  return this.locations[location_id - 1].name
	}
	else if (value_device == this.devices[i].id) {
	  location_id = this.devices[i].location_id
	  return this.locations[location_id - 1].name
	}
      }
      return 'XXX'
    },
    toggle_add() {
      this.adding = !this.adding;
    },
    add_type() {
      this.toggle_add();

      axios.post("api/add_value/?value_time=" + this.new_value.time + "&value_type=" + this.new_value.value_type_id + "&value_value=" + this.new_value.value + "&value_device=" + this.new_value.value_device, {
      }).then((result) => {
	console.log(result)
	this.values.push(this.new_value)
      })
    },
  }
}
</script>

<template>
  
  <div class="row bg-primary mt-2 mb-1" v-if="!editing">
    <div
      class="col-1"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-title="Tooltip on top"
    >
      time
    </div>
    <div class="col-1">type</div>
    <div class="col">value</div>
    <div class="col">device</div>
    <div class="col">location</div>
  </div>
  <div class="row bg-secondary rounded mt-1" v-for="value in values" :key="value">
    <div class="col-1">
      {{ value.time }}
    </div>
    <div class="col-1">
      {{ getTypeName(value) }}
    </div>
    <div class="col">{{ value.value }} {{ getUnit(value) }}</div>
    <div class="col">{{ getDeviceName(value) }}</div>
    <div class="col">{{ getLocationName(value.device_id, value.value_device) }}</div>
  </div>


  <div class="row rounded mt-1 mb-0 p-0" v-if="!adding">
    <button class="col bg-danger rounded" v-on:click="toggle_add()">add</button>
  </div>
  <div class="row rounded mt-1 mb-0 p-0" v-if="adding">
    <div class="col">Time</div>
    <div class="col">Type</div>
    <div class="col">Value</div>
    <div class="col">Device</div>
    <div class="col"></div>
    <div class="col"></div>
  </div>
  <div class="row rounded mt-1 mb-0 p-0" v-if="adding">
    <input class="col bg-secondary rounded" v-model="new_value.time" />

    <select class="col bg-secondary rounded" v-model="new_value.value_type_id">
      <option v-for="type in value_types" :value="type.id">{{ type["type_name"] }}</option>
    </select>

    <input class="col bg-secondary rounded" v-model="new_value.value" />

    <select class="col bg-secondary rounded" v-model="new_value.value_device">
      <option v-for="device in devices" :value="device.id">{{ device["name"] }}</option>
    </select>

    <button class="col bg-primary text-end rounded mb-1" v-on:click="toggle_add()">cancle</button>
    <button class="col bg-primary text-end rounded mb-1" v-on:click="add_type()">submit</button>
  </div>

</template>
