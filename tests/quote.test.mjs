import assert from "node:assert/strict";
import { test } from "node:test";
import { buildQuoteMessage, validateQuote } from "../src/lib/quote.ts";

const request = {
  name: "  Minh Anh  ",
  phone: "",
  service: "Thiết kế 3D",
  notes: "Cần 2 bánh răng thay thế.\nĐường kính 38 mm.",
};

test("a Zalo customer can request a quote without giving a second contact number", () => {
  assert.deepEqual(validateQuote(request), {});
});

test("blank names and descriptions do not produce an unusable quote request", () => {
  const errors = validateQuote({ ...request, name: "  ", notes: "\n " });
  assert.ok(errors.name);
  assert.ok(errors.notes);
});

test("formatted Vietnamese mobile numbers are accepted, but malformed numbers are rejected", () => {
  for (const phone of ["0384 844 730", "+84 384 844 730", "84 384 844 730", "0384.844.730"]) {
    assert.equal(validateQuote({ ...request, phone }).phone, undefined, phone);
  }
  for (const phone of ["05|1234567", "123", "+840384844730", "03848447300", "038abc4730"]) {
    assert.ok(validateQuote({ ...request, phone }).phone, phone);
  }
});

test("the copied request preserves quantities and line breaks and excludes empty phone fields", () => {
  const message = buildQuoteMessage(request);
  assert.match(message, /Minh Anh/);
  assert.match(message, /Thiết kế 3D/);
  assert.match(message, /Cần 2 bánh răng thay thế\.\nĐường kính 38 mm\./);
  assert.doesNotMatch(message, /Số điện thoại:/);
  assert.doesNotMatch(message, /undefined|null/);
});

test("the copied request includes the normalized contact number when supplied", () => {
  assert.match(buildQuoteMessage({ ...request, phone: "+84 384 844 730" }), /Số điện thoại: 0384844730/);
});
