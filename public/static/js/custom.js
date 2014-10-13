$(function() {

    // Initialises bootstraps tooltips
    $('.tooly').tooltip({container: 'body'});

    // Global counter for keyword inputs
    num_keywords = $('.keyword').length;

    // Click handler for adding additional keyword text boxes
    // for Twitter searches
    $('body').on('click', '.addkeyword', function(event) {
        event.preventDefault();
        var $button = $(this);
        $keyword = keyword();
        $button
            .parents('.keyword')
            .after($keyword);
        num_keywords = $('.keyword').length; // Update global var
        updateNum();
    });

    // Click handler for removing AND/OR switches on
    // Twitter search
    $('body').on('click', '.removekeyword', function(event) {
        event.preventDefault();
        var $button = $(this);
        var $keyword = $button.parents('.keyword');
        $keyword.remove();
        num_keywords--;
        updateNum();
    });

    // Click handler for the Twitter search keyword
    // operator buttons (AND/OR)
    $('body').on('click', '.btn-switch', function(event) {
        event.preventDefault();
        var $button = $(this);
        var $button_group = $button.parent();
        var $input = $button_group.find('.keyword-checkbox');
        $button_group.children()
            .removeClass('btn-primary')
            .removeClass('btn-switch-selected');
        $button
            .addClass('btn-primary')
            .addClass('btn-switch-selected');
        if ($button.text() == "AND") {
            $input.prop('checked', true);
        } else {
            $input.prop('checked', false);
        }
    });

    // Enumerates the Twitter search keyword components
    // This keeps the numbering correct when adding/deleting
    function updateNum() {
        $('.keyword-input').each(function(index, value) {
            $this = $(this);
            var input_num = index + 1;
            $this.attr('id', 'id_search_keyword' + input_num);
            $this.attr('name', 'search_keyword' + (input_num));
        });
        $('.keyword-label').each(function(index, value) {
            $this = $(this);
            var input_num = index + 1;
            $this.attr('for', 'search_keyword' + (input_num));
        });
        $('.keyword-checkbox').each(function(index, value) {
            $this = $(this);
            var input_num = index + 1;
            $this.attr('name', 'search_and' + (input_num));
        });

        // Disables add keyword button if 5 keywords
        // already exsist on the page
        if (num_keywords >= 5) {
            $('.addkeyword').attr("disabled", true);
        } else {
            $('.addkeyword').attr("disabled", false);
        }
    }

    // Returns a keyword form-group which houses
    // the AND/OR buttons, input, and (+)(-) buttons
    function keyword() {
        var $keyword = $('<div>')
            .addClass('form-group')
            .addClass('keyword');
        var $label = $('<label>')
            .addClass('col-sm-3')
            .addClass('keyword-label')
            .append(btn_group);
        var $inputwrapper = $('<div>')
            .addClass('col-sm-9')
            .addClass('input-group');
        var $input = $('<input>')
            .attr('type', 'text')
            .attr('placeholder', 'Enter keyword')
            .addClass('keyword-input')
            .addClass('form-control');
        var $btn_wrapper = $('<span>')
            .addClass('input-group-btn');
        var $add_btn = $('<a>')
            .addClass('btn')
            .addClass('btn-default')
            .addClass('addkeyword')
            .attr('href', '#')
            .append('+');
        var $delete_btn = $('<a>')
            .addClass('btn')
            .addClass('btn-default')
            .addClass('removekeyword')
            .attr('href', '#')
            .append('&times;');
        $btn_wrapper
            .append($add_btn)
            .append($delete_btn);
        $inputwrapper
            .append($input)
            .append($btn_wrapper);
        $keyword
            .append($label)
            .append($inputwrapper);
        return $keyword;
    }

    // Returns a button group containing the
    // AND/OR buttons and the invible checkbox
    // which is used for returning 0 or 1 for DB
    function btn_group() {
        var $btn_group = $('<div>')
            .addClass('btn-group');
        var $plus_and = addButton("AND");
        var $plus_or = addButton("OR");
        var $hidden_field = $('<input>')
            .attr('type', 'checkbox')
            .attr('name', 'search_and1')
            .addClass('keyword-checkbox')
            .prop('checked', true)
            .css({'opacity': '0'});
        var $close = $('<a>')
            .addClass('removeKeyword')
            .addClass('btn')
            .attr('href', '#')
            .append("&times;");
        $btn_group
            .append(
                $plus_and
                    .addClass('btn-primary')
                    .addClass('btn-switch-selected')
            )
            .append($plus_or)
            .append($hidden_field);
        return $btn_group;
    }

    // Individual AND/OR button
    function addButton(text) {
        var $button = $('<a>')
            .addClass('btn')
            .addClass('btn-switch')
            .addClass('btn-default')
            .attr('href', '#')
            .append(text);
        return $button;
    }

    // Load the content into the "New Project" modal
    if ($('#modal-1 .modal-content')) {
        $.get( "/projects/new/", function( data ) {
            $('#modal-1 .modal-body')
                .html(data);
        });
    }

    /*
    MOVED INLINE TO FIX URLS - TEMPLATES/PROJAPP/CONTENT.HTML
    */
    // Load the content into the "Upload CSV" modal
    // if ($('#modal-2 .modal-content')) {
    //     var uploadurl = window.location.pathname + 'upload/';
    //     $.get( uploadurl, function( data ) {
    //         $('#modal-2 .modal-body')
    //             .html(data);
    //     });
    // }

    // // Load the content into the "Twitter Search" modal
    // if ($('#modal-3 .modal-content')) {
    //     $.get( "twitter/create/", function( data ) {
    //         $('#modal-3 .modal-body')
    //             .html(data);
    //     });
    // }

    // Click handler for CSV upload
    $('body').on("click", '.upload-submit', function (e) {
        e.preventDefault();
        // Disable button if not disabled
        if ($(this).is(":disabled")) {
            return;
        } else {
            $(this).attr('disabled', 'disabled');
        }
        // Check each input has a value
        if (!$("#id_dfnote").val()) {
            $('.alert').remove();
            var $warning = $('<div>')
                .addClass('alert')
                .addClass('alert-danger')
                .html("Please add a file description.")
            $("form").prepend($warning);
            $('.upload-submit').removeAttr('disabled');
        } else if (!$('#id_datafile').val()) {
            $('.alert').remove();
            var $warning = $('<div>')
                .addClass('alert')
                .addClass('alert-danger')
                .html("Please add a data file.")
            $("form").prepend($warning);
            $('.upload-submit').removeAttr('disabled');
        } else { // If form is filled correctly
            var formData = new FormData($('.upload-form')[0]); // Get form data
            var uploadpath = window.location.pathname + 'upload/';

            $.ajax({
                url: uploadpath, // AJAX request to the /upload/ path
                type: 'POST',
                xhr: function () { // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { // Check if upload property exists
                        // For handling the progress of the upload
                        myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                    }
                    return myXhr;
                },
                // Ajax events
                success: completeHandler,
                error: errorHandler,
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            });
        }
    });

    // Shows the progress bar
    // (Doesn't show on local as there is
    // almost no transfer time)
    function progressHandlingFunction(e) {
        if (e.lengthComputable) {
            $('.progress').show();
            $('.progress-bar').attr({
                'aria-valuenow': e.loaded,
                'aria-valuemax': e.total
            }).css({
                width: ((e.loaded / e.total) * 100) + '%',
            });
        }
    }

    // Reloads page if file uploaded successfully
    function completeHandler(upload) {
        if (upload.success) {
            location.reload();
        } else {
            $('#id_datafile .alert').remove();
            if (typeof (upload) === "string") {
                $('.modal .modal-body').html(upload);
            } else {
                $('.upload-submit').removeAttr('disabled');
            }
        }
        $('.progress').hide();
    }

    // Logs errors to the console
    function errorHandler(e) {
        console.log(e);
    }
});