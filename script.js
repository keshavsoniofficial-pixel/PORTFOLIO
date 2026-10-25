console.log("JavaScript connected");

// Wait for DOM content to load safely
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const themeButton = document.getElementById("themeToggle");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const resultElement = document.getElementById("result");

    // Theme Toggle Functionality
    if (themeButton) {
        themeButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                themeButton.textContent = "Switch to Light Mode";
            } else {
                themeButton.textContent = "Switch to Dark Mode";
            }
        });
    }

    // Quiz Questions Data
    const questions = [
        {
            question: "What does a large language model actually predict?",
            options: [
                "The next token",
                "The entire paragraph",
                "The final answer",
                "The user's intention"
            ],
            answer: "The next token"
        },
        {
            question: "In the commit-message format used in this course, what comes before the colon?",
            options: [
                "The type, such as feat or fix",
                "The filename",
                "The programmer name",
                "The date"
            ],
            answer: "The type, such as feat or fix"
        },
        {
            question: "What must a unit test do before the bug is fixed?",
            options: [
                "Fail",
                "Pass",
                "Stop running",
                "Delete the code"
            ],
            answer: "Fail"
        },
        {
            question: "Where should the styling for a webpage live?",
            options: [
                "In a separate CSS file",
                "Inside Python",
                "Inside the browser console",
                "Inside a text file"
            ],
            answer: "In a separate CSS file"
        },
        {
            question: "What does a loop inside another loop usually mean for time complexity?",
            options: [
                "It is quadratic",
                "It is constant",
                "It is logarithmic",
                "It has no complexity"
            ],
            answer: "It is quadratic"
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    // Display Question and Options
    function showQuestion() {
        answered = false;
        if (resultElement) resultElement.textContent = "";

        const q = questions[currentQuestion];
        if (questionElement) questionElement.textContent = q.question;
        if (optionsElement) optionsElement.innerHTML = "";

        q.options.forEach(function (option) {
            const button = document.createElement("button");
            button.textContent = option;
            button.className = "option-btn";

            button.addEventListener("click", function () {
                checkAnswer(option, button);
            });

            if (optionsElement) optionsElement.appendChild(button);
        });
    }

    // Check Answer and Advance
    function checkAnswer(selectedOption, clickedButton) {
        if (answered) return;
        answered = true;

        const correctAnswer = questions[currentQuestion].answer;

        // Feedback styling (Optional CSS class support)
        if (selectedOption === correctAnswer) {
            score++;
            clickedButton.style.backgroundColor = "#4CAF50"; // Green for correct
            clickedButton.style.color = "#fff";
        } else {
            clickedButton.style.backgroundColor = "#f44336"; // Red for incorrect
            clickedButton.style.color = "#fff";
        }

        // Delay 1 second before showing next question so user sees feedback
        setTimeout(() => {
            currentQuestion++;

            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }, 1000);
    }

    // Display Final Score & Restart Option
    function showResults() {
        if (questionElement) questionElement.textContent = "Quiz Complete!";
        if (optionsElement) optionsElement.innerHTML = "";
        
        if (resultElement) {
            resultElement.textContent = `Your score is ${score} out of ${questions.length}`;
        }

        // Add a Restart Button
        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Restart Quiz";
        restartBtn.addEventListener("click", restartQuiz);
        if (optionsElement) optionsElement.appendChild(restartBtn);
    }

    // Restart Quiz
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        showQuestion();
    }

    // Start Quiz
    showQuestion();
});