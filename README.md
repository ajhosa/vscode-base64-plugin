# VSCODE - Base64 Plugin
Base64 Encode / Decode Buttons in editor.
Uses MACOS base64 cli tool under the hood.


### Requirements
Node.js 20

### Build extension

1. Install Vscode extension tool
```
npm install -g @vscode/vsce
```
2. Create vs code extension in current dir
```
vsce package
```

3. This creates a `base64-vscode-0.0.1.vsix` extension for vscode

4. Install extension

### Button Location - Top Right Corner
![Button Location](image.png)


### Instructions
Click any of the buttons to decode/encode, 
No need for text selection. 