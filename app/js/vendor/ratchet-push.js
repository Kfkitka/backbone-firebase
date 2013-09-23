/* ----------------------------------
 * PUSH v1.0.0
 * Licensed under The MIT License
 * inspired by chris's jquery.pjax.js
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

/*global define, module, ender*/

/**
 * I am just experimenting here,
 * I could not get Ratchet components to load otherwise.
 */

define('RatchetPush', [],
    function() {
        var RatchetPush = RatchetPush || function () {
            var noop = function () {};
            var isScrolling;
            var maxCacheLength = 20;
            var cacheMapping   = sessionStorage;
            var domCache       = {};
            var transitionMap  = {
                'slide-in'  : 'slide-out',
                'slide-out' : 'slide-in',
                'fade'      : 'fade'
            };

            var bars = {
                bartab             : '.bar-tab',
                bartitle           : '.bar-title',
                barfooter          : '.bar-footer',
                barheadersecondary : '.bar-header-secondary'
            };

            this.cacheReplace = function (data, updates) {
                this.PUSH.id = data.id;
                if (updates) data = this.getCached(data.id);
                cacheMapping[data.id] = JSON.stringify(data);
                window.history.replaceState(data.id, data.title, data.url);
                domCache[data.id] = document.body.cloneNode(true);
            };

            this.cachePush = function () {
                var id = this.PUSH.id;

                var cacheForwardStack = JSON.parse(cacheMapping.cacheForwardStack || '[]');
                var cacheBackStack    = JSON.parse(cacheMapping.cacheBackStack    || '[]');

                cacheBackStack.push(id);

                while (cacheForwardStack.length)               delete cacheMapping[cacheForwardStack.shift()];
                while (cacheBackStack.length > maxCacheLength) delete cacheMapping[cacheBackStack.shift()];

                window.history.pushState(null, '', cacheMapping[this.PUSH.id].url);

                cacheMapping.cacheForwardStack = JSON.stringify(cacheForwardStack);
                cacheMapping.cacheBackStack    = JSON.stringify(cacheBackStack);
            };

            this.cachePop = function (id, direction) {
                var forward           = direction == 'forward';
                var cacheForwardStack = JSON.parse(cacheMapping.cacheForwardStack || '[]');
                var cacheBackStack    = JSON.parse(cacheMapping.cacheBackStack    || '[]');
                var pushStack         = forward ? cacheBackStack    : cacheForwardStack;
                var popStack          = forward ? cacheForwardStack : cacheBackStack;

                if (this.PUSH.id) pushStack.push(this.PUSH.id);
                popStack.pop();

                cacheMapping.cacheForwardStack = JSON.stringify(cacheForwardStack);
                cacheMapping.cacheBackStack    = JSON.stringify(cacheBackStack);
            };

            this.getCached = function (id) {
                return JSON.parse(cacheMapping[id] || null) || {};
            };

            this.getTarget = function (e) {
                var target = this.findTarget(e.target);

                if (
                    !  target
                        || e.which > 1
                        || e.metaKey
                        || e.ctrlKey
                        || isScrolling
                        || location.protocol !== target.protocol
                        || location.host     !== target.host
                        || !target.hash && /#/.test(target.href)
                        || target.hash && target.href.replace(target.hash, '') === location.href.replace(location.hash, '')
                        || target.getAttribute('data-ignore') == 'push'
                    ) return;

                return target;
            };


            // Main event handlers (this.touchend, popstate)
            // ==========================================

            this.touchend = function (e) {
                var target = this.getTarget(e);

                if (!target) return;

                e.preventDefault();

                this.PUSH({
                    url        : target.href,
                    hash       : target.hash,
                    timeout    : target.getAttribute('data-timeout'),
                    transition : target.getAttribute('data-transition')
                });
            };

            this.popstate = function (e) {
                var key;
                var barElement;
                var activeObj;
                var activeDom;
                var direction;
                var transition;
                var transitionFrom;
                var transitionFromObj;
                var id = e.state;

                if (!id || !cacheMapping[id]) return;

                direction = this.PUSH.id < id ? 'forward' : 'back';

                this.cachePop(id, direction);

                activeObj = this.getCached(id);
                activeDom = domCache[id];

                if (activeObj.title) document.title = activeObj.title;

                if (direction == 'back') {
                    transitionFrom    = JSON.parse(direction == 'back' ? cacheMapping.cacheForwardStack : cacheMapping.cacheBackStack);
                    transitionFromObj = this.getCached(transitionFrom[transitionFrom.length - 1]);
                } else {
                    transitionFromObj = activeObj;
                }

                if (direction == 'back' && !transitionFromObj.id) return this.PUSH.id = id;

                transition = direction == 'back' ? transitionMap[transitionFromObj.transition] : transitionFromObj.transition;

                if (!activeDom) {
                    return this.PUSH({
                        id         : activeObj.id,
                        url        : activeObj.url,
                        title      : activeObj.title,
                        timeout    : activeObj.timeout,
                        transition : transition,
                        ignorePush : true
                    });
                }

                if (transitionFromObj.transition) {
                    activeObj = this.extendWithDom(activeObj, '.content', activeDom.cloneNode(true));
                    for (key in bars) {
                        barElement = document.querySelector(bars[key])
                        if (activeObj[key]) this.swapContent(activeObj[key], barElement);
                        else if (barElement) barElement.parentNode.removeChild(barElement);
                    }
                }

                this.swapContent(
                    (activeObj.contents || activeDom).cloneNode(true),
                    document.querySelector('.content'),
                    transition
                );

                this.PUSH.id = id;

                document.body.offsetHeight; // force reflow to prevent scroll
            };

    // Core PUSH functionality
            // =======================

            this.PUSH = function (options) {
                var key;
                var data = {};
                var xhr  = this.PUSH.xhr;
                var self = this;

                options.container = options.container || options.transition ? document.querySelector('.content') : document.body;

                for (key in bars) {
                    options[key] = options[key] || document.querySelector(bars[key]);
                }

                if (xhr && xhr.readyState < 4) {q
                    xhr.onreadystatechange = noop;
                    xhr.abort()
                }

                xhr = new XMLHttpRequest();
                xhr.open('GET', options.url, true);
                xhr.setRequestHeader('X-PUSH', 'true');

                xhr.onreadystatechange = function () {
                    if (options._timeout) clearTimeout(options._timeout);
                    if (xhr.readyState == 4) xhr.status == 200 ? self.success(xhr, options) : failure(options.url);
                };

                if (!this.PUSH.id) {
                    this.cacheReplace({
                        id         : +new Date,
                        url        : window.location.href,
                        title      : document.title,
                        timeout    : options.timeout,
                        transition : null
                    });
                }

                if (options.timeout) {
                    options._timeout = setTimeout(function () {  xhr.abort('timeout'); }, options.timeout);
                }

                xhr.send();

                if (xhr.readyState && !options.ignorePush) this.cachePush();
            };

    // Main XHR handlers
            // =================

            this.success = function (xhr, options) {
                var key;
                var barElement;
                var data = this.parseXHR(xhr, options);

                if (!data.contents) return this.locationReplace(options.url);

                if (data.title) document.title = data.title;

                if (options.transition) {
                    for (key in bars) {
                        barElement = document.querySelector(bars[key])
                        if (data[key]) this.swapContent(data[key], barElement);
                        else if (barElement) barElement.parentNode.removeChild(barElement);
                    }
                }

                this.swapContent(data.contents, options.container, options.transition, function () {
                    this.cacheReplace({
                        id         : options.id || +new Date,
                        url        : data.url,
                        title      : data.title,
                        timeout    : options.timeout,
                        transition : options.transition
                    }, options.id);
                    this.triggerStateChange();
                });

                if (!options.ignorePush && window._gaq) _gaq.push(['_trackPageview']) // google analytics
                if (!options.hash) return;
            };

            var failure = function (url) {
                throw new Error('Could not get: ' + url)
            };


            // PUSH helpers
            // ============

            this.swapContent = function (swap, container, transition, complete) {
                var enter;
                var containerDirection;
                var swapDirection;

                if (!transition) {
                    if (container) container.innerHTML = swap.innerHTML;
                    else if (swap.classList.contains('content')) document.body.appendChild(swap);
                    else document.body.insertBefore(swap, document.querySelector('.content'));
                } else {
                    enter  = /in$/.test(transition);

                    if (transition == 'fade') {
                        container.classList.add('in');
                        container.classList.add('fade');
                        swap.classList.add('fade');
                    }

                    if (/slide/.test(transition)) {
                        swap.classList.add(enter ? 'right' : 'left');
                        swap.classList.add('slide');
                        container.classList.add('slide');
                    }

                    container.parentNode.insertBefore(swap, container);
                }

                if (!transition) complete && complete();

                if (transition == 'fade') {
                    container.offsetWidth; // force reflow
                    container.classList.remove('in');
                    container.addEventListener('webkitTransitionEnd', fadeContainerEnd);

                    function fadeContainerEnd() {
                        container.removeEventListener('webkitTransitionEnd', fadeContainerEnd);
                        swap.classList.add('in');
                        swap.addEventListener('webkitTransitionEnd', fadeSwapEnd);
                    }
                    function fadeSwapEnd () {
                        swap.removeEventListener('webkitTransitionEnd', fadeSwapEnd);
                        container.parentNode.removeChild(container);
                        swap.classList.remove('fade');
                        swap.classList.remove('in');
                        complete && complete();
                    }
                }

                if (/slide/.test(transition)) {
                    container.offsetWidth; // force reflow
                    swapDirection      = enter ? 'right' : 'left'
                    containerDirection = enter ? 'left' : 'right'
                    container.classList.add(containerDirection);
                    swap.classList.remove(swapDirection);
                    swap.addEventListener('webkitTransitionEnd', slideEnd);

                    function slideEnd() {
                        swap.removeEventListener('webkitTransitionEnd', slideEnd);
                        swap.classList.remove('slide');
                        swap.classList.remove(swapDirection);
                        container.parentNode.removeChild(container);
                        complete && complete();
                    }
                }
            };

            this.triggerStateChange = function () {
                var e = new CustomEvent('push', {
                    detail: { state: this.getCached(PUSH.id) },
                    bubbles: true,
                    cancelable: true
                });

                window.dispatchEvent(e);
            };

            this.findTarget = function (target) {
                var i, toggles = document.querySelectorAll('a');
                for (; target && target !== document; target = target.parentNode) {
                    for (i = toggles.length; i--;) { if (toggles[i] === target) return target; }
                }
            };

            this.locationReplace = function (url) {
                window.history.replaceState(null, '', '#');
                window.location.replace(url);
            };

            this.parseURL = function (url) {
                var a = document.createElement('a'); a.href = url; return a;
            };

            this.extendWithDom = function (obj, fragment, dom) {
                var i;
                var result    = {};

                for (i in obj) result[i] = obj[i];

                Object.keys(bars).forEach(function (key) {
                    var el = dom.querySelector(bars[key]);
                    if (el) el.parentNode.removeChild(el);
                    result[key] = el;
                });

                result.contents = dom.querySelector(fragment);

                return result;
            };

            this.parseXHR = function (xhr, options) {
                var head;
                var body;
                var data = {};
                var responseText = xhr.responseText;

                data.url = options.url;

                if (!responseText) return data;

                if (/<html/i.test(responseText)) {
                    head           = document.createElement('div');
                    body           = document.createElement('div');
                    head.innerHTML = responseText.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
                    body.innerHTML = responseText.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]
                } else {
                    head           = body = document.createElement('div');
                    head.innerHTML = responseText;
                }

                data.title = head.querySelector('title');
                data.title = data.title && data.title.innerText && data.title.innerText.trim();

                if (options.transition) data = this.extendWithDom(data, '.content', body);
                else data.contents = body;

                return data;
            };
        }

        return RatchetPush;
    }
);