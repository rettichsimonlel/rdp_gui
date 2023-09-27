import { Command } from "./Commands"

export class Executer {
    private register: { [key: string]: new (arg: string) => Command } = {};
  
    registerCommand(name: string, commandConstructor: new (arg: string) => Command) {
      this.register[name] = commandConstructor;
    }
  
    execute(key: string, arg: string) {
      const CommandConstructor = this.register[key];
      if (CommandConstructor) {
        const command = new CommandConstructor(arg);
        command.execute();
      } else {
        console.log('Unknown command:', key);
      }
    }
  }
  