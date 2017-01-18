$(document).ready(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $("#simulateur .calcul").addClass("carousel, slide").attr('id', 'myCarousel').attr('data-ride', 'carousel').attr('data-interval','false');
            $("#simulateur .row").removeClass("row").addClass("item");
            $(".col-md-8").removeClass("col-md-8").addClass("carousel-inner").attr('role','listbox');
            $(".col-md-3").removeClass("col-md-3").addClass("col-sm-6");
            $(".carousel-control, .carousel-indicators").show();
        }

        $("#tv").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 10,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " h/jour",
            grid: true
        });

        $("#console").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 10,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " h/jour",
            grid: true
        });

        $("#pc").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 16,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " h/jour",
            grid: true
        });

        $("#pc-portable").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 16,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " h/jour",
            grid: true
        });

        $("#smartphone").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 16,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " h/jour",
            grid: true
        });

        $("#machine-a-laver").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 3,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " fois/semaine",
            grid: true
        });

        $("#lave-vaiselle").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 3,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " fois/semaine",
            grid: true
        });

        $("#micro-onde").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 30,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " min/jour",
            grid: true
        });

        $("#cafetiere").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 30,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " min/jour",
            grid: true
        });

        $("#aspirateur").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 3,
            from: 0,
            to: 100,
            type: 'single',
            step: 1,
            postfix: " fois/semaine",
            grid: true
        });

        var tv = $("#tv").data("ionRangeSlider"),
            console = $("#console").data("ionRangeSlider"),
            pc = $("#pc").data("ionRangeSlider"),
            pcPortable = $("#pc-portable").data("ionRangeSlider"),
            smartphone = $("#smartphone").data("ionRangeSlider"),
            machineLaver = $("#machine-a-laver").data("ionRangeSlider"),
            laveVaiselle = $("#lave-vaiselle").data("ionRangeSlider"),
            microOnde = $("#micro-onde").data("ionRangeSlider"),
            cafetiere = $("#cafetiere").data("ionRangeSlider"),
            aspirateur = $("#aspirateur").data("ionRangeSlider");

        $("#result").html("0")

        $(document).on("mouseup", function(e) {
            e.preventDefault();    
            var from =  (tv.result.from)*13 + 
                        (console.result.from)*6.37 +
                        (pc.result.from)*12.31 +
                        (pcPortable.result.from)*1.25 +
                        (smartphone.result.from)*0.5 +
                        (machineLaver.result.from)*(21.60/3.5) +
                        (laveVaiselle.result.from)*(36/3.5) +
                        (microOnde.result.from)*0.88 +
                        (cafetiere.result.from)/1.25 +
                        (aspirateur.result.from)*(40/7)

            var resultString = Math.round(from* 100) / 100 ;
            $("#result").html(resultString);
        });

        $(document).bind( "touchend", function(e) {
            e.preventDefault();    
            var from =  (tv.result.from)*13 + 
                        (console.result.from)*6.37 +
                        (pc.result.from)*12.31 +
                        (pcPortable.result.from)*1.25 +
                        (smartphone.result.from)*0.5 +
                        (machineLaver.result.from)*(21.60/3.5) +
                        (laveVaiselle.result.from)*(36/3.5) +
                        (microOnde.result.from)*0.88 +
                        (cafetiere.result.from)/1.25 +
                        (aspirateur.result.from)*(40/7)

            var resultString = Math.round(from* 100) / 100 ;
            $("#result").html(resultString);
        });

})
        