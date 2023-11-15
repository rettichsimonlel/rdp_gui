import app from './App.vue'

export class Command {
  /**
   * Creates the command for the command pattern
   */
  public execute(args: [typeof app, string]): void {
    /**
     * Creates the execute command that will be
     * overitten by the different commands.
     */
  }
}

class CommandType extends Command {
  /**
   * Command for sorting the output based on type.
   */
  public execute(args: [typeof app, string]): void {
    /**
     * Executes the sort
     * @param args: 
     *  - [0]: a reference to the App.vue functions and variables
     *  - [1]: the second part of the input 
     */
    args[0].filter_type = args[0].getTypeId(args[1])
  }
}

class CommandStart extends Command {
  /**
   * Command for sorting the output based on start.
   */
  public execute(args: [typeof app, string]): void {
    /**
     * Executes the sort
     * @param args: 
     *  - [0]: a reference to the App.vue functions and variables
     *  - [1]: the second part of the input 
     */
    args[0].filter_start = args[1]
  }
}

class CommandEnd extends Command {
  /**
   * Command for sorting the output based on start.
   */
  public execute(args: [typeof app, string]): void {
    /**
     * Executes the sort
     * @param args: 
     *  - [0]: a reference to the App.vue functions and variables
     *  - [1]: the second part of the input 
     */
    args[0].filter_end = args[1]
  }
}

export const CommandDict: { [key: string] : typeof Command } = {
  /**
   * Exports a Dict with the different command functions
   * based on the key.
   * @param key: string that contains the type of function to call
   */
  type: CommandType,
  start: CommandStart,
  end: CommandEnd,
}

