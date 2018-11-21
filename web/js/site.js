function refreshSite() {
    $.ajax({
        type:"POST",
        dataType:"json",
        data:$("#filter-form").serialize(),
        url:"/site/main",
        beforeSend:function(){
            $(".admin-card-num").empty().html($.loadingBig);
            var main = $("#admin-site-main");
            main.prev().show();
            main.next().remove();
        },
        complete:function(){
            $(".admin-card-num").children('i').remove();
            $("#admin-site-main").prev().hide();
        },
        success:function(json){
            $(".admin-card-income").html(json[1].dau_income);
            $(".admin-card-payp").html(json[1].dau_payp);
            $(".admin-card-new_p").html(json[1].new_p);
            $(".admin-card-dau").html(json[1].dau);
            refreshTable(json);
        }
    });
};

function refreshTable(json) {
    layui.use('table', function(){
        var table = layui.table;
        //展示已知数据
        table.render({
            elem: '#admin-site-main',
            toolbar: true,
            cellMinWidth:'110',
            cols: [[ //标题栏
                {field: 'ymd', title: '日期', sort:true},
                {field: 'active_num', title: '激活数', sort:true},
                {field: 'new_dev_num', title: '新增账号设备数', sort:true,minWidth:150},
                {field: 'new_p', title: '新增账号', sort:true},
                {field: 'new_role', title: '新增角色', sort:true},
                {field: 'new_pay', title: '新增充值', sort:true},
                {field: 'new_payp', title: '新增充值人数', sort:true},
                {field: 'new_pay_lv', title: '新增付费率', sort:true},
                {field: 'new_pay_arpu', title: '新增付费ARPU', sort:true},
                {field: 'new_arpu', title: '新增ARPU', sort:true},
                {field: 'dau_income', title: '充值金额', sort:true},
                {field: 'dau_payp', title: '充值人数', sort:true},
                {field: 'dau_pay_lv', title: '付费渗透率', sort:true},
                {field: 'pay_arpu', title: '付费ARPU', sort:true},
                {field: 'dau_arpu', title: '登录ARPU', sort:true},
                {field: 'dau', title: '登录人数', sort:true},
                {field: 'online_avg', title: '平均在线', sort:true},
                {field: 'online_max', title: '最高在线', sort:true},
                {field: 'd1', title: '次日留存数', sort:true},
                {field: 'l1', title: '次日留存率', sort:true},
                {field: 'd3', title: '3日留存数', sort:true},
                {field: 'l3', title: '3日留存率', sort:true},
                {field: 'd7', title: '7日留存数', sort:true},
                {field: 'l7', title: '7日留存率', sort:true},
                {field: 'd30', title: '30日留存数', sort:true},
                {field: 'l30', title: '30日留存率', sort:true}
            ]]
            ,data: json
            ,skin: 'row' //表格风格
            ,even: true
        });
    });
}
var obj = $("body");
obj.on('refresh',function () {
    refreshSite();
});
$.triggerList.push(obj);