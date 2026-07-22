import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the MONOFORM homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /<title>MONOFORM — Architecture &amp; Interiors<\/title>/i);
  assert.match(html, /Architecture shaped around life/);
  assert.match(html, /Forest Residence/);
  assert.match(html, /id="projects"/);
  assert.match(html, /id="case-study"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /name="name"/);
  assert.match(html, /name="contact"/);
  assert.match(html, /name="type"/);
  assert.match(html, /name="message"/);
  assert.match(html, /href="#projects"/);
  assert.match(html, /href="#contact"/);
  assert.match(html, /Перейти к содержанию/);
  assert.match(html, /\/projects\/house-on-the-ridge\/hero\.webp/);
  assert.doesNotMatch(html, /\/_vinext\/image/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});
