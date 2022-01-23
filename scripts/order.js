var Categories = []
//fetch categories from database implementing rest api
function LoadCategory(element) {
    if (Categories.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: 'http://localhost:51322/order/getProductCategories',
            success: function (data) {
                Categories = data;
                //render catagory
                renderCategory(element);
            }
        })
    }
    else {
        //render catagory to the element
        renderCategory(element);
    }
}

function renderCategory(element) {
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(Categories, function (i, val) {
        $ele.append($('<option/>').val(val.CategoryID).text(val.CategortyName));
    })
}

//fetch products implementing rest api
function LoadProduct(categoryDD) {
    $.ajax({
        type: "GET",
        url: "http://localhost:51322/order/getProductsforID/",
        data: { 'categoryID': $(categoryDD).val() },
        success: function (data) {
            //render products to appropriate dropdown
            renderProduct($(categoryDD).parents('.mycontainer').find('select.product'), data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function renderProduct(element, data) {
    //render product
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(data, function (i, val) {
        $ele.append($('<option/>').val(val.ProductID).text(val.ProductName));
    })
}



LoadCategory($('#productCategory'));
