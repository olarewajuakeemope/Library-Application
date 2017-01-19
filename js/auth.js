$(function(){
    $('#validForm').bind('submit', function(e) {
        console.log('submit');
        $('h5').append('<div id="progress">Processing...</div>');
        e.preventDefault();
        $("#result").html('');
        var data = {'email' : $('input[name=userEmail]').val(), 'pass' : $('input[name=userPassword]').val()};
        var url = "";
        $.ajax({
            url: "../forms/loginprocess",
            type: "post",
            dataType : "json",
            data: data,
            success: function(data) {
                if(data.error){
                  //console.log('inside the success if');
                  console.log(data.error);
                  $("#result").html(data.error.message);
                  $('#progress').html('');
                }else{
                    //console.log('inside the windows');
                    window.location.href= data.url;

                }
                
            },
            error: function(data, error) {
      //console.log('inside the error');    
      $("#result").html(error);
      console.log(typeof error);
      $('#progress').html('');

      }
        });
        return false;
    });
});
