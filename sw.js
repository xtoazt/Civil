importScripts('/uv/misc/config.js');
importScripts('/uv/misc/worker.js');
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts(__uv$config.sw || '/uv/uv.sw.js');

const uv = new UVServiceWorker();
const dynamic = new Dynamic();

let userKey = new URL(location).searchParams.get('userkey');
self.dynamic = dynamic;

self.addEventListener('fetch', (e) => {
    e.respondWith(
        uv.fetch(e)
    );
});