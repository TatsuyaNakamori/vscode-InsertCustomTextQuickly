// ============================================================
// Copyright (c) 2021 Tatsuya Nakamori. All rights reserved.
// See LICENSE in the project root for license information.
// ============================================================
// [Using third party libraries(See LICENSE)]
// https://github.com/iamkun/dayjs
// https://github.com/panzerdp/voca
// ============================================================

import * as vscode from 'vscode';
import * as i18n from './i18n';
// voca
import * as voca from 'voca';
// Setup dayjs
import * as dayjs from 'dayjs';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/fr';
import 'dayjs/locale/de';
import 'dayjs/locale/it';
import 'dayjs/locale/es';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import 'dayjs/locale/ru';
import 'dayjs/locale/bg';
import 'dayjs/locale/hu';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/tr';
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);
const DATE_LOCALE = [
    "en", "zh-cn", "zh-tw", "fr", "de", "it", "es",
    "ja", "ko", "ru", "bg", "hu", "pt-br", "tr"
]


export async function execInsertText() {
    // Get the configuration text and ask the user which text to insert.
    const confStrList: string[] | undefined = vscode.workspace.getConfiguration().get("insertText.customText");
    const confRecentList: string[] | undefined = vscode.workspace.getConfiguration().get("insertText.recently");
    if (!confStrList) {
        vscode.window.showErrorMessage(i18n.localize("insertaction.getconf.error"))
        return
    }

    let itemOrder: string[] = []
    // Insert the most recent item first.
    if (confRecentList) {
        for (let i = 0; i < confRecentList.length; i++) {
            if (confStrList.includes(confRecentList[i])) {
                itemOrder.push(confRecentList[i])
            }
        }
    }
    // Then insert the rest of the items
    for (let i = 0; i < confStrList.length; i++) {
        if (!itemOrder.includes(confStrList[i])) {
            itemOrder.push(confStrList[i])
        }
    }

    let items: vscode.QuickPickItem[] = [];
    for (let i = 0; i < itemOrder.length; i++) {
        let num = voca.sprintf("%d", i+1);

        let item = {
            label: `Insert text${num}: `,
            description: itemOrder[i]
        }
        items.push(item);
    }

    const result = await vscode.window.showQuickPick(items);
    let confStr: string | undefined = result?.description
    if (!confStr) {
        vscode.window.showErrorMessage(i18n.localize("insertaction.quickpick.error"))
        return
    }

    // Init SEQ values
    const seqReg = /\$\{\[SEQ](.*?):(.*?):(.*?)}/;
    const seqMatch = seqReg.exec(confStr);
    if (!seqMatch) {
        _replace(confStr);
        _updateConfig(confStr, confRecentList)
        return
    }
    let format = seqMatch[1];
    let start = seqMatch[2];
    let step = seqMatch[3];

    if (start == "x" || step == "x") {
        const inputBoxOptions: vscode.InputBoxOptions = {
            value: "1:2",
            placeHolder: "1:2",
            prompt: i18n.localize("seq.input.prompt")
        }
        const inputValue = await vscode.window.showInputBox(inputBoxOptions);
        if (!inputValue) {
            vscode.window.showErrorMessage(
                i18n.localize("seq.input.prompt")
            );
            return
        }
        if (!inputValue.match(/^(\d+?):(\d+?)$/)) {
            vscode.window.showErrorMessage(
                i18n.localize("seq.input.formatError")
            );
            return
        }
        const startStep = inputValue.split(":")
        start = startStep[0];
        step = startStep[1];
    }

    const _confStr = confStr.replace(seqReg, `\${[SEQ]${format}:${start}:${step}}`);
    _replace(_confStr)


    _updateConfig(confStr, confRecentList)
}

function _replace(confStr:string) {
    // Get the active text editor and selected Words
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return }
    const document = editor.document;
    const selections = editor.selections;

    for (let i = 0; i < selections.length; i++) {
        const selection = selections[i];
        const selWord = document.getText(selection);
        let replaceStr = confStr;

        // Convert escape strings
        replaceStr = _convertEscapeStrings(replaceStr);

        // ${[DATE]} keyword conversion process
        // ${[DATE]} ${[DATE]DD/MM/YYYY} ${[DATE]LLLL:jp}
        const dateReg =
            /\$\{\[DATE](.*?)(:(en|zh-cn|zh-tw|fr|de|it|es|ja|ko|ru|bg|hu|pt-br|tr))?}/;
        let dateMatch = dateReg.exec(replaceStr);
        while (dateMatch) {
            let format = dateMatch[1];
            let locale = dateMatch[3];
            const dateStr:string = _generateDate(format, locale);
            replaceStr = replaceStr.replace(dateReg, dateStr);

            dateMatch = dateReg.exec(replaceStr);
        }

        // ${[HOLD]} keyword conversion process
        const holdReg = /\$\{\[HOLD]}/g
        if (replaceStr.match(holdReg)) {
            replaceStr = replaceStr.replace(holdReg, `$\{100:${selWord}}`);
            replaceStr = `${replaceStr}$0`;
        }

        // ${[SEQ]} keyword conversion process
        // ${[SEQ]%02.2f:0:0.5}
        const seqReg = /\$\{\[SEQ](.*?):(.*?):(.*?)}/;
        let seqMatch = seqReg.exec(replaceStr);
        if (seqMatch) {
            const format = seqMatch[1];
            const start = Number(seqMatch[2]);
            const step = Number(seqMatch[3]);
            let number = voca.sprintf(format, (start + i * step));
            replaceStr = replaceStr.replace(seqReg, number);
        }

        console.log(replaceStr);
        editor.insertSnippet(new vscode.SnippetString(replaceStr), selection);
    }
}

function _convertEscapeStrings(str:string) {
    str = str.replace(/\\\\/g, "\\");
    str = str.replace(/\\n/g, "\n");
    str = str.replace(/\\r/g, "\r");
    str = str.replace(/\\t/g, "\t");
    str = str.replace(/\\b/g, "\\");
    return str
}

function _generateDate(format?:string, locale?:string): string {
    // Setup locale
    if (!locale) {
        locale = vscode.env.language.toLowerCase();
    }
    if (!DATE_LOCALE.includes(locale)) {
        locale = "en"
    }

    // Format conversion
    if (!format) {
        return dayjs().locale(locale).format();
    } else {
        return dayjs().locale(locale).format(format);
    }
}

function _updateConfig(confStr: string, confRecentList: string[] | undefined) {
    if (!confRecentList) {
        confRecentList = [confStr];
    } else {
        var index = confRecentList.indexOf(confStr);
        if (index != -1) {
            confRecentList.splice(index, 1);
        }
        confRecentList.unshift(confStr);
    }
    vscode.workspace.getConfiguration().update("insertText.recently", confRecentList, true);
}
