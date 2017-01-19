$(function(){
    $('#addnew').bind('click', function(e) {
      $('#result').html('');
        $('#form').removeClass('hide');
        e.preventDefault();
    });
});


$(function(){
    $('#submitbook').bind('click', function(e) {
        e.preventDefault();
        $("#result").html('');
        var data = {'name' : $('input[name=inputname]').val(), 'cat' : $('select[name=cat]').val(), 'qty' : $('input[name=inputqty]').val()};
        $.ajax({
            url: "../forms/addbook",
            type: "post",
            dataType : "json",
            data: data,
            success: function(data) {
                if(data.url){
                  window.location.href= data.url;
                }else{
                  $('#form').addClass('hide');
                  $('#result').html('Book added successfully');
                  console.log('else');
                  console.log(data)
                }
                $('#form').addClass('hide');
                  $('#result').html('Book added successfully'); 
                  console.log('outside'); 
            },
            error: function(data, error) {
            
      $("#result").html(' ' + error);
      console.log(typeof error);

      }
        });
        return false;
    });
});



$(function(){
    $('#submitcat').bind('click', function(e) {
        e.preventDefault();
        $("#result").html('');
        var data = {'name' : $('input[name=inputcat]').val()};
        $.ajax({
            url: "../forms/addcat",
            type: "post",
            dataType : "json",
            data: data,
            success: function(data) {
                if(data.url){
                  window.location.href= data.url;
                }else{
                  $('#form').addClass('hide');
                  $('#result').html('Category added successfully');
                  console.log('else');
                  console.log(data)
                }
                $('#form').addClass('hide');
                  $('#result').html('Category added successfully'); 
                  console.log('outside'); 
            },
            error: function(data, error) {
            
      $("#result").html(' ' + error);
      console.log(typeof error);

      }
        });
        return false;
    });
});