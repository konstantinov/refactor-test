const { deterministicPartitionKey } = require('./index');
const crypto = require("crypto");

test("default", () => {
    expect(deterministicPartitionKey()).toBe("0");
});

test("JSON data", () => {
    expect(deterministicPartitionKey({ partitionKey: "test" })).toBe("test");
    const longKey = "t".repeat(257);

    expect(deterministicPartitionKey({ partitionKey: longKey })).toBe(crypto.createHash("sha3-512").update(longKey).digest("hex"));

    const json = { eventTest: 1 };
    expect(deterministicPartitionKey(json)).toBe(crypto.createHash("sha3-512").update(JSON.stringify({ eventTest: 1 })).digest("hex"))
})

test("JSON key", () => {
    const event = {
        partitionKey: [ 1, 2 ]
    };
    expect(deterministicPartitionKey(event)).toBe(JSON.stringify(event.partitionKey));
})