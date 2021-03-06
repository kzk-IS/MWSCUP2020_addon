const whitelistname = 'tmpWhitelist'
const STORAGE = localStorage

function genDomains(url){
    var splited = url.split('/')[2].split('.');
    var domains = []
    for(var i=0;i<splited.length-1;i++)
        domains.push(splited.slice(i,splited.length).join('.'));
    return domains;
}

function search(blacklists,url){
    var keywords = genDomains(url);
    for(var i=0;i<blacklists.length;i++){
        for (var j=0;j<keywords.length;j++)
            if (blacklists[i][keywords[j]])
                return blacklists[i][keywords[j]];
    }
    return false;
}

//　存在確認
function checkWhitelist(){
    if(STORAGE.getItem(whitelistname) == null){
        STORAGE.setItem(whitelistname,JSON.stringify({}))
        return false;
    }else return true;
}

// 一時的なホワイトリストに追加
function addTmpWhitelist(url){
    checkWhitelist()
    tmpwhitelist = JSON.parse(STORAGE.getItem(whitelistname));
    tmpwhitelist[url.split('/')[2]] = getTime();
    STORAGE.setItem(whitelistname,JSON.stringify(tmpwhitelist));
}

const INTERVAL = 0.1 * 60 * 1000
// 一時的なホワイトリストにurlがあればture,なければfalseを返す
function searchTmpWhitelist(url){
    // return false if there is no tmpWhiteList
    if (!checkWhitelist()) return false;
    // get tmpWhiteList
    tmpwhitelist = JSON.parse(STORAGE.getItem(whitelistname));
    console.log([tmpwhitelist]);
    // 最後に許可された時間を確認
    if(!(lastApprovedTime = search([tmpwhitelist],url)))return false
    if(getTime() - lastApprovedTime > INTERVAL) return false
    else return true
}
// 一時的なホワイトリストから削除
function deleteTmpWhitelist(url){
    if(!checkWhitelist) return;
    tmpwhitelist = JSON.parse(STORAGE.getItem(whitelistname));
    tmpwhitelist[url.split('/')[2]] = false;
    STORAGE.setItem(whitelistname,JSON.stringify(tmpwhitelist));
}

//UNIXタイムスタンプ取得
function getTime(){
    return new Date().getTime()
}
