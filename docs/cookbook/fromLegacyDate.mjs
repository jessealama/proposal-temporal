const legacyDate = new Date('1970-01-01T00:00:01Z');
const instant = legacyDate.toTemporalInstant();

assert.equal(instant.toString(), '1970-01-01T00:00:01Z');

// If you need a ZonedDateTime, use the toZonedDateTime() or
// toZonedDateTimeISO() method of the resulting Instant.

// You will need to specify a time zone. You might not have time
// zone information, since legacy Date is an exact time without
// a time zone, and can be interpreted as being in either UTC or
// the local time zone.
// Depending on which interpretation you need, you could either
// pass "UTC" or Temporal.Now.timeZone().

const zoned = instant.toZonedDateTimeISO('UTC');

assert.equal(zoned.day, 1);
assert.equal(zoned.month, 1);
assert.equal(zoned.year, 1970);
assert.equal(zoned.toString(), '1970-01-01T00:00:01+00:00[UTC]');

// If you need a PlainDateTime, get it from the ZonedDateTime's
// toPlainDateTime() method.

const plain = zoned.toPlainDateTime();

assert.equal(plain.day, 1);
assert.equal(plain.month, 1);
assert.equal(plain.year, 1970);
assert.equal(plain.toString(), '1970-01-01T00:00:01');
