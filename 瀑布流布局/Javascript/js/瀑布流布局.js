window.onload=function(){
	waterfall('main','pin');

    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    
    window.onscroll=function(){
        if(checkScrollSlide){
            var oParent = document.getElementById('main');// 父级对象
            for(var i=0;i<dataInt.data.length;i++){
                var oPin=document.createElement('div'); //添加 元素节点
                oPin.className='pin';                   //添加 类名 name属性
                oParent.appendChild(oPin);              //添加 子节点
                var oBox=document.createElement('div');
                oBox.className='box';
                oPin.appendChild(oBox);
                var oImg=document.createElement('img');
                oImg.src='./images/'+dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall('main','pin');
        };
    }
}
function waterfall(parent,box){
	var oParent=document.getElementById(parent);
	var oBox=getByClass(oParent,box);
	var oBoxW=oBox[0].offsetWidth;
	var pageW=document.documentElement.clientWidth;
	var cols=Math.floor(pageW/oBoxW);
	oParent.style.cssText='width:'+oBoxW*cols+'px';
	var boxH=[];
	for(var i=0;i<oBox.length;i++){
		if(i<cols){
			boxH.push(oBox[i].offsetHeight);
		}
		else{
			var minH=Math.min.apply(null,boxH);//数组中的最小值minH
            var minHIndex=minIndex(boxH,minH);
            oBox[i].style.position='absolute';
            oBox[i].style.top=minH+'px';
            oBox[i].style.left=oBox[minHIndex].offsetLeft+'px';
            boxH[minHIndex]+=oBox[i].offsetHeight;
		}
		
	}

}
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBox=oParent.getByClass(oParent,'pin');
	var oBoxLastH=oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var h=document.body.clientHeight||document.documentElement.clientHeight;
	return (oBoxLastH<scrollTop+h)?true:false;
}
function getByClass(parent,clsName){
	var boxArr=[];//用来存储所有className为box的元素
	var oElements=parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
function minIndex(arr,minH){
	for(var i in arr){
		if(arr[i]==minH){
			return i;
		}
	}
}