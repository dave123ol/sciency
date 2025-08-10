// Simple blog post loader
document.addEventListener("DOMContentLoaded", () => {
    const postList = document.getElementById("post-list");

    if (!postList) return; // No posts section on this page

    // For now, sample posts
    const posts = [
        {
            title: "The James Webb Telescope's Latest Discovery",
            date: "August 8, 2025",
            content: "Scientists have uncovered a previously unknown galaxy cluster 13 billion light-years away..."
        },
        {
            title: "The Rise of AI in Scientific Research",
            date: "August 5, 2025",
            content: "AI is revolutionizing data analysis and discovery in biology, physics, and space exploration..."
        },
        {
            title: "Climate Change and Ocean Currents",
            date: "August 1, 2025",
            content: "A new study shows how rising temperatures are slowing global ocean circulation..."
        }
    ];

    // Render posts
    posts.forEach(post => {
        const postEl = document.createElement("div");
        postEl.classList.add("post");
        postEl.innerHTML = `
            <h3>${post.title}</h3>
            <small>${post.date}</small>
            <p>${post.content}</p>
        `;
        postList.appendChild(postEl);
    });
});￼Enter
