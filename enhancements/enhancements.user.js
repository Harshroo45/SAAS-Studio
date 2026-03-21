// ==UserScript==
// @name         ERP Guide Enhancements
// @namespace    http://localhost/
// @version      1.0
// @description  Injects accessibility and small UI improvements without modifying original files.
// @match        file:///*ERP%20Guide/*
// @match        file:///*ERP Guide/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function injectStyles(css) {
        const s = document.createElement('style');
        s.textContent = css;
        document.head.appendChild(s);
    }

    const css = `
    .eg-skip-link{position:fixed;left:-999px;top:8px;padding:8px 12px;background:#000;color:#fff;z-index:9999}
    .eg-skip-link:focus{left:8px}
    .eg-back-to-top{position:fixed;right:16px;bottom:16px;padding:10px 12px;border-radius:6px;background:#111;color:#fff;border:none;cursor:pointer;z-index:9999}
    .eg-toggle{position:fixed;right:16px;bottom:72px;padding:8px 10px;border-radius:6px;background:#0078d4;color:#fff;border:none;cursor:pointer;z-index:9999}
    img{max-width:100%;height:auto}
    .eg-dark{background:#121212;color:#e6e6e6}
    .eg-dark a{color:#9fd1ff}
    @media print{.eg-back-to-top,.eg-toggle,.eg-skip-link{display:none}}
    `;

    function addSkipLink() {
        const a = document.createElement('a');
        a.href = '#eg-main';
        a.textContent = 'Skip to content';
        a.className = 'eg-skip-link';
        document.body.insertBefore(a, document.body.firstChild);
    }

    function addMainId() {
        const main = document.querySelector('main') || document.querySelector('[role\u003dmain]') || document.body;
        main.id = main.id || 'eg-main';
    }

    function addBackToTop() {
        const btn = document.createElement('button');
        btn.textContent = '↑ Top';
        btn.className = 'eg-back-to-top';
        btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
        document.body.appendChild(btn);
    }

    function addDarkToggle() {
        const btn = document.createElement('button');
        btn.textContent = 'Dark';
        btn.className = 'eg-toggle';
        btn.addEventListener('click', toggleDark);
        document.body.appendChild(btn);
    }

    function toggleDark() {
        document.documentElement.classList.toggle('eg-dark');
        const on = document.documentElement.classList.contains('eg-dark');
        if(on) localStorage.setItem('eg-dark','1'); else localStorage.removeItem('eg-dark');
    }

    function restoreDark() {
        if(localStorage.getItem('eg-dark')) document.documentElement.classList.add('eg-dark');
    }

    function enhanceLinks() {
        const anchors = Array.from(document.querySelectorAll('a[href]'));
        anchors.forEach(a => {
            try{
                const u = new URL(a.href, location.href);
                if(u.origin !== location.origin){
                    a.target = '_blank';
                    a.rel = (a.rel || '') + ' noopener noreferrer';
                }
            }catch(e){}
        });
    }

    function addKeyboardShortcuts() {
        window.addEventListener('keydown', (e) => {
            if(e.key === 'd' && !e.metaKey && !e.ctrlKey && !e.altKey){ toggleDark(); }
            if(e.key === 't' && !e.metaKey && !e.ctrlKey && !e.altKey){ window.scrollTo({top:0,behavior:'smooth'}); }
        });
    }

    function init() {
        injectStyles(css);
        addMainId();
        addSkipLink();
        addBackToTop();
        addDarkToggle();
        restoreDark();
        enhanceLinks();
        addKeyboardShortcuts();
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

})();
