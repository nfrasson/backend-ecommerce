import isTestEnvironment from "./isTestEnvironment.mjs";

export default class Logger {
  constructor(identifier) {
    this.identifier = identifier;
    this.isTestEnvironment = isTestEnvironment();
  }

  info(state, objectToLog = {}) {
    if (this.isTestEnvironment) return;
    console.info({ identifier: this.identifier, state, ...objectToLog });
  }

  debug(state, objectToLog = {}) {
    if (this.isTestEnvironment) return;
    console.debug({ identifier: this.identifier, state, ...objectToLog });
  }

  warn(state, objectToLog = {}) {
    if (this.isTestEnvironment) return;
    console.warn({ identifier: this.identifier, state, ...objectToLog });
  }

  error(state, error, objectToLog = {}) {
    if (this.isTestEnvironment) return;
    console.error({
      identifier: this.identifier,
      state,
      stack: error.stack,
      message: error.message,
      ...objectToLog,
    });
  }
}
