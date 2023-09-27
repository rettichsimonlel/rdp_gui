import getTypeId from "./App.vue"
import data from "./App.vue"
import dataStore from "./dataStore"

export class Command {
  execute() {
  }
}

export class CommandType extends Command {
  constructor(private value: string) {
    super();
  }

  execute() {

  }
}

export class CommandStart extends Command {
  constructor(private value: string) {
    super();
  }

  execute() {
  }
}

export class CommandEnd extends Command {
  constructor(private value: string) {
    super();
  }

  execute() {
  }
}
