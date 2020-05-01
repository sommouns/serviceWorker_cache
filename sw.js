this.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll(['./demo.json']);
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log('缓存匹配到res:', response);
                return response;
            }
            console.log('缓存未匹配对应request,准备从network获取', caches);
            return fetch(event.request)
        })
    );
});
