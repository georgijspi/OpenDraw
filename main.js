document.addEventListener('DOMContentLoaded', function() {
    // Define the OpenAI API configuration
    // Replace 'YOUR_API_KEY' with your actual OpenAI API key
    const openai = new OpenAIApi({
        apiKey: "YOUR_API_KEY"
    });

    // Get UI elements
    const btnThreejs = document.getElementById('btn-threejs');
    const btnP5js = document.getElementById('btn-p5js');
    const btnPlainJs = document.getElementById('btn-plain-js');
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt-input');
    const graphicsOutput = document.getElementById('graphics-output');
    let selectedFramework = 'threejs'; // default selection

    // Framework selection handlers
    btnThreejs.onclick = () => { selectedFramework = 'threejs'; };
    btnP5js.onclick = () => { selectedFramework = 'p5js'; };
    btnPlainJs.onclick = () => { selectedFramework = 'plain-js'; };

    // Generate button handler
    generateBtn.onclick = () => {
        const userPrompt = promptInput.value;
        const fullPrompt = `Generate code using ${selectedFramework} to draw ${userPrompt}`;
        
        // Call AI API here with fullPrompt
        callAIAPIToGenerateCode(fullPrompt);
    };

    function callAIAPIToGenerateCode(prompt) {
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150
        }).then(response => {
            const apiResponseCode = response.choices[0].text.trim();
            executeGeneratedCode(apiResponseCode);
        }).catch(error => {
            console.error('Error with OpenAI API:', error);
        });
    }

    function executeGeneratedCode(code) {
        try {
            // Clear previous output
            graphicsOutput.innerHTML = '';

            // Create a new script element
            const script = document.createElement('script');
            script.textContent = code;
            graphicsOutput.appendChild(script);
        } catch (error) {
            console.error('Error executing generated code:', error);
        }
    }
});
