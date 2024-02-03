/* eslint no-console: "off" */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export type LogFunction = (message: string, ...args: unknown[]) => void;
export type LogFunctions = Record<LogLevel, LogFunction>;

export const DefaultLogFunctions = {
  [LogLevel.DEBUG]: console.debug,
  [LogLevel.INFO]: console.info,
  [LogLevel.WARN]: console.warn,
  [LogLevel.ERROR]: console.error,
} satisfies LogFunctions;

export const DefaultThreshold =
  process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.WARN;

export class Logger {
  #logFunctions: LogFunctions;
  #threshold: LogLevel;

  constructor(
    logFunctions: LogFunctions = DefaultLogFunctions,
    threshold: LogLevel = DefaultThreshold,
  ) {
    this.#logFunctions = logFunctions;
    this.#threshold = threshold;
  }

  #log(level: LogLevel, ...params: Parameters<LogFunction>): void {
    if (level >= this.#threshold) {
      this.#logFunctions[level](...params);
    }
  }

  get debug(): LogFunction {
    return this.#log.bind(this, LogLevel.DEBUG);
  }

  get info(): LogFunction {
    return this.#log.bind(this, LogLevel.INFO);
  }

  get warn(): LogFunction {
    return this.#log.bind(this, LogLevel.WARN);
  }

  get error(): LogFunction {
    return this.#log.bind(this, LogLevel.ERROR);
  }
}

export const logger = new Logger();
