$(function(){
    $('.borrow').on('click', function(e) {
        e.preventDefault();
        var $btn = $(this);
        var data = {'category' : $btn.attr('data-category'), 'key' : $btn.attr('data-id'), 'qty' : parseInt($btn.attr('data-quantity'))};

        if(data.qty === 0){
          return alert('Sorry this book is not available at the moment');
        }
        $.ajax({
            url: "../forms/borrow",
            type: "post",
            dataType : "json",
            data: data,
            success: function(res) {
                  $btn.text('Borrowed');
                  $('.qty[data-id=' + data.key + ']').text('' + (data.qty - 1));
            },
            error: function(data, error) {

             }
        });
        return false;
    });
});