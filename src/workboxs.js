(function() {
    // Data for your work and videos
    const workData = [
        {
            title: "Project 1",
            description: "A brief description of Project 1.",
            youtubeId: "WhxcT7euQzQ", // Correct YouTube video ID
            imageUrl: "https://www.example.com/image1.jpg"  // Replace with your image URL
        },
        {
            title: "Project 2",
            description: "A brief description of Project 2.",
            youtubeId: "VIDEO_ID_2", // Replace with your YouTube video ID
            imageUrl: "https://www.example.com/image2.jpg"  // Replace with your image URL
        },
        {
            title: "Project 3",
            description: "A brief description of Project 3.",
            youtubeId: "VIDEO_ID_3", // Replace with your YouTube video ID
            imageUrl: "https://www.example.com/image3.jpg"  // Replace with your image URL
        }
        // Add more projects as needed
    ];

    // Function to create a work box
    function createWorkBox(data) {
        const box = document.createElement("div");
        box.classList.add("work-box"); // Add a class for styling

        const title = document.createElement("h3");
        title.textContent = data.title;
        box.appendChild(title);

        const description = document.createElement("p");
        description.textContent = data.description;
        box.appendChild(description);

        // Create image element
        const image = document.createElement("img");
        image.src = data.imageUrl;
        image.alt = data.title; // Descriptive alt text
        image.classList.add("work-image"); // Add a class for styling
        box.appendChild(image);

        // Create YouTube iframe if youtubeId exists
        if (data.youtubeId) {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${data.youtubeId}`;
            iframe.width = "560";  // Adjust as needed
            iframe.height = "315"; // Adjust as needed
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;
            iframe.classList.add("work-video"); // Add a class for styling
            box.appendChild(iframe);
        }

        return box;
    }

    // Get the container where you want to add the work boxes
    const workContainer = document.getElementById("vis-workbox"); // Ensure this ID exists in your HTML

    // Loop through the data and create a box for each item
    workData.forEach(item => {
        const workBox = createWorkBox(item);
        workContainer.appendChild(workBox);
    });
})();