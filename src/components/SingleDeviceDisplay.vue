<script lang="ts">

import { Device } from '@/scripts/device';
import axios from 'axios';

export default {
    props: ["device_prop", "locations"],
    data() {
        return {
            edit_device: new Device(),
            changed: false
        }
    },
    mounted() {
        console.log("Mounted with ", this.device_prop)
        this.edit_device.id=this.device_prop.id
        this.edit_device.name=this.device_prop.name
        this.edit_device.device_type=this.device_prop.device_type
        this.edit_device.location_id=this.device_prop.location_id
    },
    methods: {
        update_changed() {
            this.changed = ( (this.device_prop.name != this.edit_device.name) || 
               (this.device_prop.device_type != this.edit_device.device_type) ||
	       (this.device_prop.location_id != this.edit_device.location_id) )
            console.log("Changed is now",this.changed)
        },
        update_device() {
            // axios.put("/api/type/"+this.edit_device.id+"/",this.edit_device)
            //     .then((result) => {
            //         console.log(result)
            //         this.$emit("update_device")
            //     })

        }
    },
    emits: ["update_device"]
}
</script>

<template>
<div class="row rounded mt-1 mb-0 p-0 ">
    <input class="col bg-secondary rounded me-1" v-model="edit_device.name" v-on:change="update_changed" />
    <input class="col bg-secondary rounded" v-model="edit_device.device_type" v-on:change="update_changed"/>

    <select class="col bg-secondary rounded" v-model="edit_device.location_id" v-on:change="update_changed">
      <option v-for="location in locations" :value="location.id">{{ location["name"] }}</option>
    </select>
<!--
    <input class="col bg-secondary rounded" v-model="edit_device.location_id" v-on:change="update_changed"/>
    -->
    <button class="col bg-primary text-end rounded mb-1" v-if="changed" v-on:click="update_device()">submit </button>
</div>

</template>
