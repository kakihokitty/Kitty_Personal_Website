 
        // Sample data - Replace with your actual data
        const data = [
            { year: 2018, type: "Painting", count: 5 },
            { year: 2018, type: "Sculpture", count: 2 },
            { year: 2018, type: "Digital Art", count: 8 },
            { year: 2019, type: "Painting", count: 7 },
            { year: 2019, type: "Sculpture", count: 3 },
            { year: 2019, type: "Digital Art", count: 5 },
            { year: 2020, type: "Painting", count: 3 },
            { year: 2020, type: "Sculpture", count: 1 },
            { year: 2020, type: "Digital Art", count: 12 },
            { year: 2021, type: "Painting", count: 9 },
            { year: 2021, type: "Sculpture", count: 4 },
            { year: 2021, type: "Digital Art", count: 7 },
            { year: 2022, type: "Painting", count: 6 },
            { year: 2022, type: "Sculpture", count: 2 },
            { year: 2022, type: "Digital Art", count: 9 },
            { year: 2023, type: "Painting", count: 4 },
            { year: 2023, type: "Sculpture", count: 5 },
            { year: 2023, type: "Digital Art", count: 6 },
            { year: 2023, type: "Photography", count: 7 }, // Add more data to demonstrate the problem
            { year: 2023, type: "Drawing", count: 8 },
            { year: 2023, type: "Mixed Media", count: 9 },
            { year: 2023, type: "Printmaking", count: 10 }
        ];

        // Aggregate data by year and type
        const aggregatedData = Array.from(d3.rollup(
            data,
            v => ({ count: d3.sum(v, d => d.count), types: v.map(d => d.type) }), // Store types for tooltip
            d => d.year,
            d => d.type
        ), ([year, typeMap]) => {
            return Array.from(typeMap, ([type, { count, types }]) => ({ year: +year, type: type, count: count, types: types }));
        }).flat();

        // Get unique years for x-axis
        const uniqueYears = [...new Set(data.map(d => d.year))].sort();

        // Set up dimensions and margins
        const margin = { top: 20, right: 20, bottom: 50, left: 120 }; // Increased left margin
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Create SVG element
        const svg = d3.select("#vis-scatterplot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Define scales
        const xScale = d3.scalePoint()
            .domain(uniqueYears)
            .range([0, width])
            .padding(0.5); // Adjust padding for spacing

        const yScale = d3.scaleBand()
            .domain(aggregatedData.map(d => d.type))
            .range([0, height])
            .padding(0.2);

        const sizeScale = d3.scaleLinear()
            .domain([0, d3.max(aggregatedData, d => d.count)])
            .range([5, 20]);

        // Create axes
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.format("d"));

        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis);

        svg.append("g")
            .call(yAxis)
            .selectAll(".tick text")
            .attr("class", "y-axis-label"); // Apply CSS class to y-axis labels

        // Add labels to axes
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 5)
            .style("text-anchor", "middle")
            .text("Year");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 15)
            .attr("x", -height / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Type of Work");

        // Create tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // Add circles
        svg.selectAll(".dot")
            .data(aggregatedData)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.type) + yScale.bandwidth() / 2)
            .attr("r", d => sizeScale(d.count))
            .attr("fill", "steelblue")
            .on("mouseover", function (event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`Year: ${d.year}<br>Type: ${d.type}<br>Count: ${d.count}`)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
                d3.select(this)
                    .style("stroke", "black")
                    .style("stroke-width", 2);
            })
            .on("mouseout", function (event, d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                d3.select(this)
                    .style("stroke", "#000")
                    .style("stroke-width", 0.5);
            });
