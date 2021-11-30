const api = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"

const markerList = {
    markers: [],
    viewer: null,
 

    load: function (viewer) {
        this.viewer = viewer;
        this.request();
    },

    request: async function () {
        const response = await fetch(api);
        const result = await response.json();
        this.markers = result.features;
        this.markers.forEach(marker => {
            this.addToViewer(marker);
        });
    },

    addToViewer: function (marker) {
        return this.viewer.entities.add({
            id: marker.id,
            name: marker.properties.title,
            position: Cesium.Cartesian3.fromDegrees(marker.geometry.coordinates[0], marker.geometry.coordinates[1]),
            description: marker.properties.place,
            point: {
                pixelSize: 5,
                color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
            },
            label: {
                text: ""+marker.properties.mag,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                pixelOffset: new Cesium.Cartesian2(0.0, -30),
                scale: 0.75,
                fillColor: Cesium.Color.YELLOW,
                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
                    1.5e2,
                    3.0,
                    1.5e7,
                    0.5
                ),
            }
        })
    }
}