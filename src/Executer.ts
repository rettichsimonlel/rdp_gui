import app from './App.vue'
import { CommandFactory } from './Factory'

export class Executer {
    /**
     * Executes a command based on the key
     */
    public execute(key: string, args: string, the_app: typeof app): void {
        /**
         * Running the builder to get the right function and run it.
         * args:
         * @param key: string that contains the type of function to call
         * @param args: contains the the second part of the input
         * @param the_app: contains the 'this' keyword of the App.vue
         */
        const builder = new CommandFactory()
        console.log("Key: ", key)
        const sorter = builder.buildCommand(key)
        sorter.execute([the_app, args]) 
    }
}

