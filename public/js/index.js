var app = angular.module('nodeapp', []);
var token = null;
app.controller('postCtrl', function($scope, $http) {
    $('#posts_table').addClass('spinner-loader');
    $http.get('/api/posts').then(function(response) {
        $('#posts_table').removeClass('spinner-loader');
        var data = response.data.data;
        if (data != 'NOT FOUND') {
            $scope.postList = data;
        } else {
            $scope.postList = undefined;
        }
    });

    $scope.showBtn = function () {
        return token;
    };

    $scope.deletePost = function ($event, post) {
        $('#posts_table').addClass('spinner-loader');
        $.ajax({
            type: "DELETE",
            url: 'api/posts/' + post._id,
            data: {'token' : token},
            success: function(data) {
                console.log(data);
                refreshTable();
            },
            error: function(data){
                refreshTable();
            }
        });
    };
});

$("#post_form").submit(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('#posts_table').addClass('spinner-loader');
    var content = $('#content_input').val();
    var creator = $('#creator_input').val();
    $.post("/api/posts/", {
            content: content,
            creator: creator
        },
        function(data, status) {
            refreshTable();
        });
    console.log('123');
    return false;
});

$('#content_input').bind('input propertychange', function() {
    var content = $('#content_input').val();
    if (checkPalindrom(content) && content) {
        $('#palindrome_div').show();
    } else {
        $('#palindrome_div').hide();

    }
});

$('#search_btn').click(function () {
    $( "#search_input" ).focus();
});

$('#post_btn').click(function () {
    $( "#content_input" ).focus();
});

$('#refresh_btn').click(function () {
    refreshTable();
});

$('#search_submit').click(function () {
    $('#posts_table').addClass('spinner-loader');
    var keyword = $('#search_input').val();
    refreshTable({'keyword' : keyword});
});

$('#login_form').submit(function(e) {
    e.preventDefault();
    var username = $('#username_input').val();
    var password = $('#password_input').val();
    var url = "api/auth"; // the script where you handle the form input.
    $.ajax({
        type: "POST",
        url: url,
        data: {'username' : username, 'password' : password},
        success: function(data) {
            
            token = data.token;
            var scope = angular.element($('#posts_table')).scope();
            scope.$apply();
            displayToken(token);
            $('#loginModal').modal('hide');
        }
    });
});

$(document).ready(function() {
    $('#palindrome_div').hide();
    $('#post_form').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            content: {
                validators: {
                    notEmpty: {
                        message: 'The message is required'
                    }
                }
            }
        }
    });

    $('#login_form').formValidation({
           framework: 'bootstrap',
           excluded: ':disabled',
           icon: {
               valid: 'glyphicon glyphicon-ok',
               invalid: 'glyphicon glyphicon-remove',
               validating: 'glyphicon glyphicon-refresh'
           },
           fields: {
               username: {
                   validators: {
                       notEmpty: {
                           message: 'The username is required'
                       }
                   }
               },
               password: {
                   validators: {
                       notEmpty: {
                           message: 'The password is required'
                       }
                   }
               }
           }
    });

});

function checkPalindrom(str) {
    return str == str.split('').reverse().join('');
}

function refreshTable (data) {
    $('#posts_table').addClass('spinner-loader');
    var scope = angular.element($('#posts_table')).scope();
    $.get('/api/posts', data, function( response ) {
        if (response.data != 'NOT FOUND') {
            scope.postList = response.data;
        } else {
            scope.postList = undefined;
        }
        scope.$apply();
        $('#posts_table').removeClass('spinner-loader');
    });
}

function displayToken(token) {
    if (token) {
        $('#token').show();
        $('#token').html('Welcome admin, your token is : ' + token);
    } else {
        $('#token').show();
    }
}

