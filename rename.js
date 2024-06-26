// this function renames the files in the downloads folder
// it is used in index.js 
// it helps rename a file in these way ->
// it renames the file from file-1/file(12345) to file-2(12345-2), if file-1(12345) already exists 

function rename(name) {
    let mainName = name.split('.')[0];
    let fileExt = name.split('.')[1];

    let num = mainName.split('-')[1];
    if (num) {
        // 1. it renames the file from file-1 to file-2 (goes on)
        let mainName = mainName.split('-')[0];
        let newName = mainName + '-' + (parseInt(num) + 1) + "." + fileExt;
        return newName;
    } else {
        let j = mainName.length - 1
        while (mainName.charCodeAt(j) >= 48 && mainName.charCodeAt(j) <= 57) {
            j--;
        }
        //  2. it renames the file from file(12345) to file-2(12345-2)
        if (j == mainName.length - 1 || j < 0) {
            return mainName + '-2.' + fileExt;
        }    
    }
}

module.exports = rename