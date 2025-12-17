function displayHiddenMessage() {
    document.body.innerHTML = 
    '<div><p class="final_answer">Looks like you have found it.</p>';
    document.body.innerHTML += '<br>';
    document.body.innerHTML +=
    '<h1 style="color:red">CTF{Bra0_Kr41ju}</h1></div>'
}

function testInput() {
    const secretCode = 'hidden'
    const userInput = document.getElementById('codeInput');
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const input = userInput.value;
            if (input === secretCode) displayHiddenMessage();
            else alert('Wrong answer, try again.');
        }
    });
}

testInput();