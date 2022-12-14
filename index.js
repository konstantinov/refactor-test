const crypto = require("crypto");

const getHash = str => crypto.createHash("sha3-512").update(str).digest("hex")

const getObjectHash = obj => getHash(JSON.stringify(obj));
const getAsString = candidate => typeof candidate === "string" ? candidate : JSON.stringify(candidate);

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
      candidate = event.partitionKey || getObjectHash(event);
  }

  candidate = getAsString(candidate);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getHash(candidate);
  }
  return candidate;
};