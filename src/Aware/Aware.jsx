import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const CrimeMotives = () => {
  const [crimeData, setCrimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.data.gov.in/resource/295f4920-b804-4b5c-b756-38eec3c04294?api-key=579b464db66ec23bdd0000019f69eacb312246144ce77cb94798b0d7&format=xml",
          { method: "GET", headers: { Accept: "application/xml" } }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        const records = Array.from(xmlDoc.querySelectorAll("item")).map(
          (item) => {
            const record = {};
            item.querySelectorAll("*").forEach((field) => {
              record[field.tagName] = field.textContent;
            });
            return record;
          }
        );

        setCrimeData(records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Create a bar chart when crimeData is updated
    if (crimeData.length > 0) {
      const labels = crimeData.map((record) => record.state_ut);
      const data = crimeData.map((record) => parseFloat(record._total) || 0);

      const ctx = document.getElementById("crimeChart");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Crimes",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          indexAxis: "y",
          barPercentage: 1,
          categoryPercentage: 0.7,
        },
      });
    }
  }, [crimeData]);

  return (
    <div className=" max-w-[1100px] mx-auto">
      <h1>Cyber Crime Motives during 2019</h1>
      <canvas id="crimeChart" width="400" height="200"></canvas>

      <div>
        <h1>Reports</h1>
        <div>
          {" "}
          <center>
            <div id="return">
              <iframe
                title="Cyber Crimes | State wise"
                aria-label="chart"
                id="datawrapper-chart-lH36E"
                src="https://datawrapper.dwcdn.net/lH36E/1/"
                scrolling="no"
                frameBorder="0"
                className="w-0 min-w-[65%] border-none"
                height="400"
              ></iframe>
              <script type="text/javascript">
                {
                  !(function () {
                    "use strict";
                    window.addEventListener("message", function (a) {
                      if (void 0 !== a.data["datawrapper-height"])
                        for (var e in a.data["datawrapper-height"]) {
                          var t =
                            document.getElementById("datawrapper-chart-" + e) ||
                            document.querySelector('iframe[src*="' + e + '"]');
                          t &&
                            (t.style.height =
                              a.data["datawrapper-height"][e] + "px");
                        }
                    });
                  })()
                }
              </script>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default CrimeMotives;
