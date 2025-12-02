document.getElementById('search-button').addEventListener('click', function() {
    const verseRef = document.getElementById('bible-input').value.trim();
    if (verseRef) {
        getBibleText(verseRef);
    } else {
        alert('Por favor ingresa una referencia válida.');
    }

});

async function getBibleText(verseRef) {
    const search_b = document.getElementById('search-button');
    const parts = verseRef.split(' ');
    if (parts.length < 2) {
        document.getElementById('bible-text').innerText = "Por favor, ingresa una referencia completa como 'Génesis 1:1-3'.";
        return;
    }
    const book = parts[0].toLowerCase(); // Asegúrate de que el nombre del libro esté en el formato correcto
    const chapterAndVerse = parts[1].split(':');
    if (chapterAndVerse.length < 2) {
        document.getElementById('bible-text').innerText = "Asegúrate de incluir el capítulo y versículos como '1:1-3'.";
        return;
    }
    const chapter = chapterAndVerse[0];
    const verses = chapterAndVerse[1];
    const url = `https://bible-api.deno.dev/api/read/rv1960/${book}/${chapter}/${verses}`;
    console.log(url); // Depuración para verificar la URL

    try {
        const response = await fetch(url);
        console.log(response); // Depurar la respuesta bruta
        const data = await response.json();
        console.log(data); // Depurar los datos JSON
        if (data && data.length > 0) {
            const text = data.map(verseObj => `${verseObj.number}. ${verseObj.verse}`).join('\n\n');
            document.getElementById('bible-text').innerText = ''; // Limpiar el texto anterior
            animateText(text, 0);
        } else {
            document.getElementById('bible-text').innerText = "Versículo no encontrado.";
        }
    } catch (error) {
        console.error(error); // Depurar errores
        document.getElementById('bible-text').innerText = "Error al cargar el versículo: " + error.message;
    }
}

function animateText(text, index) {
    const bibleTextElement = document.getElementById('bible-text');
    if (index < text.length) {
        bibleTextElement.innerHTML += text.charAt(index);
        setTimeout(function() {
            animateText(text, index + 1);
        }, 10);
    } else {
        // Mostrar el botón de limpiar una vez que termine la animación
        document.getElementById('clear-button').style.display = 'inline-block';
    }

}

// Función para limpiar el texto
document.getElementById('clear-button').addEventListener('click', function() {
    document.getElementById('bible-text').innerHTML = ''; // Limpiar el texto del contenedor
    this.style.display = 'none'; // Ocultar el botón nuevamente
});

window.addEventListener('keydown', function(event) {
    const verseRef = document.getElementById('bible-input').value.trim();
    if (verseRef) {
        getBibleText(verseRef);
    } else {
        //alert('Por favor ingresa una referencia válida.');
    }
});