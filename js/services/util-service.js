'use strict'

export const utilService = {
    // copyText,
    linkBuilder
}

import { locService } from './loc.service.js';

// function copyText(textToCopy) {
//     /* Get the text field */
//     var copyText = document.getElementById("copy-text");

//     /* Select the text field */
//     copyText.select();
//     copyText.setSelectionRange(0, 99999); /*For mobile devices*/

//     /* Copy the text inside the text field */
//     document.execCommand("copy");

//     /* Alert the copied text */
//     console.log("Copied the text: " + copyText.value);
// }

function linkBuilder() {
    const loc = locService.getLoc()
        .then(loc => {
            return `Hey let's go on a trip! check out https://talshachar.github.io/travel-winners/?lat=${loc.lat}&lng=${loc.lng}`;
        });
    return loc;
}