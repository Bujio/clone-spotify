const winston = require("winston");
const morgan = require("morgan");
const stripFinalNewline = require("strip-final-newline");

stripFinalNewline("foo\nbar\n\n");
//=> 'foo\nbar\n'

stripFinalNewline(Buffer.from("foo\nbar\n\n")).toString();
//=> 'foo\nbar\n'

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Setup requests logger
morgan.token("id", (req) => req.id);

const requestFormat = ':remote-addr [:date[iso]] :id "method :url :status';
const requests = morgan(requestFormat, {
  stream: {
    write: (message) => {
      // Remove all line breaks
      return logger.info(message);
    },
  },
});

// Attach to logger objetc
logger.requests = requests;

module.exports = logger;
