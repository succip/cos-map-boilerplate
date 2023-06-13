import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import $ from "jquery";
import { START_POINT } from "./config/constants";

import "./styles/normalize.css";
import "./styles/style.css";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath(location.href);

const basemap = new Basemap({
  baseLayers: [
    new TileLayer({
      url: "https://gisservices.surrey.ca/arcgis/rest/services/Base_Map_All_Scales/MapServer",
    }),
    new TileLayer({
      url: "https://gisservices.surrey.ca/arcgis/rest/services/Addresses_Mobile_Black_Anno_Cache/MapServer",
    }),
  ],
});

const map = new Map({
  basemap,
});

const view = new MapView({
  map,
  container: "viewDiv",
  zoom: 1,
  center: START_POINT,
});

const lyrLots = new FeatureLayer({
  url: "https://gisservices.surrey.ca/arcgis/rest/services/Lots/MapServer",
  layerId: 7,
  outFields: ["MSLINK"],
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: [0, 0, 0, 0.1],
      outline: {
        width: 0.5,
        color: "black",
      },
    },
  },
});

const lyrMapIndex = new FeatureLayer({
  url: "https://gisservices.surrey.ca/arcgis/rest/services/Public/Miscellaneous/MapServer/12",
  outFields: ["MAP_NO"],
  title: "Map Tiles",
  labelingInfo: [
    {
      symbol: {
        type: "text",
        color: "black",
        font: { weight: "bold" },
        haloColor: "white",
        haloSize: "1px",
      },
      labelExpressionInfo: { expression: "$feature.MAP_NO" },
    },
  ],
});

map.add(lyrLots, lyrMapIndex);
