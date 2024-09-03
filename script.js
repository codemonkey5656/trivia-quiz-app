window.onload = sendApiRequest;

// An asynchronous function to fetch data from the API
async function sendApiRequest() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple');
    let data = await response.json();
    useApiData(data);
}

// Function to randomize the position of the correct answer and handle button clicks
function useApiData(data) {
    // Get references to the buttons
    const buttons = [
        document.querySelector("#answer1"),
        document.querySelector("#answer2"),
        document.querySelector("#answer3"),
        document.querySelector("#answer4")
    ];

    // Extract correct and incorrect answers
    const correctAnswer = data.results[0].correct_answer;
    const incorrectAnswers = data.results[0].incorrect_answers;

    // Combine all answers into one array and shuffle the array
    const allAnswers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    // Update the category, difficulty, and question
    document.querySelector("#category").innerHTML = `Category: ${data.results[0].category}`;
    document.querySelector("#difficulty").innerHTML = `Difficulty: ${data.results[0].difficulty}`;
    document.querySelector("#question").innerHTML = `Question: ${data.results[0].question}`;

    // Assign answers to buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = allAnswers[i];
        buttons[i].onclick = () => {
            if (allAnswers[i] === correctAnswer) {
                alert("Correct Answer!");
                sendApiRequest(); // Load the next question
            } else {
                alert("Sorry, wrong answer.");
            }
        };
    }
}
