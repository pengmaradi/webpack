(function($){
    $('.tx-indexedsearch-searchbox-sword').keyup(function(e){
        let s = $(this).val();
        if(s.length) {
            $.ajax({
                type: 'post',
                url: 'index.php',
                data: {
                    'eID':'search',
                    'tx_search_eID[action]': 'get',
                    'tx_search_eID[s]': s,
                },
                success: function(e) {
                    let element = jQuery.parseJSON(e);
                    let row = [];
                    $.each(element, function(index, data){
                        $.each(data, function(i, k){
                            row.push('<li class="row row'+ index +'">'  + k + '</li>');
                        });
                    });

                    if(row.length) {
                        $('.autoCompShow').html('<ul>'+ row.join('\n') + '</ul>');

                        $('.autoCompShow').find('li.row').each(function(){
                            $(this).click(function(){
                                let v = $(this).text();
                                $('.tx-indexedsearch-searchbox-sword').val(v);
                                $('.defaultForm').submit();
                            });
                        });
                    } else {
                        $('.autoCompShow').html('');
                    }
                }
            });
        } else {
            $('.autoCompShow').html('');
        }
    });
    $('.searchbox__submit').click(function(e){
        let v = $(this).closest('.searchbox__overlay').find('.tx-indexedsearch-searchbox-sword').val();
        if(v.length < 1) {
            return false;
        }
    });
})(jQuery);
