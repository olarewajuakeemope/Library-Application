$(function(){
    $('#signout').bind('click', function(e){
      e.preventDefault();
        $.ajax({
            url: "../forms/logout",
            type: "get",
            success: function(data) {
                
                if(data.error){
                  console.log(data.error);
                }else{
                    console.log('inside the windows');
                    window.location.href= "/";

                }
                
            },
            error: function(data, error) {

      console.log(typeof error);

      }
        });
        return false;
    });
});
