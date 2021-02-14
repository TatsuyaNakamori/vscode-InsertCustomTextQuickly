// ============================================================
// Copyright (c) 2021 Tatsuya Nakamori. All rights reserved.
// See LICENSE in the project root for license information.
// ============================================================

import * as vscode from 'vscode';
import * as inserttext from './InsertCustomText';


export function activate(context: vscode.ExtensionContext) {
    // registerCommand
    const disposable = vscode.commands.registerCommand("insertcustomtext.inserttext", () => {
        inserttext.execInsertText()
    });
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
