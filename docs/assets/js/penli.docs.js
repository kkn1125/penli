/**!
 * penli v0.1.3 (https://github.com/kkn1125/penli)
 * Copyright 2021 Authors (https://github.com/kkn1125/penli/graphs/contributors) kkn1125
 * Licensed under MIT (https://github.com/kkn1125/penli/blob/main/LICENSE)
 */

'use strict';

const version = {
    text: `<div class="blockquote blockquote-warning">
        vPlace입니다. 자세한 업데이트 내역은 <a href="https://github.com/kkn1125/penli#penli">링크</a>를 참조해주세요.
        </div>`,
    v012alpha: {
        css: `&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@vv012alpha/docs/assets/css/penli.css" integrity="sha384-W6LYuweECDLVttO+sXMbUrC08K4wipi2xew2tCg5oDtsCoYyGss+kGVFE/1YmR0e" crossorigin="anonymous">`,
        script: `&lt;script src="https://cdn.jsdelivr.net/gh/kkn1125/penli@vv012alpha/docs/assets/js/penli.js" integrity="sha384-v092hQzYiAjZ8CmLjYIvwr6bO3OnvXutDanly9WXVjX0TPLofgv01rcexjRXpdm2" crossorigin="anonymous"></script>`,
        choose: `&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@vv012alpha/docs/assets/css/penli.theme.css" integrity="sha384-ghvegK2uZphn4gtQdfs4LiVaMmsHSoA6Cg86qGwCaKAjhn+NBP2HjtPfww4OyOSn" crossorigin="anonymous">`,
    },
    v012: {
        css: `&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@vv012/docs/assets/css/penli.css" integrity="sha384-L7qT12zYsDBUiV+8U7uCJrpx3UT0wr4VxIAih486VTWTiHAOgFwk+7OnnYV++heZ" crossorigin="anonymous">`,
        script: `&lt;script src="https://cdn.jsdelivr.net/gh/kkn1125/penli@vv012/docs/assets/js/penli.js" integrity="sha384-BY7Ct7YPFeeCPykwI+FfZLBVK1ZJzAAX/INYUeCd3dAl/0+AA4l8mT92gJbpUHVr" crossorigin="anonymous"></script>`,
        choose: `&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@vv012/docs/assets/css/penli.theme.css" integrity="sha384-Jv/NT2IiEq6/L1Ga2uIHW98mjH9KTr9eue62F+o9ikMp4R1bY/7Btfm/wKmhOFHS" crossorigin="anonymous">`,
    },
    v011: {
        css: `&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@vv011/docs/assets/css/penli.css" integrity="sha384-7g0/efyrHKhHd4fpNcPfU698cG0Od+1MredmVZ2anqBQf/QA3gkvapp1CuOLARvY" crossorigin="anonymous">`,
        script: `&lt;script src="https://cdn.jsdelivr.net/gh/kkn1125/penli@vv011/docs/assets/js/penli.js" integrity="sha384-bOlrIoinKrqWcJ4ljPpn6qhrNhx9Yjs450HtZQSygtC/MFzf9I9uFxBPF9WUWXdm" crossorigin="anonymous"></script>`,
        choose: `&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@vv011/docs/assets/css/penli.theme.css" integrity="sha384-24AgJQuKIw8eeQ18Xoo+5gC5yMAXvpYZ6GSKxn6p66OEv05NM5NupqF3+H+9ki9k" crossorigin="anonymous">`,
    },
    v010: {
        css: `&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@v010/docs/assets/css/penli.css" integrity="sha384-fHGZz2rBr4tsAE8SKR5NEMRlpFwnFnWKuCneoloMjkMX1Vp9ze9mDotJRYW/V7pl" crossorigin="anonymous">`,
        script: `&lt;script src="https://cdn.jsdelivr.net/gh/kkn1125/penli@v010/docs/assets/js/penli.js" integrity="sha384-6GB9pDB7DxtD1CZ79tt+1TAP3tE1lKK7rl1LYIdPG+UQoM8hF9am8LyycPr3LEcY" crossorigin="anonymous"></script>`,
        choose: `&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kkn1125/penli@v010/docs/assets/css/penli.theme.css" integrity="sha384-nl6/Lh/Xw3rO6POLQG2zOMEfA1dT9CpyY5tSuYKwkiseQmpZqWzd/8ka8N8KSLOk" crossorigin="anonymous">`,
    }
};

const selVersion = document.getElementById('version');
const verText = document.getElementById('verText');
const vresult = document.getElementById('vresult');

window.addEventListener('load', loadHandler);

function loadHandler(){
    if(document.querySelectorAll('code[data-code]'))
    document.querySelectorAll('code[data-code]').forEach(createCodeBox);
    if(selVersion && verText)
    selVersion.addEventListener('change', createCodeWrap.bind(this, selVersion));
}

for(let ver in version){
    let option = document.createElement('option');
    if(ver.match(/v/gm)){
        option.innerHTML = ver.charAt(0)+ver.slice(1).replace(/[0-9]+/, x=>{
            return x.split('').join('.');
        });
    } else {
        continue;
    }
    option.value = ver;
    if(selVersion)
    selVersion.append(option);
}

if(selVersion && verText)
createCodeWrap(selVersion);

function createCodeWrap(vs){
    verText.innerHTML = '';
    verText.innerHTML = version['text'].replace('vPlace', vs.value.charAt(0)+vs.value.slice(1).replace(/[0-9]+/, x=>{
        return x.split('').join('.');
    }));
    vresult.innerHTML = '';
    for(let ver in version[vs.value]){
        let wrap = document.createElement('div');
        wrap.classList.add('code-wrap');
        
        let div = document.createElement('div');
        let ta = document.createElement('textarea');
        ta.value = version[vs.value][ver];
        div.classList.add('card','border','border-light');
        div.dataset.code="html";
        div.dataset.copyable="true";
        div.style.cssText = `--pl-code-type: "${div.dataset.code}"`;
        div.innerText = ta.value;
        div.innerText = ta.value.trim().replace('&lt;', '\<').replace('&gt;', '\>');
        wrap.append(div);
        vresult.innerHTML += wrap.outerHTML;
        window.addEventListener('click', copyHandler.bind(div, div.dataset.code));
    }
}

function createCodeBox(code){
    let lines = code.innerHTML.split('\n');
    lines.shift();
    let indent = 0;

    for(let line of lines[0].split('')){
        if(line==' '){
            indent++;
        } else {
            break;
        }
    }

    lines = lines.map(line=>{
        let regex = `\\s{${indent}}`;
        let lineAtStart = line.replace(new RegExp(regex,'g'), '');
        return lineAtStart;
    });

    let ta = document.createElement('textarea');
    ta.value = lines.join('\n');
    let changeTag = document.createElement('div');
    let attrs = code.getAttributeNames();
    attrs.forEach(attr=>{
        changeTag.setAttribute(attr, code.getAttribute(attr));
    });
    let type = changeTag.getAttribute('data-code');
    if(type=='') {
        changeTag.dataset.code = 'html';
        type = 'html';
    };
    changeTag.style.cssText = `--pl-code-type: "${type}"`;
    let copyType = type;
    changeTag.innerText = ta.value.trim().replace('&lt;', '\<').replace('&gt;', '\>');
    code.insertAdjacentElement('beforebegin', changeTag);
    code.remove();
    window.addEventListener('click', copyHandler.bind(changeTag, copyType));
}

function copyHandler(type, ev){
    let target = ev.target;
    if(!target.dataset.copyable || target.dataset.copyable !== 'true') return;
    if(target.dataset.copyable=='true'){
        let ta = document.createElement('textarea');
        ta.value = target.innerText;
        let text = ta.value.trim();
        navigator.clipboard.writeText(text);
        target.style.cssText = `--pl-code-type: "done"; border: 1px solid rgba(var(--pl-info-rgb-3), 1); background-color: rgba(var(--pl-info-rgb-5), .2);`;
        setTimeout(()=>{
            target.style.cssText = `--pl-code-type: "${type}";`;
        }, 3000);
    }
}