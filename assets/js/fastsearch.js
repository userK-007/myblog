import * as params from '@params';

let fuse;
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let first, last, current_elem = null;
let resultsAvailable = false;

window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data) {
                    let options = {
                        distance: 100,
                        threshold: 0.4,
                        ignoreLocation: true,
                        keys: ['title', 'summary', 'content']
                    };
                    if (params.fuseOpts) {
                        const k = params.fuseOpts.keys ?? ['title', 'summary', 'content'];
                        options = {
                            isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
                            includeScore: params.fuseOpts.includescore ?? false,
                            includeMatches: params.fuseOpts.includematches ?? false,
                            minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
                            shouldSort: params.fuseOpts.shouldsort ?? true,
                            findAllMatches: params.fuseOpts.findallmatches ?? false,
                            keys: Array.isArray(k) ? k.filter(key => key !== 'permalink') : ['title', 'summary', 'content'],
                            location: params.fuseOpts.location ?? 0,
                            threshold: params.fuseOpts.threshold ?? 0.4,
                            distance: params.fuseOpts.distance ?? 100,
                            ignoreLocation: params.fuseOpts.ignorelocation ?? true
                        };
                    }
                    fuse = new Fuse(data, options);
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', "../index.json");
    xhr.send();
};

function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach(function (el) { el.classList.remove('focus'); });
    if (ae) {
        ae.focus();
        document.activeElement = current_elem = ae;
        ae.parentElement.classList.add('focus');
    } else {
        document.activeElement.parentElement.classList.add('focus');
    }
}

function reset() {
    resultsAvailable = false;
    resList.innerHTML = sInput.value = '';
    sInput.focus();
}

sInput.onkeyup = function () {
    if (!fuse) return;
    let results = params.fuseOpts?.limit
        ? fuse.search(this.value.trim(), { limit: params.fuseOpts.limit })
        : fuse.search(this.value.trim());

    if (results.length !== 0) {
        const seen = new Set();
        let resultSet = '';
        for (let i = 0; i < results.length; i++) {
            const item = results[i].item;
            const permalink = item.permalink;
            if (seen.has(permalink)) continue;
            seen.add(permalink);
            resultSet += `<li class="post-entry"><header class="entry-header">${item.title}&nbsp;»</header>` +
                `<a href="${permalink}" aria-label="${item.title}"></a></li>`;
        }
        resList.innerHTML = resultSet;
        resultsAvailable = resList.children.length > 0;
        first = resList.firstChild;
        last = resList.lastChild;
    } else {
        resultsAvailable = false;
        resList.innerHTML = '';
    }
};

sInput.addEventListener('search', function () {
    if (!this.value) reset();
});

document.onkeydown = function (e) {
    let key = e.key;
    let ae = document.activeElement;
    let inbox = document.getElementById('searchbox').contains(ae);

    if (ae === sInput) {
        document.querySelectorAll('.focus').forEach(el => el.classList.remove('focus'));
    } else if (current_elem) ae = current_elem;

    if (key === 'Escape') {
        reset();
    } else if (!resultsAvailable || !inbox) {
        return;
    } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (ae == sInput) {
            activeToggle(resList.firstChild?.lastChild);
        } else if (ae.parentElement != last) {
            activeToggle(ae.parentElement.nextSibling?.lastChild);
        }
    } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (ae.parentElement == first) {
            activeToggle(sInput);
        } else if (ae != sInput) {
            activeToggle(ae.parentElement.previousSibling?.lastChild);
        }
    } else if (key === 'ArrowRight') {
        ae.click();
    }
};
