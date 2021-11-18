/**
 * Converts a Temporal.PlainDateTime instance into a Date.
 * This is the inverse of the fromLegacyDate example
 *
 * @param {Temporal.PlainDateTime} dateTime - This is a DateTime instance
 * @returns {Date} legacy Date instance
 */
function getLegacyDateInUTCFromDateTime(dateTime) {
  // the round() step is only necessary if you want other rounding
  // behaviour than truncation. For example, here the 999 microseconds
  // is rounded to 1 millisecond.
  dateTime = dateTime.round({ smallestUnit: 'millisecond' });
  return new Date(
    Date.UTC(
      dateTime.year,
      dateTime.month - 1,
      dateTime.day,
      dateTime.hour,
      dateTime.minute,
      dateTime.second,
      dateTime.millisecond
    )
  );
}

const dateTime = Temporal.PlainDateTime.from('2020-01-01T00:00:01.000999');
const result = getLegacyDateInUTCFromDateTime(dateTime);

// Take care to pick the correct one of getFullYear() / getUTCFullYear()
// etc. depending on your use case! Legacy Date can be interpreted as
// being in either UTC or in the user's local time zone.
assert.equal(result.getUTCDate(), 1); // Day of the month
assert.equal(result.getUTCFullYear(), 2020);
assert.equal(result.getUTCMonth(), 0); // the month (zero-indexed)
assert.equal(result.toISOString(), '2020-01-01T00:00:01.001Z');

// To convert Instant and ZonedDateTime to legacy Date, use the
// epochMilliseconds property. Legacy Date will not preserve the
// ZonedDateTime's time zone.

const instant = Temporal.Instant.from('2020-01-01T00:00:01.000999Z');
// Add an optional round() step here, as above, if desired
const result2 = new Date(instant.epochMilliseconds);

assert.equal(result2.getTime(), 1577836801000); // ms since Unix epoch
assert.equal(result2.toISOString(), '2020-01-01T00:00:01.000Z');
