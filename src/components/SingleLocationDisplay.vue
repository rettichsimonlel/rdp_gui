<script lang="ts">

import { Location } from '@/scripts/location';
import axios from 'axios';

export default {
    props: ["location_prop"],
    data() {
        return {
            edit_location: new Location(),
            changed: false
        }
    },
    mounted() {
        console.log("Mounted with ", this.location_prop)
        this.edit_location.name=this.location_prop.name
        this.edit_location.address=this.location_prop.address
    },
    methods: {
        update_changed() {
            this.changed = ( (this.location_prop.name != this.edit_location.name) || 
              (this.location_prop.address != this.edit_location.address) )
            console.log("Changed is now", this.changed)
        },
        update_location() {
            // axios.put("/api/type/"+this.edit_location.id+"/",this.edit_location)
            //     .then((result) => {
            //         console.log(result)
            //         this.$emit("update_device")
            //     })

        }
    },
    emits: ["update_location"]
}
</script>

<template>
<div class="row rounded mt-1 mb-0 p-0 ">
    <input class="col bg-secondary rounded me-1" v-model="edit_location.name" v-on:change="update_changed" />
    <input class="col bg-secondary rounded" v-model="edit_location.address" v-on:change="update_changed"/>
    <button class="col bg-primary text-end rounded mb-1" v-if="changed" v-on:click="update_location()">submit </button>
</div>

</template>
