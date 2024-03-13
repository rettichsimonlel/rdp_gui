<script lang="ts">

import SingleTypeDisplay from './SingleTypeDisplay.vue';

import { ValueType } from '@/scripts/value_type';

import axios from 'axios';

export default {
    props: ['value_types'],
    data() {
      return {
	    new_type: new ValueType(),
            editor_hidden: true,
	    adding: false
        };
    },
  mounted() {
    this.new_type.id = 1
    this.new_type.type_name=""
    this.new_type.type_unit=""
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

	if (this.value_types && this.value_types.length > 0) {
	  const lastItem = this.value_types[this.value_types.length - 1];
	  this.new_type.id = lastItem.id + 1; // Assuming IDs are incremental
	} else {
	  this.new_type.id = 1; // Set ID to 1 if value_types is empty
	}

	console.log("This is data: ", this.new_type.id)
	console.log("This is data: ", this.new_type.type_name)
	console.log("This is data: ", this.new_type.type_unit)
	

	// http://localhost:8080/api/add_type/?type_id=3&type_name=as&type_unit=df
	axios.post("/api/add_type/?type_id=" + this.new_type.id + "&type_name=" + this.new_type.type_name + "&type_unit=" + this.new_type.type_unit, {
	}).then((result) => {
	  console.log(result)
	  this.value_types.push(this.new_type)
	})
      }
    },
    components: { SingleTypeDisplay },
    emits: ['update_type']
}
</script>

<template>
  <div class="row bg-primary mt-1">
    <span class="col-2">Type Editor</span>
    <span class="col text-end" v-on:click="toggleEditor()">
      <i class="bi bi-caret-down-fill" title="Show TypeEditor" v-if="editor_hidden"></i>
      <i class="bi bi-caret-up-fill" title="Hide TypeEditor" v-else></i>
    </span>
  </div>
  <span v-if="!editor_hidden">

    <div class="row rounded mt-1 mb-0 p-0">
      <div class="col bg-secondary rounded"><b>Type Name</b></div>
      <div class="col bg-secondary rounded"><b>Type Unit</b></div>
    </div>

    <SingleTypeDisplay :type_prop="value_type" v-for="value_type in value_types" :key="value_type" @update_type="$emit('update_type')"/>

    <div class="row rounded mt-1 mb-0 p-0" v-if="!adding">
      <button class="col bg-danger rounded" v-on:click="toggle_add()">add</button>
    </div>

    
    <div class="row rounded mt-1 mb-0 p-0" v-if="adding">
      <input class="col bg-secondary rounded me-1" v-model="new_type.type_name" />
      <input class="col bg-secondary rounded" v-model="new_type.type_unit" />
      <button class="col bg-primary text-end rounded mb-1" v-on:click="toggle_add()">cancle</button>
      <button class="col bg-primary text-end rounded mb-1" v-on:click="add_type()">submit</button>
    </div>
  </span>
</template>
