function imagesExchange(sIdProd, sImagemProdPri, ImagemProdDet, sDescUrl, sNomeProd, ProdFiltersJS) { 
    var getImageBox = document.getElementById("dobleImage" + sIdProd);
    var getBoxProd = document.getElementById("ActveimagesExch" + sIdProd);  
    var opath = sImagemProdPri.split('/');opath.pop(); 
    var spath = opath.toString("").replace(/,/g, "/");
    var sImgName;  
     
    getImageBox.style.backgroundImage = "url(" + sImagemProdPri + ")";  
    var InnerData=function(sImgName){  
       if (getBoxProd){   
          getBoxProd.onmouseenter=function(){getImageBox.style.backgroundImage = "url(" + spath + '/' + sImgName + ")"}
          getBoxProd.onmouseleave=function(){getImageBox.style.backgroundImage = "url(" + sImagemProdPri + ")"}
          getBoxProd.addEventListener('touchstart', function(e){getImageBox.style.backgroundImage = "url(" + spath + '/' +sImgName + ")"}, false);      
          getBoxProd.addEventListener('touchend', function(e){getImageBox.style.backgroundImage = "url(" +sImagemProdPri+")"},false);  
        }else{ 
          getImageBox.onmouseenter=function(){getImageBox.style.backgroundImage = "url(" + spath + '/' + sImgName + ")"}  
          getImageBox.onmouseleave=function(){getImageBox.style.backgroundImage = "url(" + sImagemProdPri + ")"}
          getImageBox.addEventListener('touchstart', function(e){getImageBox.style.backgroundImage = "url(" + spath + '/' +sImgName + ")"}, false);      
          getImageBox.addEventListener('touchend', function(e){getImageBox.style.backgroundImage = "url(" +sImagemProdPri+")"},false);  
        } 
    } 
 
    // GET TYPE URL  
    if (sDescUrl.length > 0) { 
        if (sDescUrl.includes(".jpg") == true || sDescUrl.includes(".png") == true || sDescUrl.includes(".svg") == true) {  
            if (sDescUrl.includes("http")) { //TRATA IMAGEM DA WEB
                var sImgName = sDescUrl.match(/\w+|"[^"]+"/g)[2].slice(1, -1)
                return InnerData();
            } else {//TRATA IMAGEM LOCAL
              
                aPositionData = sDescUrl.split("=").length
                sValiteData = sDescUrl.split("=")[aPositionData - 1].includes(".jpg") == true || sDescUrl.includes(".png") == true || sDescUrl.includes(".svg") == true
                if (sValiteData != false) {
                    sImgName = sDescUrl.split("=")[aPositionData - 1].split(">")[0].slice(0, -1)
                     //console.log("HoverImageAtivo > Cadastrada em URL de APOIO > ",sImgName)
                    return InnerData(sImgName);
                }
            }
        }
    } 

    // GET TYPE IMG DETAILS  
    if (ImagemProdDet) {
        var detLenght = ImagemProdDet.split("/").length.toString() - 1;
        var sgetImages = ImagemProdDet.split("/")[detLenght].split(',').length
        if (sgetImages == 2) {
            var sValidate = ImagemProdDet.split("/")[detLenght].split(',')[1];
            if (sValidate.includes(".jpg") == true || sValidate.includes(".png") == true || sValidate.includes(".svg") == true) {
                sImgName = ImagemProdDet.split("/")[detLenght].split(',')[1].toLowerCase();
               // console.log("HoverImageAtivo > Cadastrada em IMAGEMDETALHADA* > ",sImgName)
                return InnerData(sImgName);
            } else {
                // console.log("Imagem cadastrada de forma incorreta!")
            }
        }
    } 

    // GET TYPE FILTER  
    for (var i = 0; i < ProdFiltersJS.length; i++) {
        var ofill = ProdFiltersJS[i].pFil
        for (var i = 0; i < ofill.length; i++) {
            if (ofill[i].name == "TrocaImagem") {
                var sTypeFilter = ofill[i].name;
                sImgName = ofill[i].image;
                 console.log("HoverImageAtivo > Cadastrada no Filtro* "+ofill[i].name+" > Nome da Imagem >",sImgName)
                return InnerData(sImgName);
            }
        }
    }

}
