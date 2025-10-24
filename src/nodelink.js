   (function(){
    const data = {
 nodes: [
 {
 id: "You",
 label: "Me",
 group: "core"
 }, // Central node representing you
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


 // Dimensions for the SVG container
 const width = 800; // Increased width for more space
 const height = 600; // Increased height for more space


 // Create an SVG container inside the section with id 'scatterplot'
 const svg = d3.select("#vis-nodelink")
 .append("svg")
 .attr("width", width)
 .attr("height", height);


 // Create a force simulation
 const simulation = d3.forceSimulation(data.nodes)
 .force("link", d3.forceLink(data.links).id(d => d.id).distance(150)) // Increased distance
 .force("charge", d3.forceManyBody().strength(-300)) // Increased strength
 .force("center", d3.forceCenter(width / 2, height / 2));


 // Create links
 const link = svg.append("g")
 .attr("class", "links")
 .selectAll("line")
 .data(data.links)
 .enter().append("line")
 .attr("class", "link");


 // Create nodes
 const node = svg.append("g")
 .attr("class", "nodes")
 .selectAll(".node")
 .data(data.nodes)
 .enter().append("g")
 .attr("class", d => `node node--${d.group}`); // Add class based on group


 node.append("circle")
 .attr("r", 25); // Increased radius


 node.append("text")
 .attr("dx", 30) // Increased offset
 .attr("dy", 5) // Adjusted offset
 .text(d => d.label);


 // Add drag functionality
 const drag = simulation => {


 function dragstarted(event) {
 if (!event.active) simulation.alphaTarget(0.3).restart();
 event.subject.fx = event.subject.x;
 event.subject.fy = event.subject.y;
 }


 function dragged(event) {
 event.subject.fx = event.x;
 event.subject.fy = event.y;
 }


 function dragended(event) {
 if (!event.active) simulation.alphaTarget(0);
 event.subject.fx = null;
 event.subject.fy = null;
 }


 return d3.drag()
 .on("start", dragstarted)
 .on("drag", dragged)
 .on("end", dragended);
 }


 node.call(drag(simulation));


 // Update positions every tick
 simulation.on("tick", () => {
 link
 .attr("x1", d => d.source.x)
 .attr("y1", d => d.source.y)
 .attr("x2", d => d.target.x)
 .attr("y2", d => d.target.y);


 node
 .attr("transform", d => `translate(${d.x},${d.y})`);
 });
 })();