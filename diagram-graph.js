reearth.ui.show(`
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap');

  html,
  body {
    margin: 0;
    width: 160px;
    overflow: hidden;
  }

  #wrapper {
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 12px;
    border-radius: 4px;
  }

  input {
    border: none;
    width: 180px;
    height: 20px;
    color: #141414;
    background-color: #BFBFBF;
    margin-bottom: 10px;
  }

  input::placeholder {
    font-size: 12px;
    padding-left: 4px;
  }

  label {
    display: inline-block;
    width: 55px;
  }

  #start-btn {
    padding: 4px 24px;
    display: block;
    width: 140px;
    font-weight: 500;
    color: #ffffff;
    background-color: #dd00ff;
  }
</style>

<div id="wrapper">
  <button id="start-btn" class=""> START </button>
</div>

<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src='https://unpkg.com/@turf/turf@6/turf.min.js'></script>
<script>
  let layerId;
  let reearth, cesium, property, layers;
  let newProperty;
  let resultLang = 'en';
  let newDate = new Date();
  let i = 0;

  function timeSet(item) {
    let result = new Date(item + item.getTimezoneOffset())
    return result.toJSON();
  }


  const btn = document.getElementById("start-btn");

  let DataFile = [];

  window.addEventListener("message", async function (e) {
    if (e.source !== parent) return;
    reearth = e.source.reearth;
    layers = reearth.layers.layers;
    cesium = reearth.Cesium;
    newProperty = e.data.property;

    // getting data from widget to create list uploaded images to change markers
    if (JSON.stringify(property) != JSON.stringify(newProperty)) {
      property = newProperty;
      let file = property.default.url;
      console.log("1 file: ", file);
      readCSV(file)
      .then(data => {
        data.map((element) => {
          DataFile.location = element.CityName;
          const { CityName, Value, Lat, Lng, ...rest } = element;
          console.log(rest);

          let time =  Object.keys(rest);
          console.log("data key: ", time);

          for (const [key, value] of Object.entries(rest)) {
            console.log(key, value);
            DataFile.Value = value;
          }
          
          // change logic and create as many objects in DataFile as number of rest elements

          // let values = Object.values(rest);
          // console.log("data values: ", values);
        });

        console.log("DataFile: ", DataFile);
      })
    }
  });


  async function readCSV(filePath) {
    try {
      const data = await d3.csv(filePath);
      return data;
      // Process the data here
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // btn.addEventListener('click', function searchByLocationName() {

  // console.log("2 DataFile: ", DataFile);
  // DataFile.map((element) => {
  //   i++
  //   if (element.hasOwnProperty("location")) {
  //   let addressElm = element.location;
  //   let keyword = addressElm.replace(/ |,/g, '+');
  //   let params = "?q=" + keyword + "&addressdetails=1&format=geojson" + '&accept-language=' + resultLang
  //   let apiUrl = "https://nominatim.openstreetmap.org/search" + params + "&polygon_geojson=0"
  //   let getCentroidPoint = "https://nominatim.openstreetmap.org/search" + params + "&polygon_geojson=0"

  //   // console.log("getCentroidPoint", getCentroidPoint);

  //   fetch(getCentroidPoint).then(response => {
  //     if (response.ok) {
  //       response.json().then(data => {
  //         // console.log("data: ", data);
  //         data.features.map(obj => {
  //           if (obj.properties.category === "boundary") {
  //             element.placeId = obj.properties["place_id"];
  //             element.centroid = obj.geometry.coordinates;
  //           }
  //         })
  //         setCZML(element);
  //       })
  //     } else {
  //       throw new Error(response.statusText);
  //     }
  //   })
  // } else {
  //   setCZML(element);
  // }
  // })

  // });

  // let czml = [{
  //   id: "document",
  //   name: "CZML Geolocation Diagram",
  //   version: "1.0",
  //   clock: {
  //     interval: "2023-11-25T00:00:00Z/" + newDate.toJSON(),
  //     currentTime: "2023-11-24T00:00:00Z",
  //     multiplier: 2400,
  //   },
  // },]

  // function setCZML(element) {
  //   console.log("element in setCZML: ", element);
  //   let Lat;
  //   let Lng
  //   if (element.hasOwnProperty("location")) {
  //     Lat = element.centroid[0];
  //     Lng = element.centroid[1];
  //   } else {
  //     Lat = element.lat;
  //     Lng = element.lng;
  //   }

  //   let Height;
  //   let Value = (element.value) * 10;
  //   let placeId = element.placeId;
  //   let timeFromValue = element.timeFrom;
  //   let timeToValue = element.timeTo;
  //   let timeFrom = new Date(timeFromValue);
  //   let timeTo = new Date(timeToValue);
  //   let redId = "red_" + i;
  //   let greenId = "green_" + i;
  //   let blueId = "blue_" + i;
  //   // console.log("FROM :", timeSet(timeFrom));
  //   // console.log("TO: ", timeSet(timeTo));

  //   // value small
  //   if (Value <= 3000) {
  //     czml.push({
  //       id: greenId,
  //       name: "Green cylinder",
  //       availability: timeSet(timeFrom) + "/" + timeSet(timeTo),
  //       position: {
  //         cartographicDegrees: [Lat, Lng, 0],
  //       },
  //       cylinder: {
  //         length: Value,
  //         topRadius: 2000,
  //         bottomRadius: 2000,
  //         material: {
  //           solidColor: {
  //             color: {
  //               rgba: [0, 255, 0, 255],
  //             },
  //           },
  //         },
  //         outline: false,
  //       },
  //     },
  //     )
  //   }

  //   // value middle
  //   if ((Value > 3000) && (Value <= 5000)) {
  //     let cylinderLength = Value - 3000;
  //     Height = (3000 + cylinderLength) / 2;
  //     czml.push({
  //       id: greenId,
  //       name: "Green cylinder",
  //       availability: timeSet(timeFrom) + "/" + timeSet(timeTo),
  //       position: {
  //         cartographicDegrees: [Lat, Lng, 0],
  //       },
  //       cylinder: {
  //         length: 3000,
  //         topRadius: 2000,
  //         bottomRadius: 2000,
  //         material: {
  //           solidColor: {
  //             color: {
  //               rgba: [0, 255, 0, 255],
  //             },
  //           },
  //         },
  //         outline: false,
  //       },
  //     },
  //       {
  //         id: redId,
  //         name: "Red cylinder",
  //         availability: timeSet(timeFrom) + "/" + timeSet(timeTo),
  //         position: {
  //           cartographicDegrees: [Lat, Lng, Height],
  //         },
  //         cylinder: {
  //           length: cylinderLength,
  //           topRadius: 2000,
  //           bottomRadius: 2000,
  //           material: {
  //             solidColor: {
  //               color: {
  //                 rgba: [255, 0, 0, 255],
  //               },
  //             },
  //           },
  //           outline: false,
  //         },
  //       },
  //     )
  //   }

  //   // //  value height
  //   if (Value > 5000) {
  //     let cylinderLength = Value - 3000;
  //     Height = (3000 + cylinderLength) / 2;
  //     let cylinderLength2 = Value - cylinderLength;
  //     let Height2 = 3000 + cylinderLength;
  //     czml.push({
  //       id: greenId,
  //       name: "Green cylinder",
  //       availability: timeSet(timeFrom) + "/" + timeSet(timeTo),
  //       position: {
  //         cartographicDegrees: [Lat, Lng, 0],
  //       },
  //       cylinder: {
  //         length: 3000,
  //         topRadius: 2000,
  //         bottomRadius: 2000,
  //         material: {
  //           solidColor: {
  //             color: {
  //               rgba: [0, 255, 0, 255],
  //             },
  //           },
  //         },
  //         outline: false,
  //       },
  //     },
  //       {
  //         id: redId,
  //         name: "Red cylinder",
  //         availability: timeSet(timeFrom) + "/" + timeSet(timeTo),
  //         position: {
  //           cartographicDegrees: [Lat, Lng, Height],
  //         },
  //         cylinder: {
  //           length: cylinderLength,
  //           topRadius: 2000,
  //           bottomRadius: 2000,
  //           material: {
  //             solidColor: {
  //               color: {
  //                 rgba: [255, 0, 0, 255],
  //               },
  //             },
  //           },
  //           outline: false,
  //         },
  //       },
  //       {
  //         id: blueId,
  //         name: "Blue cylinder",
  //         availability: timeSet(timeFrom) + "/" + timeSet(timeTo),
  //         position: {
  //           cartographicDegrees: [Lat, Lng, Height2],
  //         },
  //         cylinder: {
  //           length: cylinderLength2,
  //           topRadius: 2000,
  //           bottomRadius: 2000,
  //           material: {
  //             solidColor: {
  //               color: {
  //                 rgba: [0, 0, 255, 255],
  //               },
  //             },
  //           },
  //           outline: false,
  //         },
  //       },
  //     )
  //   }

  //   // console.log("czml object: ", czml);


  //   layerId = reearth.layers.add({
  //     extensionId: "resource",
  //     isVisible: true,
  //     title: 'CZML',
  //     property: {
  //       default: {
  //         url: czml,
  //         type: "czml",
  //         clampToGround: true
  //       },
  //     },
  //   });

  //   reearth.camera.flyTo({
  //     lng: Lat,
  //     lat: Lng,
  //     height: 10000,
  //   }, {
  //     duration: 2
  //   });

  // }

</script>
`);

reearth.on("update", send);
send();

function send() {
reearth.ui.postMessage({
property: reearth.widget.property,
layer: reearth.layers.layers
})
}