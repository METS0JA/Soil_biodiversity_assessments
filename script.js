// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    const demoButton = document.getElementById('demo-button');
    const demoOutput = document.getElementById('demo-output');
    
    // Add click event listener to the button
    demoButton.addEventListener('click', function() {
        // Update the output text
        demoOutput.textContent = 'Button clicked! JavaScript is working!';
        
        // Change some styling to demonstrate JS + CSS interaction
        demoOutput.style.color = '#3498db';
        
        // Add a simple animation
        setTimeout(function() {
            demoOutput.style.color = '#e74c3c';
        }, 500);
    });
    
    // Log a message to console
    console.log('Script loaded successfully!');
}); 