import axios from "axios";

export async function fetchAddressReport(address, mslink) {
  const url = "https://gisdev.surrey.ca/fmedatadownload/BylawMapService/bylawMapByAddress.fmw";
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

  const config = {
    params,
    headers,
  };

  try {
    console.log("Sending request...");
    const { data } = await axios.get(url, config);
    console.log(data.serviceResponse.url);
  } catch (error) {
    console.log(error);
  }
}
