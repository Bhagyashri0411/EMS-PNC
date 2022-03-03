$(document).ready(function () {
    hdpesteamta();
    $("#hdpedrop").on('change', function () {
        var demohdpe = $(this).find(":selected").attr('name') ;
        $('#hdpecharts').html(demohdpe);
        hdpesteamoverview();
        // console.log($(this).find(":selected").val());
    });
    $("input[name=fromHomehdpe]").on('change', function (event) {
        // console.log($('["#hdpedrop"]:selected').val());
        hdpesteamoverview();
    });
    $("input[name=toHomehdpe]").on('change', function (event) {
        // console.log($('["#hdpedrop"]:selected').val());
        hdpesteamoverview();
    });
    const d = new Date(sessionStorage.getItem("lastUpdateddate"));
    d.setHours(05);
    d.setMinutes(30);
    d.setSeconds(0);
    $('#fromHomehdpe').val(d.toJSON().slice(0, 19));
    const tod = new Date(sessionStorage.getItem("lastUpdateddate"));
    tod.setHours(29);
    tod.setMinutes(29);
    tod.setSeconds(0);
    $('#toHomehdpe').val(tod.toJSON().slice(0, 19));
    hdpesteamoverview();
});

function hdpesteamoverview() {
    var myJSON = { 'fromdate': $('#fromHomehdpe').val(), 'todate': $('#toHomehdpe').val(), 'tagname': $("#hdpedrop option:selected").val() };
    const postdata = JSON.stringify(myJSON);
    console.log(postdata);
    $.ajax({
        method: "POST",
        data: postdata,
        headers: { 'Content-Type': 'application/json' },
        url: "http://192.168.1.125:8080/auth/HDPE/steamgenerationgraph",
    }).done(function (data) {
        var Difference_In_Days = data[0].showNumberIndex; 
        hdpegetsteamoverview(data ,Difference_In_Days);
    })
}


function hdpegetsteamoverview(data ,Difference_In_Days) {

    var chartData = { actual: [] };
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        var count = data.length;
        const HDPESBDate = new Date(element.date );
        chartData.actual.push({ y: element.actual,x:HDPESBDate  });
    }
    console.log("FccuData", chartData);
    var interval = 1;
    if (!Difference_In_Days) {
      if (count/8 > 1) {
         interval =Math.round(count/8);
      }else{
        interval = 1;
      }
     
    }
    showsteambalancehdpe(chartData ,Difference_In_Days, interval);
}

function showsteambalancehdpe(data ,Difference_In_Days, interval) {
    var chart = new CanvasJS.Chart("chartSteamBalancehdpe", {
        height: 225,
        theme: "dark1",
        backgroundColor: "#26293c",
        toolTip: {
            shared: true  //disable here. 
          },
        axisX: {
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            intervalType:Difference_In_Days == true?  "hour":"day",
            valueFormatString:Difference_In_Days == true?  "HH":"DD MMM YYYY" ,
         //valueFormatString: "DD MMM" ,
           title:Difference_In_Days == true?  "In hours":" In Days",
           interval: interval,
            tickThickness: 0,
            labelFontColor: "#d9d9d9",
            labelFontSize: 15

        },
        axisY: {
            title: "",
            gridColor: "gray",
            gridThickness: 1,
            tickThickness: 0,
            gridDashType: "dot",
            labelFontColor: "#d9d9d9",
            labelFontSize: 15
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
        },
        data: [{
            type: "line",
            lineThickness: 4,
            color: "#02a6e3",
            name: "actual",
            markerSize: 0,   
            //toolTipContent: "{name}: {y}",
            yValueFormatString: "0.00#",
            dataPoints: data.actual
        }]
    });
    chart.render();
}

function hdpesteamta() {
    $.ajax({
        url: "http://192.168.1.107:8090/auth/HDPE/Steambalance",
        method: "GET"
    }).done(function (data) {
        gethdpesteamta(data);

    })
}
function gethdpesteamta(data) {
    var table_data = '';
    $.each(data, function (key, value) {
        table_data += '<tr>';
        table_data += '<td>' + value.name + '</td>';
        table_data += '<td class="steam-gen2">' + value.value + '</td>';
        table_data += '</tr>';
    });
    $('#hdpe_table').append(table_data);
}