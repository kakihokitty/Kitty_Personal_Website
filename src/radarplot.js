document.addEventListener("DOMContentLoaded", function() {
    const data3 = [
        { axis: "Strength", value: 0.8 },
        { axis: "Speed", value: 0.7 },
        { axis: "Agility", value: 0.6 },
        { axis: "Intelligence", value: 0.9 },
        { axis: "Charisma", value: 0.75 }
    ];

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#vis-radarchart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left + width / 2},${margin.top + height / 2})`);

    // Scale for the radar chart
    const scale = d3.scaleLinear()
        .domain([0, 1]) // Assuming values are between 0 and 1
        .range([0, radius]);

    // Function to convert polar coordinates to Cartesian coordinates
    function angleToCoordinate(angle, value) {
        let x = Math.cos(angle - Math.PI / 2) * scale(value);
        let y = Math.sin(angle - Math.PI / 2) * scale(value);
        return { x: width/2 + x, y: height/2 + y };
    }

    // Calculate angle for each axis
    const numAxes = data3.length;
    for (let i = 0; i < numAxes; i++) {
        let angle = (Math.PI * 2 / numAxes) * i;
        data3[i].angle = angle;
    }

    // Draw the axes
    for (let i = 0; i < numAxes; i++) {
        let angle = (Math.PI * 2 / numAxes) * i;
        let line_coordinate = angleToCoordinate(angle, 1);
        svg.append("line")
            .attr("x1", width/2)
            .attr("y1", height/2)
            .attr("x2", line_coordinate.x - margin.left)
            .attr("y2", line_coordinate.y - margin.top)
            .attr("stroke","black");

        svg.append("text")
            .attr("x", line_coordinate.x - margin.left*1.2)
            .attr("y", line_coordinate.y - margin.top*1.2)
            .text(data3[i].axis);
    }

    // Draw the radar chart
    let line = d3.line()
        .x(d => angleToCoordinate(d.angle, d.value).x - margin.left)
        .y(d => angleToCoordinate(d.angle, d.value).y - margin.top);

    svg.append("path")
        .datum(data3)
        .attr("d", line)
        .attr("fill", "skyblue")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("opacity", 0.5);
});