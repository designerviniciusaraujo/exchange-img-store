function imagesExchange(sIdProd, sImagemProdPri, ImagemProdDet, sDescUrl, sNomeProd, ProdFiltersJS) {
  "use strict";

  var getImageBox = document.getElementById("dobleImage" + sIdProd);
  var getBoxProd = document.getElementById("ActveimagesExch" + sIdProd);
  var opath = sImagemProdPri.split('/');  opath.pop();
  var spath = opath.toString("").replace(/,/g, "/");
  var sImgName;var sValidate; var aPositionData;var oimgPri;   

  var ActivehoverData=function(){getImageBox.childNodes[0].style.opacity = "0";getImageBox.childNodes[0].style.transition = "all 1s";getImageBox.childNodes[1].style.opacity = "1"; getImageBox.childNodes[1].style.transition = "all 1s"}
  var inactivehoverData=function(){getImageBox.childNodes[1].style.opacity = "0";getImageBox.childNodes[1].style.transition = "all 1s";getImageBox.childNodes[0].style.opacity = "1";getImageBox.childNodes[0].style.transition = "all 1s"}
  var InnerOneData = function() {
    getImageBox.innerHTML = "<div id='firstImage" + sIdProd + "'></div>";
    oimgPri = document.getElementById("firstImage" + sIdProd + "")
    oimgPri.style.backgroundImage = "url(" + sImagemProdPri + ")";
    oimgPri.style.position = "inherit";
    oimgPri.style.opacity = "1";
  }

  var InnerData = function(sImgName) {
    getImageBox.innerHTML = "<div id='firstImage" + sIdProd + "'></div><div id='lastImage" + sIdProd + "'></div>";
    oimgPri = document.getElementById("firstImage" + sIdProd + "")

    oimgPri.style.backgroundImage = "url(" + sImagemProdPri + ")";
    document.getElementById("lastImage" + sIdProd + "").style.backgroundImage = "url(" + spath + '/' + sImgName + ")";

    var x = window.matchMedia("(max-width: 700px)")
    if(x.matches) { // If media query matches  
      if(getBoxProd) {  
        getBoxProd.addEventListener("touchstart", ActivehoverData);
        getBoxProd.addEventListener("touchend", inactivehoverData); 
      } else {
        getImageBox.addEventListener("touchstart", ActivehoverData);
        getImageBox.addEventListener("touchend", inactivehoverData);

      }
    } else {
      if(getBoxProd) {
        getBoxProd.addEventListener("mouseenter", ActivehoverData);
        getBoxProd.addEventListener("mouseleave", inactivehoverData); 

      } else {

        getImageBox.addEventListener("mouseenter", ActivehoverData);
        getImageBox.addEventListener("mouseleave", inactivehoverData); 
   

      }
    }
  } 

  // GET TYPE URL  
  if(sDescUrl.split(".").length == 3) {
    aPositionData = sDescUrl.split("=").length
    sImgName = sDescUrl.split("=")[aPositionData - 1].split(">")[0].slice(0, -1)
    return InnerData(sImgName);
  } else if(ImagemProdDet) { 
    // GET TYPE DETAILS  
    var detLenght = ImagemProdDet.split("/").length.toString() - 1;
    var sgetImages = ImagemProdDet.split("/")[detLenght].split(',').length  
    if(sgetImages == 2) { 
      sValidate = ImagemProdDet.split("/")[detLenght].split(',')[1].split(".")[1].toLowerCase();  
      if(sValidate == "png" || sValidate == "png" || sValidate == "jpg" || sValidate == "svg") {
        sImgName = ImagemProdDet.split("/")[detLenght].split(',')[1].toLowerCase();  
        //console.log("HoverImageAtivo > Cadastrada em IMAGEMDETALHADA* > ", sImgName + sIdProd)
        return InnerData(sImgName);
      }
    } else {
      // GET TYPE FILTER  
      for(var i = 0; i < ProdFiltersJS.length; i++) {
        var ofill = ProdFiltersJS[i].pFil
        for(var i = 0; i < ofill.length; i++) {
          if(ofill[i].name === "TrocaImagem") {
            sImgName = ofill[i].image;
            InnerData(sImgName);
          }
          if(ofill[i].name !== "TrocaImagem") {
            InnerOneData()
          }

        }
      }
    }
  }
}
