<script setup lang="ts">
import axios from 'axios'
import InputBar from './components/InputBar.vue'
import ValuesDisplay from './components/ValuesDisplay.vue'
import TypesDisplay from './components/TypesDisplay.vue'

import { ValueType } from './scripts/value_type'
import { Value } from './scripts/value'

import { Executer } from "./Executer"
import { CommandType } from "./Commands"
import { CommandStart } from "./Commands"
import { CommandEnd } from "./Commands"

import dataStore from './dataStore';
</script>

<script lang="ts">

const executer = new Executer();

executer.registerCommand('type', CommandType);
executer.registerCommand('start', CommandStart);
executer.registerCommand('end', CommandEnd);

export default {
  /*data() {
    return {
      values: new Array<Value>(),
      value_types: new Array<ValueType>(),
      filter_start : '',
      filter_end : '',
      filter_type : ''
    }
  },*/
  mounted() {
    this.get_types()
    this.get_values().then((data) => {
      dataStore.values = data
    })
  },
  methods: {
    getTypeId(type_name: string) {
      var return_value = ''
      for (var i = 0; i < dataStore.value_types.length; i++) {
        if (dataStore.value_types[i].type_name.toUpperCase() == type_name.toUpperCase()) {
          return_value = '' + dataStore.value_types[i].id
          console.log('Found matching type', dataStore.value_types[i])
        }
      }
      return return_value
    },
    update_search(args: string[]) {
      console.log('New search arguemnts', args)
      dataStore.filter_end=''
      dataStore.filter_start=''
      dataStore.filter_type=''
      for (var i = 0; i < args.length; i++) {
        const command = args[i]
        console.log('handling command', command)
        const command_and_args = args[i].split(':')
        if (command_and_args.length == 2) {
          const key = command_and_args[0]
          const value = command_and_args[1]

          executer.execute(key, value)

          /*
          if (key == 'type') {
            this.filter_type = this.getTypeId(value)
            console.log('Update typeid', this.filter_type)
            continue
          } else if (key == 'start') {
            this.filter_start = value
            continue
          } else if (key == 'end') {
            this.filter_end = value
            continue
          }
          */
        }
        console.log('Ignoring command', command)
      }
      this.get_values().then((result) => {
        dataStore.values = result
      })
    },
    get_types() {
      axios
        .get('/api/type/')
        .then((result) => {
          dataStore.value_types = result.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    get_values() {

      const promise = new Promise<Value[]>((accept, reject) => {
        const url = '/api/value/'
        var params : { [key: string]: string } = {}
        if (dataStore.filter_type != '') {
          params['type_id'] = dataStore.filter_type
        }
        if (dataStore.filter_end != '') {
          params['end'] = dataStore.filter_end
        }
        if (dataStore.filter_start != '') {
          params['start']=dataStore.filter_start
        }
        console.log('Trying to get url', url)
        axios
          .get(url, { params: params })
          .then((result) => {
            // console.log('Got values: ', result.data)
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
    <ValuesDisplay :values="dataStore.values" :value_types="dataStore.value_types" />
  </div>
</template>
