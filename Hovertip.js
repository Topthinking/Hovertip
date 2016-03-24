var Hover = (function(){

  var global = {
      dom:null,
      sign:0,
      content:null
  }; 

  function Hover(opt){
      this.options = $.extend({
        style:null,
        dom:null,
        url:null,
        param:{}
      },opt||{});
  };

  Hover.prototype = {
    
    //初始化显示组件
    init:function(){   
      $('body').append('<div id="hover:tip" style="position:absolute;"></div>');
      global.dom = this.find("hover:tip");
      if(this.options.style!=null){
        $(global.dom).css(this.options.style);
      }  
    },

    //找出特殊的id标签
    find:function(ele){
        if(typeof(ele)=="object")
          return ele;
        else if(typeof(ele)=="string"||typeof(ele)=="number")
          return document.getElementById(ele.toString());
          return null;
    },

    //获取鼠标的x轴 y轴坐标
    mousePos:function(e){
        var x,y;
        var e = e||window.event;
        return{
          x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
          y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop
        };
    },

    //开始显示
    start:function(obj){
        global.sign=0;
        var self = this;
        this.init();

        obj.onmousemove=function(e){
          self.showContent(obj);
          self.resetPosition(self.mousePos(e).x,self.mousePos(e).y);         
        };
            
        obj.onmouseout=function(){
            self.destroy();
        };
    },

    //获取显示的内容
    showContent:function(obj){
      var content;
      if(this.options.url!=null){
        if(global.sign==0){
          $.post(this.options.url,this.options.param,function(data){
              if(data.isOk){
                global.content = data.data.res;
                $(global.dom).html(global.content);
                global.sign=1;
              }
          },'json');
        }else{
           $(global.dom).html(global.content);
        }
      }else{
        content = $(obj).find(this.options.dom).val();
         $(global.dom).html(content);
      }
    },

    //获取显示的位置
    resetPosition:function(x,y){
        var total_height = y + $(global.dom).height() - document.body.scrollTop - document.documentElement.scrollTop + 50;
        var total_width = x + $(global.dom).width() - document.body.scrollLeft - document.documentElement.scrollLeft + 50;

        var top = total_height >= $(window).height() ? (y - $(global.dom).height() - 10) : (y + 10);
        var left = total_width >= $(window).width() ? (x - $(global.dom).width() - 10) : (x + 10);
        
        $(global.dom).css({
          top:top+"px",
          left:left+"px"
        });
    },

    //销毁当前显示的dom元素
    destroy:function(){
        $(global.dom).detach();
    }
  };

  return Hover;
})();