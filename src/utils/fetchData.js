import axios from "axios";
import { SERVICE_URL } from "../config/constants";

// const Authorization = `fmetoken token=${process.env.FMETOKEN}`;

export async function fetchAddressReport(address, mslink) {
  const url = `${SERVICE_URL}/bylawMapByAddress.fmw`;
  const params = {
    address,
    MSLINK: mslink,
    DestDataset_GENERIC: "ZoningMap",
    opt_showresult: "false",
    opt_servicemode: "sync",
    opt_responseformat: "json",
  };

  const headers = {
    Authorization: `fmetoken token=${process.env.FMETOKEN}`,
  };

  const config = { params, headers };

  try {
    const { data } = await axios.get(url, config);
    console.log(data.serviceResponse.url);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTileReport(tileNumber) {
  const url = `${SERVICE_URL}/bylawMapByTile.fmw`;
  const params = {
    TILE: tileNumber,
    DestDataset_GENERIC: "ZoningMap",
    opt_showresult: "false",
    opt_servicemode: "sync",
    opt_responseformat: "json",
  };

  const headers = {
    Authorization: `fmetoken token=${process.env.FMETOKEN}`,
  };

  const config = { params, headers };

  try {
    console.log("Sending tile request...");
    const { data } = await axios.get(url, config);
    console.log(data.serviceResponse.url);
  } catch (error) {
    console.log(error);
  }
}
