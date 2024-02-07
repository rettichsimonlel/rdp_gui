<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios'
import InputBar from './components/InputBar.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'

import { ValueType } from './scripts/value_type'
import { Value } from './scripts/value'
import { Device } from './scripts/device'
import { Location } from './scripts/location'

import { Executer } from "./Executer"
import { CommandType } from "./Commands"
import { CommandStart } from "./Commands"
import { CommandEnd } from "./Commands"
</script>

<script lang="ts">

export default {
  data() {
    return {
      values: new Array<Value>(),
      value_types: new Array<ValueType>(),
      devices: new Array<Device>(),
      locations: new Array<Location>(),
      filter_start : '',
      filter_end : '',
      filter_type : ''
    }
  },
  mounted() {
    this.get_types()
    this.get_devices()
    this.get_locations()
    this.get_values().then((data) => {
      this.values = data
    })
  },
  methods: {
    getTypeId(type_name: string) {
      var return_value = ''
      for (var i = 0; i < this.value_types.length; i++) {
        if (this.value_types[i].type_name.toUpperCase() == type_name.toUpperCase()) {
          return_value = '' + this.value_types[i].id
          console.log('Found matching type', this.value_types[i])
        }
      }
      return return_value
    },
    update_search(args: string[]) {
      console.log('New search arguemnts', args)
      this.filter_end=''
      this.filter_start=''
      this.filter_type=''
      for (var i = 0; i < args.length; i++) {
        const command = args[i]
        console.log('handling command', command)
        const command_and_args = args[i].split(':')
        if (command_and_args.length == 2) {
          const key = command_and_args[0]
          const value = command_and_args[1]

          const executer = new Executer()
          executer.execute(key, value, this)
          console.log("Test start and end, ", this.filter_start, this.filter_end)

        } else {
          console.log('Ignoring command', command)
        }
      }
      this.get_values().then((result) => {
        this.values = result
      })
    },
    get_types() {
      axios
        .get('/api/type/')
        .then((result) => {
          this.value_types = result.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    get_devices() {
      axios
        .get('/api/device/')
        .then((result) => {
          this.devices = result.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    get_locations() {
      axios
        .get('/api/location/')
        .then((result) => {
          this.locations = result.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    get_values() {
      const promise = new Promise<Value[]>((accept, reject) => {
        const url = '/api/value/'
        var params : { [key: string]: string } = {}
        if (this.filter_type != '') {
          params['type_id'] = this.filter_type
          console.log("type_id filter")
        }
        if (this.filter_end != '') {
          params['end'] = this.filter_end
          console.log("type_id end")
        }
        if (this.filter_start != '') {
          params['start']=this.filter_start
          console.log("type_id start")
        }
        console.log('Trying to get url', url)
        axios
          .get(url, { params: params })
          .then((result) => {
            accept(result.data)
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
      })
      return promise
    }
  }
}

</script>

<template>
  <div class="container p-1">
    <h1 class="row">RDP</h1>
    <InputBar @search="update_search" />
    <TypesDisplay :value_types="value_types" @update_type="get_types" />
    <ValuesDisplay :values="values" :value_types="value_types" :devices="devices" :locations="locations" />
  </div>
</template>
