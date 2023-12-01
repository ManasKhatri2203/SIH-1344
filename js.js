document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const resultsContainer = document.getElementById('results');

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect() {
        const file = fileInput.files[0];

        if (file) {
            // You can add image processing and AI model integration here
            // For now, display a placeholder result
            displayResults('Placeholder result: Skin condition detected.');

            // Show the results container
            resultsContainer.style.display = 'block';
        }
    }

    function displayResults(result) {
        resultsContainer.innerHTML = `<p>${result}</p>`;
    }
});
