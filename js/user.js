$(function(){
    $('.borrow').on('click', function(e) {
        e.preventDefault();
        var $btn = $(this);
        var data = {'category' : $btn.attr('data-category'), 'key' : $btn.attr('data-id')};
        $.ajax({
            url: "../forms/borrow",
            type: "post",
            dataType : "json",
            data: data,
            success: function(data) {
                  $btn.text('Borrowed'); 
            },
            error: function(data, error) {

             }
        });
        return false;
    });
});