let editor;
let autoSuggest = true;

require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.34.1/min/vs' }});

require(['vs/editor/editor.main'], function() {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: 'console.log("Hello World");',
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
    fontSize: 14
  });
});

function changeLanguage() {
  const select = document.getElementById("language");
  const selectedOption = select.options[select.selectedIndex];
  const monacoLang = selectedOption.getAttribute("data-lang");

  monaco.editor.setModelLanguage(editor.getModel(), monacoLang);
}

function toggleSuggestions() {
  autoSuggest = !autoSuggest;

  editor.updateOptions({
    quickSuggestions: autoSuggest,
    suggestOnTriggerCharacters: autoSuggest
  });

  const statusText = document.getElementById("suggestStatus");
  const button = document.getElementById("suggestBtn");

  statusText.innerText = autoSuggest ? "ON" : "OFF";

  if (autoSuggest) {
    button.classList.remove("off");
  } else {
    button.classList.add("off");
  }
}

async function runCode() {
  const code = editor.getValue();
  const languageId = document.getElementById("language").value;
  const output = document.getElementById("output");

  output.innerText = "Running...";

  try {
    const response = await fetch("/api/compiler/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, languageId })
    });

    const data = await response.json();

    let result = "";

    if (data.compile_output) result = data.compile_output;
    else if (data.stderr) result = data.stderr;
    else if (data.stdout) result = data.stdout;
    else result = "No output";

    output.innerText = result;

  } catch (error) {
    console.error(error); 
    output.innerText = "Execution Error";
  }
}

function refreshAll() {
  editor.setValue('');
  document.getElementById("output").innerText = "";
}