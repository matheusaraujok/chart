async function newFile() {
    document.getElementById('textArea').value = '';
}

function openFile() {
    document.getElementById('fileInput').click();
}

function loadFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('textArea').value = e.target.result;
        };
        reader.readAsText(file);
    }
}

async function saveFile() {
    const text = document.getElementById('textArea').value;
    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'bloco_de_notas.txt',
            types: [{
                description: 'Text Files',
                accept: { 'text/plain': ['.txt'] }
            }]
        });
        const writable = await fileHandle.createWritable();
        await writable.write(text);
        await writable.close();
    } catch (err) {
        console.error('Error saving file:', err);
    }
}
