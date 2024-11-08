import './output.css';

const app = document.querySelector("[data-id='app']");
const temperatureDataDiv = app?.querySelector("[data-id='temperatureData']");

async function main() {
  if (temperatureDataDiv) {
    const allData = await getAllData();

    const temperatureData = allData.data.filter((data: any) => {
      if (data.metadata.dataType == "temperature") {
        return data;
      }
    })

    temperatureData.forEach((data: any) => {
      const value = data.value;
      const date = new Date(data.timestamp);

      const element = document.createElement("div");
      element.textContent = `Temperature: ${value}°C, Date: ${date.toLocaleString()}`;
      temperatureDataDiv.appendChild(element);
    });
  }
}

main();

async function getAllData() {
  try {
    const response = await fetch('https://metrics.ubiad.pl/v1.0/measurements');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}