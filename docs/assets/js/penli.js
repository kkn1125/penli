/**!
 * penli v0.1.3 (https://github.com/kkn1125/penli)
 * Copyright 2021 Authors (https://github.com/kkn1125/penli/graphs/contributors) kkn1125
 * Licensed under MIT (https://github.com/kkn1125/penli/blob/main/LICENSE)
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

setTimeout(()=>{
    settingHandler();
}, 500);

function settingHandler() {
    let target = document.querySelectorAll('.side-bar');
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

    document.documentElement.lang = navigator.language.split('-').shift();
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
