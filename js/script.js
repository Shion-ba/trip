var now = moment();
var ym = now.format("YYYY年M月");
var day = now.format("D日(ddd)");

$(function(){
    $("#ym").text(ym);
    $("#dd").text(day);
    $("a.tab1").text(now.format("M/D ddd"));

    $("#image_modal_btn").click(function(){
        $('input[type=file]').iPreview({
            target : "header";
        });

    });

    $("#trip_start_ym").click(function(){

        $("#first").text(ym);
        $("#second").text(moment().add(1,"month").format("YYYY年M月"));
        $("#third").text(moment().add(2,"month").format("YYYY年M月"));
        $("#fourth").text(moment().add(3,"month").format("YYYY年M月"));
        $("#fifth").text(moment().add(4,"month").format("YYYY年M月"));

    });

    $(".dropdown-menu").click(function(){

        //activeをつける
        $(".dropdown-menu li").addClass("active");

        //activeがついてるのを消す
        $(".dropdown-menu li").removeClass("active");

    });


    //activeがついたtextに書き換える
    $(".dropdown-menu li").click(function(){
        var text = $(this).text();
        $("#ym").text(text);
        
    });

        
    //#trip_start_dがclickされる
    $("#trip_start_d").click(function(){
        $(".menu2").text("");
        $(".menu2").append(); 

        //trip_start_ymで選択した月(.dropdown-menu liのクラスがactive)の年と月がわかる
        var m = moment($(".dropdown-menu li.active")[0].innerText,"YYYY年MM月");
        
        //日数と曜日がわかる //htmlにする //アペンドする
        var e = Number(m.daysInMonth());
        //何日まであるか、数値に変換

        for (var i = 0; i < e; i++){

            var m = moment($(".dropdown-menu li.active")[0].innerText,"YYYY年MM月");
            var days = m.add(i,"days").format("D日(ddd)");
           

            $(".menu2").append("<li><a href='#' data-toggle='tab' class='day'>" + days + "</a></li> "); 
        }

       //選択した日付に書き換わる
        $(".menu2 li").click(function(){
            var dd = $(this).text();
            $("#dd").text(dd);

            //tabに日付を反映
            var ymText = $("#ym").text().substr(5,6).replace(/月/," ");
            var ddText = $("#dd").text().substr(0,5).replace(/日\(/," ").replace(/\)/," ");
            console.log(ymText+"/"+ddText);
            $("a.tab1").text(ymText+"/"+ddText);
            
        });

    });

    

    //以下タブに対する処理 
    $(".tab1").click(function(){
        $("#day1").css("display","block");
    });


    //新しいタブ
    var num = 0;
    $("li.tsuika").on("click",function(){

        //clickするとタブが増える
        $(".nav .tsuika").before("<li><a href='#' data-toggle='tab' class='new'>new</a></li>");
        //新しいタブは6個まで
        $(this).data("click", ++num);
        var click = $(this).data("click");
        if(click == 6){
            $("li.tsuika").off("click");
        }

        //新しいタブにclassがつく
        $(".nav a").each(function(i){
            if($(this).hasClass("new")){
                i = i + 1;
                $(this).addClass("day_"+i);
                $(this).attr("href","#day"+i);

                // 新しいタブのテキストが日付に変わる
                var m2 = moment($(".menu2 li.active")[0].innerText,"DD"); 
                var days2 = m2.add(i-1,"days").format("D ddd");
                var ymText = $("#ym").text().substr(5,6).replace(/月/," ");

                $(this).text(ymText+"/"+days2);
            }

            //タブを切り替える
            $(".nav li").click(function(){
                //タブの番号がインデックスに変換
                var index = $(".nav li").index(this);
                console.log(index);
                //コンテンツを全部非表示
                $(".contents .day").css("display","none");
                //クリックされたタブと同じインデックス番号のコンテンツを表示
                $(".contents .day").eq(index).css("display","block");
                //一度タブについているクラスactiveを消し
                $(".nav li").removeClass("active");
                //クリックされたタブのみにクラスactiveをつけ
                $(this).addClass("active");
                $(".tsuika").removeClass("active");
            });

        });

    });


    //予定を追加する処理


    $(".btnHenshu").click(function(){   
        $(".modal").modal(); 
    });

    // 時間を設定する
    $('#time').combodate({
        minuteStep: 1
    });  
    $('#time2').combodate({
        minuteStep: 1
    });  

    // var num2 = 0;
    $("#modalSave").on("click",function(){

        var time1 = $("#time").val();
        var time2 = $("#time2").val();
        var input1 = $("#exampleInput1").val();

        //予定開始時間が反映        
        $(".schedule h4 span:first-child").text(time1);
        $(".schedule h4 span:nth-child(2)").text(time2);
        //テキストが反映
        $(".modal-result").html("<p>"+ input1 +"</p>");

    });

    $(".btnTsuika").click(function(){

        //予定を増やす
        $(".schedule").append("<br><br><br><br><div class=\"new\"><h4><span>07:00</span><br>から<br><span>08:00</span></h4><a href=\"#\" class=\"btnHenshu\">予定を編集する</a><div class=\"modal-result\"></div></div>");
        $(".schedule　div").each(function(i){
            if($(this).hasClass("new")){

                var str = $(".at7")[0].className.split(" ")[0];
                var i = Number(str.slice(2));
                    i = i + 1;
                    $(this).addClass("at"+i);

                    $(this).removeClass("new");
                
            }
            $(".btnHenshu").click(function(){  
                // $(".modal").remove();         
                // $(".modal").modal(); 
                $modals = $(".modal");
                $modals.each( function(i) {
                var $clone = $(this).clone().css('display', 'block').appendTo('body');
                // $(".modal").clone().modal(); 

                });
            });


      });
    });




});





