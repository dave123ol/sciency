const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Folder where Netlify CMS stores blog posts
const postsDir = path.join(__dirname, '_posts');

// Output JSON file
const outputFile = path.join(postsDir, 'posts.json');

let posts = [];

fs.readdirSync(postsDir).forEach(file => {
    if (file.endsWith('.md')) {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        posts.push({
            title: data.title || 'Untitled Post',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || content.substring(0, 120) + '...',
            url: file.replace('.md', '.html')
        });
    }
});

// Sort posts by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Save as JSON
fs.writeFileSync(outputFile, JSON.stringify({ posts }, null, 2));

console.log(`✅ Generated ${posts.length} posts into posts.json`);
