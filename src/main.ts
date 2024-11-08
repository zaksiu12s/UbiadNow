import './output.css';

const app = document.querySelector("[data-id='app']");
const temperatureDataTable = app?.querySelector("[data-id='temperatureData']");

async function main() {
  if (temperatureDataTable) {
    const allData = await getAllData();

    const temperatureData = allData.data.filter((data: any) => {
      if (data.metadata.dataType == "temperature") {
        return data;
      }
    })

    temperatureData.forEach((data: any) => {
      const value = data.value;
      const date = new Date(data.timestamp);

      const row = document.createElement("tr");

      const temperatureCol = document.createElement("td");
      temperatureCol.className = "px-10";
      const dateCol = document.createElement("td");

      temperatureCol.textContent = `${value}°C`;
      dateCol.textContent = date.toLocaleString();

      row.appendChild(temperatureCol);
      row.appendChild(dateCol);
      temperatureDataTable.appendChild(row);
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