
    (function(){
      const data = {
        nodes: [
          { id: "You", label: "Me", group: "core" },
          { id: "Creative", label: "Creative", group: "personality" },
          { id: "DetailOriented", label: "Detail-Oriented", group: "personality" },
          { id: "ProblemSolver", label: "Problem Solver", group: "personality" },
          { id: "Communication", label: "Communication", group: "personality" },
          { id: "VideoEditing", label: "Video Editing", group: "editing" },
          { id: "AudioEditing", label: "Audio Editing", group: "editing" },
          { id: "ColorCorrection", label: "Color Correction", group: "editing" },
          { id: "Storytelling", label: "Storytelling", group: "editing" },
          { id: "MotionGraphics", label: "Motion Graphics", group: "editing" }
        ],
        links: [
          { source: "You", target: "Creative" },
          { source: "You", target: "DetailOriented" },
          { source: "You", target: "ProblemSolver" },
          { source: "You", target: "Communication" },
          { source: "You", target: "VideoEditing" },
          { source: "You", target: "AudioEditing" },
          { source: "VideoEditing", target: "ColorCorrection" },
          { source: "VideoEditing", target: "Storytelling" },
          { source: "VideoEditing", target: "MotionGraphics" },
          { source: "AudioEditing", target: "Storytelling" }
        ]
      };

      const width = 800;
      const height = 600;

      const svg = d3.select("#vis-nodelink")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(data.links)
        .enter().append("line")
        .attr("class", "link");

      const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll(".node")
        .data(data.nodes)
        .enter().append("g")
        .attr("class", d => `node node--${d.group}`);

      node.append("circle")
        .attr("r", 25);

      node.append("text")
        .attr("dx", 30)
        .attr("dy", 5)
        .text(d => d.label);

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

      const colorScale = d3.scaleSequential(d3.interpolateViridis)
        .domain([0, 1]);

      function updateRelevance() {
        data.nodes.forEach(d => {
          let baseRelevance = Math.random() * 0.5 + 0.25;
          let fluctuation = Math.sin(Date.now() * 0.001 + Math.random() * 10) * 0.2;
          d.relevance = Math.max(0, Math.min(1, baseRelevance + fluctuation));
          
          // Introduce random movement based on relevance
          d.vx = Math.random() * 2 - 1; // Random x velocity
          d.vy = Math.random() * 2 - 1; // Random y velocity

          // Update position based on velocity
          d.x = (d.x || width / 2) + d.vx * d.relevance; // Scale movement by relevance
          d.y = (d.y || height / 2) + d.vy * d.relevance;
        });
      }

      function updateNodeColors() {
        node.select("circle")
          .style("fill", d => colorScale(d.relevance));
      }

      simulation.on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node
          .attr("transform", d => `translate(${d.x},${d.y})`);
      });

      updateRelevance();
      updateNodeColors();

      // Animation loop
      setInterval(() => {
        updateRelevance();
        updateNodeColors();
      }, 150);
    })();
