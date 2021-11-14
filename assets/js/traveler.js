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
    if (target.dataset.target && target.dataset.target.slice(1) == lsb.id) {
        ev.preventDefault();
        if (rsb.classList.contains('show')) {
            rsb.classList.remove('show');
            rsb.classList.add('hide');
            document.querySelector('[data-target="#rsb"]').innerHTML = `<i class="fas fa-bars"></i>`;
        }
        leftSideBarHandler.call(target);
    } else if (target.dataset.target && target.dataset.target.slice(1) == rsb.id) {
        ev.preventDefault();
        if (lsb.classList.contains('show')) {
            lsb.classList.remove('show');
            lsb.classList.add('hide');
            document.querySelector('[data-target="#lsb"]').innerHTML = `<i class="fas fa-bars"></i>`;
        }
        rightSideBarHandler.call(target);
    } else if(!target.offsetParent || target.offsetParent.className !== 'position-sticky' && target.offsetParent.id != lsb.id && target.offsetParent.id != rsb.id) {
        ev.preventDefault();
        lsb.classList.remove('show');
        lsb.classList.add('hide');
        rsb.classList.remove('show');
        rsb.classList.add('hide');
        document.querySelector('[data-target="#lsb"]').innerHTML = `<i class="fas fa-bars"></i>`;
        document.querySelector('[data-target="#rsb"]').innerHTML = `<i class="fas fa-bars"></i>`;
    }
}

function settingHandler() {
    let target = document.querySelectorAll('.side-bar');
    if(!target) return;
    for(let t of target){
        t.querySelector('[class*=position-]').style.top = `${t.getBoundingClientRect().top}px`;
    }

    document.querySelectorAll('[data-msg]').forEach(msg=>{
        let type = msg.dataset.popType;
        let message = msg.dataset[type];
        msg.addEventListener('mouseenter', popEnterHandler.bind(msg, message, type));
        msg.addEventListener('mouseleave', popLeaveHandler.bind(msg));
    });
}

function popEnterHandler(msg, type, ev){
    let dir = this.dataset[`${type}Dir`];
    let pop = document.createElement('span');
    pop.classList.add('pop-msg',`pop-msg-${dir}`);
    pop.innerHTML = msg;
    pop.style.position = 'absolute';
    this.style.position = 'relative';
    this.insertAdjacentElement('afterBegin', pop);
}
function popLeaveHandler(){
    if(this) this.lastElementChild.remove();
}

function leftSideBarHandler() {
    if (lsb.classList.contains('hide')) {
        lsb.classList.remove('hide');
        lsb.classList.add('show');
        this.innerHTML = `<i class="fas fa-times"></i>`;
    } else if (lsb.classList.contains('show')) {
        lsb.classList.remove('show');
        lsb.classList.add('hide');
        this.innerHTML = `<i class="fas fa-bars"></i>`;
    }
}

function rightSideBarHandler() {
    if (rsb.classList.contains('hide')) {
        rsb.classList.remove('hide');
        rsb.classList.add('show');
        this.innerHTML = `<i class="fas fa-times"></i>`;
    } else if (rsb.classList.contains('show')) {
        rsb.classList.remove('show');
        rsb.classList.add('hide');
        this.innerHTML = `<i class="fas fa-bars"></i>`;
    }
}
// left-side-bar handler