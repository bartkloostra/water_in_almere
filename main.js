var mystyle = {
    "version": 8,
    "name": "mystyle",
    "glyphs": "https://ta.webmapper.nl/wm/glyphs/{fontstack}/{range}.pbf",
    "sources": {
      "cartiqo":{
        "type": "vector",
        "tiles":  [
            "https://ta.webmapper.nl/wm/cartiqo/{z}/{x}/{y}",
            "https://tb.webmapper.nl/wm/cartiqo/{z}/{x}/{y}",
            "https://tc.webmapper.nl/wm/cartiqo/{z}/{x}/{y}"
        ]
      }
    },
    "layers":[
      {
        "id":  "background",
        "type": "background",
        "paint": {
            "background-color":"#4c4945"
            }
      },

      {
          "id": "water",
          "source": "cartiqo",
          "source-layer": "water",
          "type": "fill",
          "paint": {
                "fill-color": "#a0c8f0"
          }
      },
      {
         "id": "place-labels",
         "type": "symbol",
         "source": "cartiqo",
         "source-layer": "labels",
         "filter":
            [
                "==",
                "type",
                "place"
            ],
         "minzoom": 8,
         "maxzoom": 16,
         "layout": {
            "text-allow-overlap": false,
            "text-padding": 1,
            "text-size": 16,
            "text-font":  ["Lato"],
            "text-field": "{name}",
         },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color":"#fff",
            "text-halo-width": 1,
            "text-halo-color": "#000000"
        }
      },

      {
        "id": "admin",
        "type": "line",
        "source": "cartiqo",
        "source-layer": "boundaries",
        "maxzoom": 22,
        "minzoom": 0,
        "filter": ["==", "type", "province"],
        "paint": {
            "line-color": "#000000",
            "line-width": 5
        }
      }
    ]
}


var map = new mapboxgl.Map({
    container: 'map',
    style: mystyle,
    hash: true,
    zoom: 11,
    pitch: 60,
    bearing: 62.4,
    center: [ 4.8, 52.4]
});

var mygeoJSON = {

    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "marker-color": "#7e7e7e",
          "marker-size": "medium",
          "marker-symbol": "",
          "name": "steiger"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            5.222336053848267,
            52.36776496064892
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "marker-color": "#7e7e7e",
          "marker-size": "medium",
          "marker-symbol": "",
          "name": "trailerhelling"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            5.225340127944946,
            52.373077444399854
          ]

        }
      },
      {
      "type": "Feature",
      "properties": {
        "name":"Odeonpark"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5.222818851470946,
              52.37561227619103
            ],
            [
              5.223548412322998,
              52.37398790460294
            ],
            [
              5.225243568420409,
              52.37331979894884
            ],
            [
              5.225436687469482,
              52.37282853834365
            ],
            [
              5.229835510253906,
              52.37351630166096
            ],
            [
              5.228612422943115,
              52.37626069816388
            ],
            [
              5.226874351501465,
              52.376136254281086
            ],
            [
              5.225265026092528,
              52.37600526034141
            ],
            [
              5.223698616027832,
              52.37580221896701
            ],
            [
              5.222818851470946,
              52.37561227619103
            ]
          ]
        ]
      }
    }

    ]
}

map.on('load', function (e) {
    // ADD GEOJSON SOURCE
    map.addSource('punten', {
        'type': 'geojson',
        'data': mygeoJSON
    });
    map.addLayer({
        'id': 'geojson-polygon',
        'type': 'fill',
        'filter':["==","name","Odeonpark"],
        'source': 'punten',
        'layout': {},
        'paint': {
            'fill-color': '#e27406'
        }
    });
    // ADD an extra layer
    map.addLayer({
        'id': 'geojson-points',
        'type': 'circle',
        'filter':["!=","name","Odeonpark"],
        'source': 'punten',
        'layout': {},
        'paint': {
            'circle-color': '#fff',
            'circle-radius': 10
        }
    });

    map.addLayer({
        'id': 'geojson-polygon',
        'type': 'fill',
        'filter':["==","name","Odeonpark"],
        'source': 'punten',
        'layout': {},
        'paint': {
            'fill-color': '#e27406'
        }
    });
});
