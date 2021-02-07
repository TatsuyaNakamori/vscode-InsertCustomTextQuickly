// ============================================================
// Copyright (c) 2021 Tatsuya Nakamori. All rights reserved.
// See LICENSE in the project root for license information.
// ============================================================

import * as vscode from 'vscode'


const i18nFiles: { [key: string]: string; } = {
    "en": "./../package.nls.json",
    "ja": "./../package.nls.ja.json"
}
const i18nData = getData();


export function localize(i18nKey: string) {
    return i18nData[i18nKey];
}

function getData() {
    const locale = vscode.env.language;
    console.log("vscode.env.language= " + locale);

    let i18nJSON = require(i18nFiles[locale]);
    console.log("i18nJSON is:");
    console.log(i18nJSON);

    return i18nJSON
}


