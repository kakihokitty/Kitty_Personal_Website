(function(){
  // Data representing the grid layout and population of US states (simplified)
  const stateData = [
  { "name": "ME", "row": 0, "col": 9, "population": 1.3 },
  { "name": "VT", "row": 0, "col": 8, "population": 0.6 },
  { "name": "NH", "row": 0, "col": 7, "population": 1.4 },
  { "name": "WA", "row": 0, "col": 0, "population": 7.7 },
  { "name": "ID", "row": 0, "col": 1, "population": 1.9 },
  { "name": "MT", "row": 0, "col": 2, "population": 1.1 },
  { "name": "ND", "row": 0, "col": 3, "population": 0.8 },
  { "name": "MN", "row": 0, "col": 4, "population": 5.7 },
  { "name": "WI", "row": 0, "col": 5, "population": 5.9 },
  { "name": "MI", "row": 0, "col": 6, "population": 10.0 },
  { "name": "OR", "row": 1, "col": 0, "population": 4.2 },
  { "name": "WY", "row": 1, "col": 2, "population": 0.6 },
  { "name": "SD", "row": 1, "col": 3, "population": 0.9 },
  { "name": "IA", "row": 1, "col": 4, "population": 3.2 },
  { "name": "IL", "row": 1, "col": 5, "population": 12.7 },
  { "name": "IN", "row": 1, "col": 6, "population": 6.8 },
  { "name": "OH", "row": 1, "col": 7, "population": 11.7 },
  { "name": "PA", "row": 1, "col": 8, "population": 13.0 },
  { "name": "NY", "row": 1, "col": 9, "population": 19.5 },
  { "name": "CA", "row": 2, "col": 0, "population": 39.2 },
  { "name": "NV", "row": 2, "col": 1, "population": 3.1 },
  { "name": "NE", "row": 2, "col": 3, "population": 1.9 },
  { "name": "MO", "row": 2, "col": 4, "population": 6.2 },
  { "name": "KY", "row": 2, "col": 6, "population": 4.5 },
  { "name": "WV", "row": 2, "col": 7, "population": 1.8 },
  { "name": "VA", "row": 2, "col": 8, "population": 8.6 },
  { "name": "NJ", "row": 2, "col": 9, "population": 9.3 },
  { "name": "UT", "row": 3, "col": 1, "population": 3.4 },
  { "name": "CO", "row": 3, "col": 2, "population": 5.8 },
  { "name": "KS", "row": 3, "col": 3, "population": 2.9 },
  { "name": "AR", "row": 3, "col": 4, "population": 3.0 },
  { "name": "TN", "row": 3, "col": 5, "population": 6.9 },
  { "name": "NC", "row": 3, "col": 7, "population": 10.4 },
  { "name": "MD", "row": 3, "col": 8, "population": 6.2 },
  { "name": "DE", "row": 3, "col": 9, "population": 1.0 },
  { "name": "AZ", "row": 4, "col": 1, "population": 7.3 },
  { "name": "NM", "row": 4, "col": 2, "population": 2.1 },
  { "name": "OK", "row": 4, "col": 3, "population": 4.0 },
  { "name": "LA", "row": 4, "col": 4, "population": 4.6 },
  { "name": "MS", "row": 4, "col": 5, "population": 3.0 },
  { "name": "AL", "row": 4, "col": 6, "population": 5.0 },
  { "name": "GA", "row": 4, "col": 7, "population": 10.7 },
  { "name": "SC", "row": 4, "col": 8, "population": 5.1 },
  { "name": "TX", "row": 5, "col": 3, "population": 30.0 },
  { "name": "AK", "row": 5, "col": 0, "population": 0.7 },
  { "name": "HI", "row": 5, "col": 9, "population": 1.4 },
  { "name": "FL", "row": 5, "col": 8, "population": 21.0 }
  ];
  // Grid dimensions
  const numCols = 10;
  const numRows = 6;
  // Cell size and margins
  const cellSize = 50;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = numCols * cellSize + margin.left + margin.right;
  const height = numRows * cellSize + margin.top + margin.bottom;
  // Color scale (adjust as needed)
  const colorScale = d3.scaleLinear()
  .domain([d3.min(stateData, d => d.population), d3.max(stateData, d => d.population)])
  .range(["#deebf7", "#3182bd"]);
  // Create SVG element
  const svg = d3.select("#vis-gridcartogram")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .call(d3.zoom()
  .scaleExtent([1, 8]) // Set zoom limits
  .on("zoom", zoomed));
  // Create a container for the chart elements to apply transformations
  const chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  // Create tooltip
  const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
  // Create grid cells
  const cells = chart.selectAll(".state-cell")
  .data(stateData)
  .enter().append("rect")
  .attr("class", "state-cell")
  .attr("x", d => d.col * cellSize)
  .attr("y", d => d.row * cellSize)
  .attr("width", cellSize)
  .attr("height", cellSize)
  .style("fill", d => colorScale(d.population))
  .on("mouseover", function (event, d) {
  tooltip.transition()
  .duration(200)
  .style("opacity", .9);
  tooltip.html(d.name + "<br/>Population: " + d.population + "M")
  .style("left", (event.pageX) + "px")
  .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function (d) {
  tooltip.transition()
  .duration(500)
  .style("opacity", 0);
  });
  // Add state labels
  const labels = chart.selectAll(".state-label")
  .data(stateData)
  .enter().append("text")
  .attr("class", "state-label")
  .attr("x", d => d.col * cellSize + cellSize / 2)
  .attr("y", d => d.row * cellSize + cellSize / 2)
  .text(d => d.name)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "middle");
  // Zoom and Pan Function
  function zoomed(event) {
  const transform = event.transform;
  // Apply transformation to the chart group
  chart.attr("transform", transform);
  // Optional: Constrain panning
  const x = transform.x;
  const y = transform.y;
  const k = transform.k;
  const maxX = -(width - margin.left - margin.right) * k;
  const maxY = -(height - margin.top - margin.bottom) * k;
  transform.x = Math.max(Math.min(x, 0), maxX);
  transform.y = Math.max(Math.min(y, 0), maxY);
  }
  })();
 