export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

const getLogLevel = (): LogLevel => {
  const env = process.env.NODE_ENV;
  const logLevel = process.env.REACT_APP_LOG_LEVEL;

  if (logLevel) {
    switch (logLevel.toLocaleUpperCase()) {
      case "ERROR":
        return LogLevel.ERROR;
      case "WARN":
        return LogLevel.WARN;
      case "INFO":
        return LogLevel.INFO;
      case "DEBUG":
        return LogLevel.DEBUG;
    }
  }

  switch (env) {
    case "production":
      return LogLevel.ERROR;
    case "development":
      return LogLevel.DEBUG;
    default:
      return LogLevel.INFO;
  }
};
