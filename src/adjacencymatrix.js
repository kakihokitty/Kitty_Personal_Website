(function(){
    // Your node-link diagram data
 const data = {
 nodes: [
 {
 id: "You",
 label: "You",
 group: "core"
 },
 {
 id: "Creative",
 label: "Creative",
 group: "personality"
 },
 {
 id: "DetailOriented",
 label: "Detail-Oriented",
 group: "personality"
 },
 {
 id: "ProblemSolver",
 label: "Problem Solver",
 group: "personality"
 },
 {
 id: "Communication",
 label: "Communication",
 group: "personality"
 },
 {
 id: "VideoEditing",
 label: "Video Editing",
 group: "editing"
 },
 {
 id: "AudioEditing",
 label: "Audio Editing",
 group: "editing"
 },
 {
 id: "ColorCorrection",
 label: "Color Correction",
 group: "editing"
 },
 {
 id: "Storytelling",
 label: "Storytelling",
 group: "editing"
 },
 {
 id: "MotionGraphics",
 label: "Motion Graphics",
 group: "editing"
 }
 ],
 links: [
 {
 source: "You",
 target: "Creative"
 },
 {
 source: "You",
 target: "DetailOriented"
 },
 {
 source: "You",
 target: "ProblemSolver"
 },
 {
 source: "You",
 target: "Communication"
 },
 {
 source: "You",
 target: "VideoEditing"
 },
 {
 source: "You",
 target: "AudioEditing"
 },
 {
 source: "VideoEditing",
 target: "ColorCorrection"
 },
 {
 source: "VideoEditing",
 target: "Storytelling"
 },
 {
 source: "VideoEditing",
 target: "MotionGraphics"
 },
 {
 source: "AudioEditing",
 target: "Storytelling"
 }
 ]
 };


 console.log("Data:", data); // Debugging: Check the data


 // Dimensions and margins
 const margin = {
 top: 80,
 right: 20,
 bottom: 20,
 left: 80
 };
 const cellSize = 30;
 const width = data.nodes.length * cellSize + margin.left + margin.right;
 const height = data.nodes.length * cellSize + margin.top + margin.bottom;


 console.log("SVG width:", width, "height:", height); // Debugging: Check dimensions


 // Create the adjacency matrix
 const adjacencyMatrix = createAdjacencyMatrix(data);


 console.log("Adjacency Matrix:", adjacencyMatrix); // Debugging: Check the matrix


 // Create scales
 const xScale = d3.scaleBand()
 .domain(data.nodes.map(d => d.id))
 .range([0, data.nodes.length * cellSize])
 .paddingInner(0.1);


 const yScale = d3.scaleBand()
 .domain(data.nodes.map(d => d.id))
 .range([0, data.nodes.length * cellSize])
 .paddingInner(0.1);


 console.log("xScale domain:", xScale.domain()); // Debugging: Check scale domains
 console.log("yScale domain:", yScale.domain());


 // Create the SVG container
 const svg = d3.select("#vis-adjacencymatrix")
 .append("svg")
 .attr("width", width)
 .attr("height", height);


 const matrix = svg.append("g")
 .attr("transform", `translate(${margin.left},${margin.top})`);


 // Create tooltip
 const tooltip = d3.select("body").append("div")
 .attr("class", "tooltip")
 .style("opacity", 0);


 // Draw the matrix cells
 matrix.selectAll(".matrix-cell")
 .data(adjacencyMatrix)
 .enter()
 .append("rect")
 .attr("class", "matrix-cell")
 .attr("x", d => xScale(d.target))
 .attr("y", d => yScale(d.source))
 .attr("width", xScale.bandwidth())
 .attr("height", yScale.bandwidth())
 .style("fill", d => d.value === 1 ? "steelblue" : "#fff")
 .on("mouseover", function(event, d) {
 tooltip.transition()
 .duration(200)
 .style("opacity", .9);
 tooltip.html(`${d.source} → ${d.target}`)
 .style("left", (event.pageX + 10) + "px")
 .style("top", (event.pageY - 28) + "px");
 })
 .on("mouseout", function(d) {
 tooltip.transition()
 .duration(500)
 .style("opacity", 0);
 });


 // Add row labels
 matrix.append("g")
 .attr("transform", "translate(-6,0)")
 .selectAll(".row-label")
 .data(data.nodes)
 .enter()
 .append("text")
 .attr("class", "matrix-label")
 .attr("x", -5)
 .attr("y", (d, i) => yScale(d.id) + yScale.bandwidth() / 2)
 .attr("dy", "0.32em")
 .attr("text-anchor", "end")
 .text(d => d.label);


 // Add column labels
 matrix.append("g")
 .attr("transform", "translate(0,-6)")
 .selectAll(".column-label")
 .data(data.nodes)
 .enter()
 .append("text")
 .attr("class", "matrix-label")
 .attr("transform", (d, i) => `translate(${xScale(d.id) + xScale.bandwidth() / 2}, -5) rotate(-90)`)
 .attr("text-anchor", "start")
 .text(d => d.label);


 // Function to create the adjacency matrix data structure
 function createAdjacencyMatrix(data) {
 const matrix = [];
 if (!data || !data.nodes || !data.links) {
 console.error("Invalid data format.  Data must have 'nodes' and 'links' properties.");
 return matrix; // Return an empty matrix
 }


 for (let i = 0; i < data.nodes.length; i++) {
 for (let j = 0; j < data.nodes.length; j++) {
 const source = data.nodes[i].id;
 const target = data.nodes[j].id;
 const value = data.links.find(link => link.source === source && link.target === target) ? 1 : 0;
 matrix.push({
 source: source,
 target: target,
 value: value
 });
 }
 }
 return matrix;
 }
  })();