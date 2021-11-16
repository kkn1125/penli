/**!
 * withMe v0.1.0 (https://github.com/ohoraming/withMe)
 * Copyright 2021 Authors (https://github.com/ohoraming/withMe/graphs/contributors) kkn1125, ohoraming
 * Licensed under MIT (https://github.com/ohoraming/withMe/blob/main/LICENSE)
 */

'use strict';

const lsb = document.querySelector('#lsb');
const rsb = document.querySelector('#rsb');
const gnbInner = document.querySelector('.gnb-inner');
const menuBtns = document.querySelectorAll('.menu-btn');
const sides = [...document.querySelectorAll('[data-target]')];

// left-side-bar handler
window.addEventListener('load', settingHandler);
window.addEventListener('click', sideMenuHandler);

for(let btn of menuBtns){
    btn.querySelector('button[data-target]').addEventListener('click', menuBtnHandler);
}

function menuBtnHandler(ev){
    let target = ev.target;
    if(target.dataset && target.dataset.target){
        if(gnbInner.classList.contains('show')) {
            gnbInner.classList.add('hide');
            gnbInner.classList.remove('show');
        } else if(gnbInner.classList.contains('hide')){
            gnbInner.classList.remove('hide');
            gnbInner.classList.add('show');
        }
    }
}

function sideMenuHandler(ev) {
    let target = ev.target;
    let found = sides.indexOf(target);

    if(!target.closest('[data-side-bar]') && !target.dataset.target){
        sides.forEach(side=>{
            let all = side.dataset.target.slice(1);
            document.getElementById(all).classList.remove('show');
            document.getElementById(all).classList.add('hide');
        });
    }

    if(found==-1 || !document.getElementById(sides[found].dataset.target.slice(1)).classList.contains('built-in')) return;

    let targetSide = document.getElementById(sides[found].dataset.target.slice(1));
    if(targetSide.classList.contains('show')){
        targetSide.classList.remove('show');
        targetSide.classList.add('hide');
    } else if(targetSide.classList.contains('hide')){
        targetSide.classList.remove('hide');
        targetSide.classList.add('show');
    }
}

function settingHandler() {
    let target = document.querySelectorAll('.side-bar');
    let changeTag = null;
    let ta = null;
    let copyType = '';
    if(!target) return;
    for(let t of target){
        t.querySelector('[class*=position-]').style.top = `${t.getBoundingClientRect().top}px`;
    }

    document.querySelectorAll('[data-msg]').forEach(msg=>{
        let type = msg.dataset.popType;
        let message = msg.dataset[type];
        let st = document.createElement('style');
        msg.addEventListener('mouseenter', popEnterHandler.bind(msg, message, st));
        msg.addEventListener('mouseleave', popLeaveHandler.bind(msg, st));
    });

    document.querySelectorAll('[data-code]').forEach(code=>{
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

        ta = document.createElement('textarea');
        ta.value = lines.join('\n');
        changeTag = document.createElement('div');
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
        copyType = type;
        changeTag.innerText = ta.value.trim();
        code.insertAdjacentElement('beforebegin', changeTag);
        code.remove();
    });
    window.addEventListener('click', copyHandler.bind(changeTag, ta, copyType));
}

function copyHandler(ta, type, ev){
    let target = ev.target;
    if(!target.dataset.copyable || target.dataset.copyable !== 'true') return;
    if(target.dataset.copyable=='true'){
        let text = ta.value.trim();
        navigator.clipboard.writeText(text);
        target.style.cssText = `--pl-code-type: "done"; border: 1px solid rgba(var(--pl-info-rgb-3), 1); background-color: rgba(var(--pl-info-rgb-5), .2);`;
        setTimeout(()=>{
            target.style.cssText = `--pl-code-type: "${type}";`;
        }, 3000);
    }
}

function popEnterHandler(msg, st, ev){
    st.innerHTML = `
        [data-pop-type="msg"]{
            --pop-msg: "${msg}";
        }
    `;
    document.head.append(st);
}
function popLeaveHandler(st, ev){
    st.remove();
}