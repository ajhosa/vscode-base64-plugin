# VSCODE - Base64 Plugin

Due to Sensitive Data: Online encoders cannot be used. Therefore a local encoder has to be used.
Sublime natively, does not come with base64, Notepad ++ only on windows, other thirdparty software, or plugins: We don't trust.

Base64 Encode / Decode Buttons in editor.
Uses MACOS base64 cli tool under the hood,
makes it lightweight.


## Requirements
Node.js 20

## Installation
Under github releases download the `base64-vscode-1.0.0.vsix`, <br>
In `VSCode > View > Extensions` Drag it in the extensions window. Automatically installs.

### Button Location - Top Right Corner
![Button Location](image.png)

## How to use?
1. File > New Text File
2. Click any of the buttons to decode/encode (No need to select text)

<br>

## Build Plugin urself
Clone repo
1. Install Vscode extension tool
```
npm install -g @vscode/vsce
```
2. Create vs code extension in current dir
```
vsce package
```

3. This creates a `base64-vscode-1.0.0.vsix` extension for vscode.

4. Install extension: Right click > Install Extension VSIX

5. (Optional Cleanup) Delete local repo and generated extension. Not needed anymore as its installed now.

 
 <br><br>


## Notes
launch.json used for development, F5 to preview changes.

### ❗Change Button visibility

Under `package.json` change:

Show only on unsaved scratchfile - **(Default)** <br>
```
"when": "resourceScheme == 'untitled'",
```

Show for current opened/focused file <br>
```
"when": "editorTextFocus",
```
To Always show - remove the "when" line.

 <br><br>

 ## 💻 Go full terminal only?

Go to frequently used folder

``cd ~``

### Create files

encode.sh
```
rm input
nano input
base64 < input > output
cat output | pbcopy
```
decode.sh
```
rm output
nano output
base64 -D < output > input
cat input | pbcopy
```

### To encode
1. `sh encode.sh`
2. Paste file in nano editor
3. Control + X
4. y
5. enter

Base64 data is automatically copied to your clipboard. <br>
Paste wherever you want.

Same with decode.sh

Warning: Pasting Large files to nano is slow, maybe use vim instead. Terminal appends new line after encoded string, so backspace it.


## Future Improvements

As of now the buttons cannot be added in the IDE main menu bar eg next to ` Window Help` but MS is working on it [here](https://github.com/microsoft/vscode/issues/211343)


Prevent double encode/decode by checking if current file content is encoded or decoded.

Possible Solutions: 
- Store a current copy of whole text or (some of it to reduce local cache size when large text exist). After a decode or encode check store the text. If encode/decode buttons are click check if current file content matches with stored, if so do not run. If different run. Simple solution but can still lead to double encode, as we dont check string is base64 encoded.
- Check via Typescript, or use thirparty plugins. Could lead to false positives.

base64 cli command does not have a way to check string is encoded/decoded

Further encoder/decoders can be added if needed. But may require thirdparty plugins or writing it urself.