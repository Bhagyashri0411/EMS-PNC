$(document).ready(function () {
    loadGaugeChart();
    specifictable();
    parametertable();
    // cardncu4();
    guagevaluencuAct();


    postFuelDoughnutDataNCU1();

    $(".ncu-doughnut").click(function () {
        console.log($("input[name=ratio-name]:checked").val());
        var abc = $("input[name=ratio-name]:checked").val()
        postFuelDoughnutDataNCU1(abc);
    });

    // getDoughnutncu();        //get mapping doughnut
    getpiechartncu();        //get mapping pie
});


function getpiechartncu() {
    $.ajax({
        method: "GET",
        url: "http://192.168.1.123:8080/ncu/donutgraph",
    }).done(function (data) {

        var fuelConsumed = data[0].steamConsumed;
        console.log(fuelConsumed);
        loadpiechartncu(fuelConsumed);
    })
    // .fail(function () {
    //     var faildata =
    //         { "shp": 63.0, "hp": 64.0, "mp": 65.0, "lp": 66.0, "total": 258.0 }
    //     loadpiechartncu(faildata);
    // })

}
function loadpiechartncu(fuelConsumed) {
    console.log(fuelConsumed);
    CanvasJS.addColorSet("greenShades", [
        "#ffa600",
        "#00aa7e",
        "#005374",
        "#d944b4"
    ]);
    var dataPoints = [];
    var chart = new CanvasJS.Chart("Fuel-ncu", {

        colorSet: "greenShades",
        // height: 145,
        // width: 190,
        theme: "dark1",
        backgroundColor: "#26293c",

        title: {
            text: fuelConsumed.total,
            verticalAlign: "center",
            dockInsidePlotArea: true,
            fontWeight: 100,
            fontColor: "#f2f2f2",
            fontFamily: "Bahnschrift Light"
        },
        legend: {
            horizontalAlign: "right",
            verticalAlign: "center", // "top" , "bottom"
            fontSize: 15,
        },
        axisY: {
            title: "Units",
            titleFontSize: 24,
            includeZero: true
        },
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center"
        },
        data: [{
            type: "doughnut",
            showInLegend: false,
            // toolTipContent: "{name} : {y}%",
            // indexLabel: " {y}%",
            yValueFormatString: "0.00#",
            indexLabelPlacement: "outside",
            startAngle: 120,
            dataPoints: [
                { y: fuelConsumed.shp, name: "RLNG", indexLabel: ((fuelConsumed.shp / fuelConsumed.total) * 100).toFixed(2) + "%" },
                { y: fuelConsumed.hp, name: "LPG", indexLabel: ((fuelConsumed.hp / fuelConsumed.total) * 100).toFixed(2) + "%" },
                { y: fuelConsumed.mp, name: "FG Export", indexLabel: ((fuelConsumed.mp / fuelConsumed.total) * 100).toFixed(2) + "%" },
                { y: fuelConsumed.lp, name: "FG Generation", indexLabel: ((fuelConsumed.lp / fuelConsumed.total) * 100).toFixed(2) + "%" },

            ]
        }]
    });

    chart.render();
}



function postFuelDoughnutDataNCU1() {
    var myJSON = { uom: $("input[name=ratio-name]:checked").val() }
    const postdata = JSON.stringify(myJSON);
    console.log(postdata);
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: "POST",
        data: postdata,

        url: "http://192.168.1.123:8080/ncu/NCUDoughnut",
    })
        .done(function (data) {
            var energyConsumed = data[0].energyConsumed;
            console.log(energyConsumed);

            loadDoughnutHoriChartNCU1(energyConsumed);

        })
    // .fail(function () {
    //     var failData ={"fuel":24,"steam":56,"electricity":45,"total":568}

    //     var energyConsumed = failData;
    //     loadDoughnutHoriChartNCU1(energyConsumed);

    // })
}
function loadDoughnutHoriChartNCU1(energyConsumed) {

    console.log(energyConsumed)
    CanvasJS.addColorSet("greenShades", [
        "#ffa600",
        "#00aa7e",
        "#005374"
    ]);
    var dataPoints = [];
    var chart = new CanvasJS.Chart("titles-ncu", {

        colorSet: "greenShades",
        height: 120,
        // width: 160,
        theme: "dark1",
        backgroundColor: "#26293c",
        title: {
            text: energyConsumed.total.toFixed(2),
            verticalAlign: "center",
            dockInsidePlotArea: true,
            fontWeight: 500,
            fontColor: "#f2f1e7",
            fontFamily: "Bahnschrift Light"
        },

        axisY: {
            title: "Units",
            titleFontSize: 24,
            includeZero: true

        },

        data: [{
            type: "doughnut",
            yValueFormatString: "0.00#",
            indexLabelPlacement: "outside",
            startAngle: 100,
            dataPoints: [
                { y: energyConsumed.fuel, name: "Fuel", indexLabel: ((energyConsumed.fuel / energyConsumed.total) * 100).toFixed(2) + "% " },
                { y: energyConsumed.steam, name: "Steam", indexLabel: ((energyConsumed.steam / energyConsumed.total) * 100).toFixed(2) + "% " },
                { y: energyConsumed.electicity, name: "Electricity", indexLabel: ((energyConsumed.electicity / energyConsumed.total) * 100).toFixed(2) + "% " }
            ]
        }]
    });

    chart.render();
}

function loadGaugeChart() {
    $.ajax({
        type: "GET",
        url: "http://192.168.1.123:8080/ncu/specificenergyConsumption",
    }).done(function (data) {
        ZC.LICENSE = ["b55b025e438fa8a98e32482b5f768ff5"];
        var myConfig12 = {
            "type": "gauge",
            "height": "19%",
            "width": "60%",
            "x": "20%",
            "backgroundColor": "#26293c",
            "scale": {
                "size-factor": "250%", //Modify your gauge chart size.
                offsetY: '10px'
            },
            plotarea: {
                padding: '10 0 0 0'
            },
            "scale-r": {
                "aperture": 180,
                "values": "0:100:0",
                item: {
                    'font-color': "#bfbfbf",
                    'offset-r': -10,
                    'font-size': 10,
                },
                "center": {
                    "size": 4,
                    "background-color": "transparent",
                    "border-color": "none"
                },
                "ring": {
                    "size": 24,
                    "rules": [{
                        "rule": "%v >= 0 && %v <= 10",
                        "background-color": "#02b04f"
                    },
    
                    {
                        "rule": "%v >= 11 && %v <= 30",
                        "background-color": "#ffc000"
                    },
    
                    {
                        "rule": "%v >= 31 && %v <=100",
                        "background-color": "#ff0000"
                    }
                    ]
                },
                "guide": {
                    "alpha": 0.8
                }
            },
            "plot": {
                "csize": "3%",
                "size": "100%",
                "background-color": "black"
            },
            "series": [{
                "background-color": "black",
                "values": data.specificenergy,
            }]
        };
    
        setTimeout(() => {
            zingchart.render({
                id: 'zingChart',
                data: myConfig12
            });
        }, 100);
    });
}
function guagevaluencuAct() {
    $.ajax({
        method: "GET",
        url: 'http://192.168.1.123:8080/ncu/specificenergyConsumption',

    }).done(function (data) {
        document.getElementById("devncu").innerHTML = data.deviation + "%";
        document.getElementById("actncu").innerHTML = data.actual;
        document.getElementById("optncu").innerHTML = data.reference;
    });

}
function specifictable() {
    $.ajax({
        method: "GET",
        url: "http://192.168.1.123:8080/ncu/specificenergyConsumptiontable"
    }).done(function (data) {
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.type + '</td>';
            table_data += '<td>' + value.sec + '</td>';
            table_data += '<td>' + value.reference + '</td>';
            if (value.deviation > 0) {
                table_data += '<td class="r1">' + "+" + value.deviation + '</td>';
            }
            else {
                table_data += '<td class="r1">' + value.deviation + '</td>';
            }
    
            table_data += '</tr>';
        });
        $('#ncutable').append(table_data);
        $(".r1").each(function () {
            var text = $(this).text();
            if (/[+-]?\d+(\.\d+)?/.test(text)) {
                var num = parseFloat(text);
                if (num < 0) {
                    $(this).addClass("negative");
                } else if (num > 0) {
                    $(this).addClass("positive");
                }
    
            }
        });
    })
}

function parametertable() {
    $.ajax({
        method: "GET",
        url: "http://192.168.1.123:8080/parametertable"
    }).done(function (data) {
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.parameter + '</td>';
            table_data += '<td>' + value.uom + '</td>';
            table_data += '<td>' + value.reference + '</td>';
            table_data += '<td>' + value.actual + '</td>';
            table_data += '<td>' + value.deviation + '</td>';
            // if (value.deviation > 0) {
            //     table_data += '<td class="r1">' + "+" + value.deviation + '</td>';
            // }
            // else {
            //     table_data += '<td class="r1">' + value.deviation + '</td>';
            // }
    
            table_data += '</tr>';
        });
        $('#NCU_card_body').append(table_data);
        // $(".r1").each(function () {
        //     var text = $(this).text();
        //     if (/[+-]?\d+(\.\d+)?/.test(text)) {
        //         var num = parseFloat(text);
        //         if (num < 0) {
        //             $(this).addClass("negative");
        //         } else if (num > 0) {
        //             $(this).addClass("positive");
        //         }
    
        //     }
        // });
    })
}