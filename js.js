document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const resultsContainer = document.getElementById('results');

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect() {
        const file = fileInput.files[0];

        if (file) {
            displayResults('Placeholder result: Skin condition detected.');

            resultsContainer.style.display = 'block';
        }
    }

    function displayResults(result) {
        resultsContainer.innerHTML = `<p>${result}</p>`;
    }
});
