$(window).on('load',function(){
	 waterfall('main','pin');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll=function(){
        if(checkScrollSlide()){
            $.each( dataInt.data, function( index, value ){
                var $oPin = $('<div>').addClass('pin').appendTo( $( "#main" ) );
                var $oBox = $('<div>').addClass('box').appendTo( $oPin );
                $('<img>').attr('src','./images/' + $( value).attr( 'src') ).appendTo($oBox);
         });
            waterfall();
        };
    }
})
function waterfall(){
	var $box=$('#main>div');
	var w=$box.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$('#main').width(w*cols);
	var hArr=[];
	$box.each(function(index,value){
		var h=$box.eq(index).outerHeight();
		if(index<cols){
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minIndex=$.inArray(minH,hArr);
			$(value).css({'position':'absolute','top':minH+'px','left':minIndex*w+'px'});
			hArr[minIndex]+=$box.eq(index).outerHeight();		
		}
	})
}
function checkScrollSlide(){
	 var $aPin = $( "#main>div" );
    var lastPinH = $aPin.last().get(0).offsetTop + Math.floor($aPin.last().height()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $( window ).scrollTop()//注意解决兼容性
    var documentH = $( document ).height();//页面高度
    return (lastPinH < scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}