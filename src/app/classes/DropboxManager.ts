var fetch = require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'gLUq9__2EjAAAAAAAAAAC7FYw2uV5HPxDId9ZMsF4w4NcfFnzLcleKuULEJcYssG', fetch: fetch });

export default class DropboxManager {

    constructor() { }

    static createFolder(folder: string) {
        dbx.filesCreateFolderV2({ path: folder })
            .then(function (response) {                
                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    static openFolder(folder: string) {
        window.open("https://www.dropbox.com/home/Aplicaciones/ceytec/" + folder);
    }
}
