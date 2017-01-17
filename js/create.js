$(function(){
    $('#validForm').bind('submit', function(e) {
        console.log('submit');
        $('body').append('<div id="progress">Processing...</div>');
        if (!is_valid_form()) {
            return false;
        }

        e.preventDefault();
        $("#result").html('');
        var data = {'name' : $('input[name=name]').val(), 'email' : $('input[name=email]').val(), 'phone' : $('input[name=phone]').val(), 'budget' : $('select[name=budget]').val(), 'timeline' : $('select[name=timeline]').val(), 'source' : $('select[name=source]').val(), 'othersource' : $('input[name=othersource]').val(), 'message' : $('textarea[name=message]').val(), 'website' : $('input[name=website]').val(), 'project' : $('select[name=project]').val()};
        $.ajax({
            url: "send-form-email.php",
            type: "post",
            dataType : "json",
            data: data,
            success: function(data) {
                console.log(data);
                var alertClass;
                if(data.error === true){
                    alertClass = 'alert-error';
                }else{
                    alertClass = 'alert-success';
                    var form = $('#validForm').closest('form');
                    form.find("input[type=text], textarea, select").val("");
                }
                $('#progress').fadeOut(1000);
              $('form#validForm').fadeOut(5000);
                $("#result").html(returnHtml(alertClass, data.message));
            },
            error: function(data, error) {
            $('#progress').fadeOut(1000);
      $("#result").html(returnHtml('alert-error', "Oops! something went wrong, please try again"));
                alert(error);
      }
        });
        return false;
    });
});