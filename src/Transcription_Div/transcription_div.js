import React, { StrictMode, useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Papa from "papaparse";

ModuleRegistry.registerModules([AllCommunityModule]);

// Create new GridExample component
const GridExample = ({ currentTime }) => {
    const gridApi = useRef(null);
    const gridColumnApi = useRef(null);

    const [rowData, setRowData] = useState([]);
    const colDefs = [
        { headerName: "Time Stamp", field: "Time Stamp", width: 115 },
        {
          headerName: "Transcript",
          field: "Transcript",
          width: 440,
          cellStyle: {
            whiteSpace: 'normal',  // Allows text to wrap
            wordBreak: 'break-word' // Breaks long words to avoid overflow
          }
        }
      ];

    useEffect(() => {
        // Simulate passing of time (every second)
        scrollToRow(currentTime)
      }, [currentTime]);


    useEffect(() => {
        fetch("dis2025-AdaptiveRevision/Transcript.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json(); // Parse JSON data
          })
          .then((jsonData) => {
            setRowData(jsonData); // Update state with JSON data
          })
          .catch((error) => {
            console.error("Error fetching JSON:", error);
          });
      }, []);

    const scrollToRow = (time) => {
        // Find the row index based on time (assuming each "Time Stamp" is unique)
        const rowIndex = rowData.findIndex(row => row["Time Stamp"] === formatTime(time));

        if (rowIndex !== -1 && gridApi.current) {
          gridApi.current.ensureIndexVisible(rowIndex); // Scroll the row into view
        }
      };


      // Helper function to format time in a "00:00" format for matching
    const formatTime = (timeInMs) => {
      const timeInSeconds = Math.floor(timeInMs); // Convert milliseconds to seconds
      const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0'); // Get minutes
      const seconds = (timeInSeconds % 60).toString().padStart(2, '0'); // Get remaining seconds
      return `${minutes}:${seconds}`;
    };


    const onGridReady = (params) => {
        gridApi.current = params.api;
        gridColumnApi.current = params.columnApi;

        // Auto-size columns based on content width
        gridApi.current.sizeColumnsToFit();
      };

    return (
        <div className="ag-theme-alpine" style={{ width: "100%", height: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            onGridReady={onGridReady}
            getRowHeight={() => 350} // Set an appropriate height for rows if needed
          />
        </div>
    );
};

export default GridExample;