// bookmarks.js
const bookmarks = [
    { display: "Bookmark 1", item: "javascript:alert('This is Bookmark 1');" },
    { display: "Bookmark 2", item: "javascript:console.log('This is Bookmark 2');" },
    // Add more bookmarks here
];

// Export to make it accessible on the page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = bookmarks;
}
