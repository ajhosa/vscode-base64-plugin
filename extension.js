const vscode = require('vscode');
const { spawn } = require('child_process');

function activate(context) {
  function runBase64Command(args, inputText, callback) {
    const process = spawn('base64', args);
    const chunks = [];

    process.stdout.on('data', chunk => chunks.push(chunk));
    process.stderr.on('data', err => {
      vscode.window.showErrorMessage('base64 error: ' + err.toString());
    });

    process.on('close', code => {
      if (code !== 0) {
        vscode.window.showErrorMessage(`base64 process exited with code ${code}`);
        return;
      }
      const outputBuffer = Buffer.concat(chunks);
      const resultText = outputBuffer.toString('utf8').trim();
      callback(resultText);
    });

    process.stdin.write(inputText);
    process.stdin.end();
  }

  const encodeCommand = vscode.commands.registerCommand('extension.encodeBase64', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();
    runBase64Command([], text, resultText => {
      const fullRange = new vscode.Range(
        editor.document.positionAt(0),
        editor.document.positionAt(text.length)
      );
      const edit = new vscode.WorkspaceEdit();
      edit.replace(editor.document.uri, fullRange, resultText);
      vscode.workspace.applyEdit(edit);
    });
  });

  const decodeCommand = vscode.commands.registerCommand('extension.decodeBase64', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();
    runBase64Command(['-d'], text, resultText => {
      const fullRange = new vscode.Range(
        editor.document.positionAt(0),
        editor.document.positionAt(text.length)
      );
      const edit = new vscode.WorkspaceEdit();
      edit.replace(editor.document.uri, fullRange, resultText);
      vscode.workspace.applyEdit(edit);
    });
  });

  context.subscriptions.push(encodeCommand, decodeCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
