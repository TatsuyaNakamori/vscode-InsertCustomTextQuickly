import * as vscode from 'vscode';
import * as i18n from './i18n';


export class InsertCustomText {
    public commandDisposable: vscode.Disposable;
    public commandName: string;
    public labelID: string;
    public confID: string;

    constructor(context: vscode.ExtensionContext, commandName: string, labelID: string, confID: string) {
        this.commandName = commandName;
        this.labelID = labelID;
        this.confID = confID;

        // registerCommand
        this.commandDisposable = vscode.commands.registerCommand(commandName, () => {
            const value = vscode.workspace.getConfiguration().get(this.confID);
            const message = i18n.localize(labelID)
            vscode.window.showInformationMessage(message + value);
        });
        context.subscriptions.push(this.commandDisposable);

        // onDidChangeConfiguration
        const onDidChangeConfig = vscode.workspace.onDidChangeConfiguration((e) => {
            vscode.window.showInformationMessage("===changeConfigEvent===");
            console.log("===changeConfigEvent===" + this.confID);
            console.log(e.affectsConfiguration(this.confID));

            if (e.affectsConfiguration(this.confID)) {
                let insertText = vscode.workspace.getConfiguration().get(this.confID);
                vscode.window.showInformationMessage("insertText: [" + this.confID + "] = " + insertText);
            }
        })
        context.subscriptions.push(onDidChangeConfig);
    }
}

