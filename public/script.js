$(document).ready(function() {
    $('#generate').click(function() {
        const exampleText = $('#example-text').val().trim();
        console.log("Sending exampleText:", exampleText);

        $.ajax({
            url: '/generate-text',
            method: 'POST',
            contentType: 'application/json', // Set the content type to JSON
            data: JSON.stringify({ exampleText }), // Stringify your data
            success: function(data) {
                $('#output').text(data.generatedText);
            },
            error: function(xhr, status, error) {
                console.log("Error: ", error);
            }
        });
    });
});
