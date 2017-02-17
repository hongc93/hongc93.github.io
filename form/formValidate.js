/**
 * 表单验证插件：
 * 1》input加 data-empty时，为必填项，提交时验证。
 * 2》验证正则可根据自己需求更改
 * 3》
 * @param options
 * @returns {$}
 */
$.fn.validator = function (options) {
    var defaults = {
        userNameReg: /^\w+$/,//数字、26个英文字母或者下划线
        passwordReg: /^\w+$/,
        passwordPower: true,//为true时 验证密码强弱程度
        passwordWeak:"#ff460f",//密码最弱时（只有一种类型）颜色值
        passwordMid:"#ff910f",//密码（有两种类型）颜色值
        passwordStrong:"#a9e00",//密码（有两种以上类型）颜色值
        emailReg: /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/,
        ageReg: /^((1[8-9])|([2-5]\d)|(6[0-5]))$/,// 18-65 /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,//0-120
        phoneReg: /^1[34578]\d{9}$/,
        telReg: /^0\d{2,3}-\d{7,8}$/,//如：0311-7548954
        idCardReg: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,//18位身份证，X为大写
        faxReg: /^(\d{3,4})?[-]?\d{7,8}$/,//如：0311-7548954 或 03117548954
        nameReg: /^[\u4E00-\u9FFF]+$/,//要求中文
        qqReg:/^[1-9][0-9]{4,9}$/

    };
    options = $.extend({}, defaults, options);

    //获取元素及定义变量
    var $oInput = $("input");
    var $btnSubmit = $("button[type='submit']");


    //正则验证
    function regValidate(className, inputVal, minLength) {
        var reg = false;

        if (className.indexOf("userName") != -1 && !options.userNameReg.test(inputVal)) {
            reg = true;
        }
        if (className.indexOf("password") != -1) {
            if (options.passwordPower) {
                var degree = checkStrong(inputVal, minLength);
                var $power = $(".password").parents(".form-item").find("ul");

                switch (degree) {
                    case 1:
                        $power.find("li:first").children("div").css("backgroundColor",options.passwordWeak);
                        $power.find("li:first").children("p").css("color",options.passwordWeak);
                        break;
                    case 2:
                        $power.find("li:lt(2)").children("div").css("backgroundColor",options.passwordMid);
                        $power.find("li:lt(2)").children("p").css("color",options.passwordMid);
                        break;
                    default:
                        $power.find("li").children("div").css("backgroundColor",options.passwordStrong);
                        $power.find("li").children("p").css("color",options.passwordStrong);
                }

            } else if (!options.passwordReg.test(inputVal)) {
                reg = true;
            }
        }
        if (className.indexOf("rePassword") != -1) {
            var firPassword = $(".password").val();
            if (inputVal != firPassword) {
                reg = true;
            }
        }
        if (className.indexOf("email") != -1 && !options.emailReg.test(inputVal)) {
            reg = true;
        }
        if (className.indexOf("phone") != -1 && !options.phoneReg.test(inputVal)) {
            reg = true;
        }
        if (className.indexOf("tel") != -1 && !options.telReg.test(inputVal)) {
            reg = true;
        }
        if (className.indexOf("fax") != -1 && !options.faxReg.test(inputVal)) {
            reg = true;
        }
        if (className.indexOf("name") != -1 && !options.nameReg.test(inputVal)) {
            reg = true;
        }
        if (className.indexOf("age") != -1 && !options.ageReg.test(inputVal)) {
            reg = true;
        }
        if (className.indexOf("idCard") != -1 && !options.idCardReg.test(inputVal)) {
            reg = true;
        }
        if (className.indexOf("qqNum") != -1 && !options.qqReg.test(inputVal)) {
            reg = true;
        }
        return reg;
    }

    //是否为纯数字
    function isDigit(s) {
        var patrn = /^[0-9]{1,20}$/;
        if (!patrn.exec(s)) return false
        return true
    }


    function CharMode(iN) {
        if (iN >= 48 && iN <= 57) //数字
            return 1;
        if (iN >= 65 && iN <= 90) //大写字母
            return 2;
        if (iN >= 97 && iN <= 122) //小写
            return 4;
        else
            return 8; //特殊字符
    }

    /*
     统计字符类型
     */
    function bitTotal(num) {
        modes = 0;
        for (i = 0; i < 6; i++) {
            if (num & 1) modes++;
            num >>>= 1;
        }
        return modes;
    }

    /*
     返回密码的强度级别
     */
    function checkStrong(sPW, minlength) {
        if (sPW.length <= minlength)
            return 0; //密码太短
        Modes = 0;
        for (i = 0; i < sPW.length; i++) {
            //测试每一个字符的类别并统计一共有多少种模式.
            Modes |= CharMode(sPW.charCodeAt(i));
        }
        return bitTotal(Modes);
    }


    //验证方法
    function validator($oInput) {
        var $thisParent = $oInput.parent();
        var oInputVal = $oInput.val();
        var oInputClass = $oInput.attr("class");
        var minLen = $oInput.attr("minlength");
        var msgError = $oInput.attr("data-error");
        var regTemp;


        //匹配样式名，执行正则验证
        if (typeof(oInputClass) != "undefined") {
            regTemp = regValidate(oInputClass, oInputVal, minLen);
        }

        //添加及删除错误提示
        if ($thisParent.has(".error").length == 0) {
            if ((minLen != "" && oInputVal.length < minLen) || regTemp) {
                $thisParent.append("<span class='error'>" + msgError + "</span>")
            }
        } else if (!regTemp) {
            if (minLen != "" && oInputVal.length >= minLen) {
                $oInput.siblings("span").remove();
            } else if (typeof(minLen) == "undefined") {
                $oInput.siblings("span").remove();
            }

        }
    }

    //失去焦点
    $oInput.blur(function () {
        var $this = $(this);
        validator($this);
    });

    //得到焦点
    $oInput.focus(function () {

    });

    //提交
    $btnSubmit.click(function (e) {

        $oInput.each(function () {
            var $this = $(this);
            var oInputEmpty = $this.attr("data-empty");
            if (typeof (oInputEmpty) != "undefined") {
                validator($this);
            }
            if ($this.parent().has(".error").length != 0) {
                e.preventDefault();
            }
        })
    });


    return this;
};