/*********************************************
    Document   : splashAjax.js
	Version    : 0.5
	License    : Creative Commons-No Comercial
**********************************************/
/*
 El beneficiario de la licencia tiene el derecho de copiar
 distribuir, exhibir y representar la obra y hacer obras derivadas 
 para fines no comerciales.
*/

var  splash = {

    titulo: "tutulo",
    logo: "./img/LogoQNutrition.jpg",
    detalles: "Cargando...",
	posicion:5,
    val:1,
    tIni : 0,
    tFin:"",
    tmp:"",
    fin:"",
    mls:"",
    pet:"",
    ajaxObj:"",
	
    Con:function(a){
	try{
            return(typeof(encodeURIComponent)=='function')?encodeURIComponent(a):Con(a);
        }catch(e){
            return false;
        }
       
    },
    ini:function(){
		if(this.Con(navigator.userAgent.indexOf('MSIE'))==25){
		if(this.Con(navigator.appVersion).substring(0,4)){
		alert('Splash no Soportado!');
		}
	}
      else{
		splash.ajaxObj();
		}   
    },
    url:function(){
        return this.Con(document.location.href);
    },
    tmpo:function(){
        return new Date().getMilliseconds();
    },

    ajaxObj: function (){
	document.write("<link rel='stylesheet' type='text/css' href='./css/splash.css'/>");
        this.ajaxObj= new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
        this.setMin(splash.tmpo());
        this.ajaxObj.onreadystatechange = this.cargaSplash;
        this.ajaxObj.open('GET',splash.url()+'?nocache='+Math.random(), true);
        this.ajaxObj.send(this.creaSplash());

        return this.setAjaxObj(this.ajaxObj);
    },
    setMin:function (t){this.tIni=t;},
    getMin:function () {return  this.tIni;},
    setAjaxObj:function (obj){this.pet=obj;},
    getAjaxObj:function () {return  this.pet;},
    creaSplash: function (){
        fon = document.createElement('div');
        fon.setAttribute('id','Splash_bg');
        Splash = document.createElement('div');
        Splash.setAttribute('id','Splash');
        tl = document.createElement('div');
        tl.setAttribute('id','Splash_tit');
        log = document.createElement('div');
        log.setAttribute('id', 'Splash_logo');
        sep = document.createElement('div');
        sep.setAttribute('id','Splash_sep');
        carg = document.createElement('div');
        carg.setAttribute('id','Splash_detalles');
        cargpor = document.createElement('div');
        cargpor.setAttribute('id','Splash_cargpor');
        bar = document.createElement('div');
        bar.setAttribute('id','bar_car');
		return false;
				
    },
    posicionSplash:function(p){
        var h=document.body.clientHeight;
        var w=document.body.clientWidth;
        Splash.style.top =h/p+'px';
        Splash.style.left =w/p*1.8+'px';
    },

    cargaSplash: function (){
        this.tFin = splash.tmpo();
        this.mls =this.tFin-splash.getMin();
        if(splash.getAjaxObj().readyState == 4) {
            splash.iniSplash(this.mls);	
        }
    },
    iniSplash:function (ti){
	Splash.appendChild(tl);
        Splash.appendChild(log);
        Splash.appendChild(sep);
        sep.appendChild(cargpor);
        sep.appendChild(carg);
        sep.appendChild(bar);
        document.body.appendChild(fon);
        document.body.appendChild(Splash);	
        this.posicionSplash(this.posicion);
        tl.innerHTML = this.titulo;		
        log.innerHTML = "<img src='"+this.logo+"' width= 300; height=110;/> ";		
        carg.innerHTML = this.detalles;			
        cargpor.innerHTML = this.val+'%';	
        Splash.style.display = 'block';
        this.val=this.val+1;
        bar.style.width=this.val*3+'px';
        this.tmp=setTimeout("splash.iniSplash()",ti);
        if(this.val>100){
		this.finSplash(9);
		cargpor.innerHTML = '100%';
            this.val=0;}
    },

    finSplash: function (opc){
	for (var p=0;p<10;p++) {
    var m=p * 30;
    setTimeout('Splash.style.filter = "alpha(opacity='+[opc]+')";', m);
    setTimeout('Splash.style.opacity = "'+[opc]+'"/10;', m);
    setTimeout('Splash.style.MozOpacity = "'+[opc]+'"/10;', m);
    setTimeout('Splash.style.KHTMLOpacity = "'+[opc]+'"/10;', m);
    opc=opc-1;
       }
	   if(opc==0){Splash.style.display = 'none';}
		fon.style.display = 'none';
        clearTimeout(this.tmp);
    }
} ;
splash.ini();