const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
    'The only way to do great work is to love what you do.',
    'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'The future belongs to those who believe in the beauty of their dreams.',
    'It does not matter how slowly you go as long as you do not stop.',
    'The only limit to our realization of tomorrow will be our doubts of today.',
    'You have within you right now, everything you need to deal with whatever the world can throw at you.'
];


let words = [];
let wordIndex = 0;
let mistakes = 0; // New variable to count mistakes

let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

let totalWordsTyped = 0;
let totalMistakes = 0; // New variable to track total mistakes

document.getElementById('start').addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];

    words = quote.split(' ');
    wordIndex = 0;
    totalWordsTyped = 0;
    mistakes = 0; // Reset mistakes when starting a new game
    totalMistakes = 0; // Reset totalMistakes when starting a new game

    const spanWords = words.map(function (word) {
        return `<span>${word} </span>`;
    });

    quoteElement.innerHTML = spanWords.join('');

    quoteElement.childNodes.className = 'highlight';

    messageElement.innerText = '';

    typedValueElement.value = '';

    typedValueElement.focus();

    startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = (new Date().getTime() - startTime) / 1000;
        const speed = calculateSpeed(totalWordsTyped, elapsedTime);
        const message = `CONGRATULATIONS! You finished in ${elapsedTime.toFixed(2)} seconds. Your speed: ${speed.toFixed(2)} WPM. Total mistakes: ${totalMistakes}`;
        messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        totalWordsTyped++;

        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }

        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = '';
    } else {
        typedValueElement.className = 'error';
        mistakes++;
    }
});

function calculateSpeed(totalWords, elapsedTime) {
    const wordsPerMinute = (totalWords / elapsedTime) * 60;
    totalMistakes += mistakes; // Update totalMistakes
    return wordsPerMinute;
}
