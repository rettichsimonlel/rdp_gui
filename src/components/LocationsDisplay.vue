<script lang="ts">

import SingleLocationDisplay from './SingleLocationDisplay.vue';

import { Location } from '@/scripts/location';

import axios from 'axios';

export default {
    props: ['locations'],
    data() {
      return {
	    new_location: new Location(),
            editor_hidden: true,
	    adding: false
        };
    },
  mounted() {
    this.new_location.id = 1
    this.new_location.name=""
    this.new_location.address=""
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

	if (this.locations && this.locations.length > 0) {
	  const lastItem = this.locations[this.locations.length - 1];
	  this.new_location.id = lastItem.id + 1; // Assuming IDs are incremental
	} else {
	  this.new_location.id = 1; // Set ID to 1 if locations is empty
	}

	console.log("This is data: ", this.new_location.id)
	console.log("This is data: ", this.new_location.name)
	console.log("This is data: ", this.new_location.address)
	

	// http://localhost:8080/api/add_type/?type_id=3&type_name=as&type_unit=df
	axios.post("/api/add_location/?name=" + this.new_location.name + "&address=" + this.new_location.address, {
	}).then((result) => {
	  console.log(result)
	  this.locations.push(this.new_location)
	})
      }
    },
    components: { SingleLocationDisplay },
    emits: ['update_location']
}
</script>

<template>
  <div class="row bg-primary mt-1">
    <span class="col-2">Location Editor</span>
    <span class="col text-end" v-on:click="toggleEditor()">
      <i class="bi bi-caret-down-fill" title="Show TypeEditor" v-if="editor_hidden"></i>
      <i class="bi bi-caret-up-fill" title="Hide TypeEditor" v-else></i>
    </span>
  </div>
  <span v-if="!editor_hidden">

    <div class="row rounded mt-1 mb-0 p-0">
      <div class="col bg-secondary rounded"><b>Name</b></div>
      <div class="col bg-secondary rounded"><b>Address</b></div>
    </div>

    
    <SingleLocationDisplay :location_prop="location" v-for="location in locations" :key="location" @update_type="$emit('update_location')"/>

    <div class="row rounded mt-1 mb-0 p-0" v-if="!adding">
      <button class="col bg-danger rounded" v-on:click="toggle_add()">add</button>
    </div>
    <div class="row rounded mt-1 mb-0 p-0" v-if="adding">
      <input class="col bg-secondary rounded me-1" v-model="new_location.name" />
      <input class="col bg-secondary rounded" v-model="new_location.address" />
      <button class="col bg-primary text-end rounded mb-1" v-on:click="toggle_add()">cancle</button>
      <button class="col bg-primary text-end rounded mb-1" v-on:click="add_type()">submit</button>
    </div>
  </span>
</template>
