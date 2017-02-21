$.fn.banner = function (options) {
    var defaults = {};
    options = $.extend({}, defaults, options);

    //获取元素及定义常用变量
    var $pic = $("#ban_pic1");
    var $picDom = $pic.find("ul");
    var $picLeft = $("#prev1");
    var $picRight = $("#next1");
    var picLenth = $picDom.find("li").length;
    var picWidth = $picDom.find("li").outerWidth();
    var $thumPicDom = $("#ban_num1");
    var $thumLeftBtn = $("#prev_btn1");
    var $thumRightBtn = $("#next_btn1");
    var thumWidth = $thumPicDom.find("li").outerWidth();
    var curIndex = 0;

    //大图
    $picDom.find("li").css("float", "left");
    $picDom.css("width", picWidth * picLenth + "px");
    $picLeft.click(function () {
        if (curIndex == 0) {
            curIndex = picLenth;
        }
        curIndex--;
        console.info(curIndex);
        $picDom.animate({"left": -curIndex * picWidth + "px"}, 300);
        currentActive(curIndex);
    });

    $picRight.click(function () {
        curIndex++;
        if (curIndex == picLenth) {
            curIndex = 0;
        }
        console.info(curIndex);
        $picDom.animate({"left": -curIndex * picWidth + "px"}, 300);
        currentActive(curIndex);
    });

    //缩略图
    $thumPicDom.find("ul").css("width", picLenth * (thumWidth + 5) + "px").find("li").css("float", "left");
    var thumDomWidth = $thumPicDom.outerWidth();
    console.log(thumDomWidth, thumWidth);
    console.info(thumDomWidth / (thumWidth));

    $thumLeftBtn.click(function () {
        curIndex++;
        if (curIndex == picLenth) {
            curIndex = 0;
        }
        console.info(curIndex);
        $picDom.animate({"left": -curIndex * picWidth + "px"}, 300);
        currentActive(curIndex);
    });

    $thumRightBtn.click(function () {
        if (curIndex == 0) {
            curIndex = picLenth;
        }
        curIndex--;
        console.info(curIndex);
        $picDom.animate({"left": -curIndex * picWidth + "px"}, 300);
        currentActive(curIndex);
    });


    //点击图片弹出弹出层
    var popLiWidth = $picDom.find("li").outerWidth();
    $picDom.find("li").click(function (e) {
        $(".mhc").show().css({"width":"100%","height":"100%"});
        $("#demo2").show().find("ul").css({"width":popLiWidth*picLenth+"px","left":-curIndex*popLiWidth+"px"});
        $(".pop_up_xx").click(function () {
            $("#demo2,.mhc").hide()
        })
    });
    $("#prev2").click(function () {
        if (curIndex == 0) {
            curIndex = picLenth;
        }
        curIndex--;
        console.info(curIndex);
        $("#ban_pic2").find("ul").animate({"left": -curIndex * picWidth + "px"}, 300);
        currentActive(curIndex);
    });
    $("#next2").click(function () {
        if (curIndex == 0) {
            curIndex = picLenth;
        }
        curIndex--;
        console.info(curIndex);
        $("#ban_pic2").find("ul").animate({"left": -curIndex * picWidth + "px"}, 300);
        currentActive(curIndex);
    });

    //左按钮事件
    function leftBtn(curIndex) {

    }
    var timer;
    function auto() {
        timer = window.setInterval(function () {
            curIndex++;
            if (curIndex == picLenth) {
                curIndex = 0;
            }
            console.info(curIndex);
            $picDom.animate({"left": -curIndex * picWidth + "px"}, 300);
            currentActive(curIndex);
        },3000)
    }
    auto();

    $pic.mouseover(function () {
        window.clearInterval(timer);
    }).mouseout(function () {
        auto();
    });

    //缩略图样式
    function currentActive(curIndex) {
        $thumPicDom.find("li").eq(curIndex).addClass("on").siblings().removeClass("on");
        var thumNum = parseInt(thumDomWidth / thumWidth)-1;
        var differ = curIndex-(thumNum-1);
        if (curIndex >= thumNum) {
            $thumPicDom.find("ul").css("left", -thumWidth * differ + "px")
        }else {
            $thumPicDom.find("ul").css("left", 0 + "px")
        }
    }
};