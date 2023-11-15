import { Command } from "./Commands";
import { CommandDict } from "./Commands";


export class CommandFactory {
    /**
     * Exports a class for the Factory.
     */
    public buildCommand(key: string): Command {
        /**
         * Builds the command based on the key.
         * @param key: The 
         * @return Returns an object of the correct command.
         */
        const command = CommandDict[key]
        const object = new command()

        return object
    }
}

