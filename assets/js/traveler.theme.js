/**!
 * withMe v0.1.0 (https://github.com/ohoraming/withMe)
 * Copyright 2021 Authors (https://github.com/ohoraming/withMe/graphs/contributors) kkn1125, ohoraming
 * Licensed under MIT (https://github.com/ohoraming/withMe/blob/main/LICENSE)
 */

const KEY = 'Gt5Gap%2FfosnAgnq2TqWCo8Jz1N8Gz%2ByDLIKAYJ1Yi%2ByBzDaA88sc6y7NLfblGtfhLkN4htmTfErFloQxDoFsxQ%3D%3D';
let pageNo = 0;
const URL = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${KEY}&pageNo=${pageNo}&numOfRows=100&type=json`;

// fetchData(URL);

function fetchData(url, callback) {
    //fetch를 활용한 allOrigins방식 사용
    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (response.ok) return response.text(); //.json(), .blob()사용가능
            throw new Error('Network response was not ok.')
        }).then((data) => {
            callback(data, res);
        });
}

const WithMe = (function(){
    function Controller(){
        let moduleModel = null;
        let uiElem = null;
        this.init = function(model, ui){
            console.log(1)
        }
    }

    function Model(){
        let moduleView = null;

        this.init = function(view){

        }
    }

    function View(){
        let uiElem = null;

        this.init = function(ui){

        }
    }

    return {
        init: function(){
            const head = document.head;
            const body = document.body;

            const ui = {
                head,
                body,
            }
            
            const controller = new Controller();
            const model = new Model();
            const view = new View();

            view.init(ui);
            model.init(view);
            controller.init(model);

            this.setInitMethods.call(this);
            Object.definePropery(this, 'init', '')
        },
        setInitMethods: function(){
            this.list = function(){
                console.log(123)
            }
        }
    }
})();

const withMe = WithMe.init();