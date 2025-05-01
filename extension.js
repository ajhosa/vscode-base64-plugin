const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
  const encodeCommand = vscode.commands.registerCommand('extension.encodeBase64', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();

    const process = exec('base64');
    let encoded = '';
    process.stdout.on('data', data => encoded += data);
    process.stderr.on('data', err => vscode.window.showErrorMessage(err));
    process.on('close', () => {
      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(
        editor.document.positionAt(0),
        editor.document.positionAt(text.length)
      );
      edit.replace(editor.document.uri, fullRange, encoded);
      vscode.workspace.applyEdit(edit);
    });
    process.stdin.write(text);
    process.stdin.end();
  });

  const decodeCommand = vscode.commands.registerCommand('extension.decodeBase64', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();

    const process = exec('base64 -d');
    let decoded = '';
    process.stdout.on('data', data => decoded += data);
    process.stderr.on('data', err => vscode.window.showErrorMessage(err));
    process.on('close', () => {
      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(
        editor.document.positionAt(0),
        editor.document.positionAt(text.length)
      );
      edit.replace(editor.document.uri, fullRange, decoded);
      vscode.workspace.applyEdit(edit);
    });
    process.stdin.write(text);
    process.stdin.end();
  });

  context.subscriptions.push(encodeCommand, decodeCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
