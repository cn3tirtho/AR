

window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';


    

    //let places = staticLoadPlaces();
    //renderPlaces(places);

    let places = staticConn3cted();

    renderPlaces2(places);


     setupBackButton();
};








function setupBackButton() {


    const backbutton = document.querySelector('button[data-action="backbutton"]');
    backbutton.innerText = ' < ';


    backbutton.addEventListener('click', function () {
           history.back();
    });
}


function staticConn3cted() {
    return [
        {
            name: 'Conn3cted',
            location: {
                lat: -33.8378912957752,
                lng: 151.2078403385177
            },
        }
    ];
}

function staticLoadPlaces() {
    return [
        {
            name: 'Conn3cted',
            location: {
                lat: -33.8378912957752,
                lng: 151.2078403385177
            },
        },
        {
            name: 'Keylink tech',
            location: {
                lat: -33.838798432380834, 
                lng: 151.20820227079722
            }
        },
        {
            name: '83 Mount St',
            location: {
                lat: -33.83912969742048, 
                lng: 151.2079620642977
            }
        },
    ];
}


var connectedModel = [
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.08 0.08 0.08',
        info: 'Custom Software Developers',
        rotation: '0 180 0',
    }
];

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);       
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};




function renderPlaces2(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {

        var latitude = place.location.lat;
        var longitude = place.location.lng;

         navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        
        });

        const name = document.querySelector('.place');
        name.innerText = place.name;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(connectedModel[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        
        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            
            entity.setAttribute('scale', '0.05 0.05 0.05');      


        });
        

        scene.appendChild(model);
    });
}










function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {

        let latitude = place.location.lat;
        let longitude = place.location.lng;

        const name = document.querySelector('.place');
        name.innerText = place.name;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}