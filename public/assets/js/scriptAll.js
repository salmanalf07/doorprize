
function reset_form(data) {
    // console.log(data);

    $('#'+ data +' select').val(null).trigger('change.select2').attr("disabled", false);
    $('#'+ data + ' input').removeAttr('value').attr("disabled", false);
    document.getElementById(data).reset();
    // $('.datetimepicker-input').val(null).prop('readonly', false);
    // var table = document.getElementById('roww');
    // var rowCount = table.rows.length;

    // for (o = 0; o <= rowCount; o++) {
    //     deleteRows()
    // }
    //$('#user_id').val('{{ Auth::user()->name }}');
};
