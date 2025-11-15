const dataStore = {
  sensorData: [],
  openaqData: [],
  tempoData: []
};

export function getSensorData() {
  return dataStore.sensorData;
}

export function setSensorData(data) {
  dataStore.sensorData = data;
}

export function getOpenaqData() {
  return dataStore.openaqData;
}

export function setOpenaqData(data) {
  dataStore.openaqData = data;
}

export function getTempoData() {
  return dataStore.tempoData;
}

export function setTempoData(data) {
  dataStore.tempoData = data;
}
