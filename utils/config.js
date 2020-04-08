const ipUrl= 'http://localhost:1314/'


let servicePath = {
    goodsPage:ipUrl + 'goodsPage' , 
    getTypeInfo:ipUrl+'getTypeInfo',
    addArticle:ipUrl+'addArticle',
    updateArticle:ipUrl+'updateArticle',
    getArticleList:ipUrl+'getArticleList',
    delArticle:ipUrl + 'delArticle/' ,
    getArticleByID:ipUrl+'getArticleByID/'

}
export default servicePath;