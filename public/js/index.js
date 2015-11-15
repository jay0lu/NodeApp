var app = angular.module('nodeapp', []);
var token;

app.controller('postCtrl', function($scope, $http) {


    $http.get('/api/posts').then(function(response) {
        $scope.postList = response.data.data;
    });

    $scope.showBtn = function () {
        return token;
    };

    $scope.editPost = function ($event, post) {

        console.log(token);
    };

    $scope.deletePost = function ($event, post) {
        $.ajax({
            type: "DELETE",
            url: 'api/posts/' + post._id,
            data: {'token' : token},
            success: function(data) {
                console.log(data);
                refreshTable();
            }
        });
    };
});

$('#submit').click(function() {
    var content = $('#content_input').val();
    var creator = $('#creator_input').val();
    $.post("/api/posts/", {
            content: content,
            creator: creator
        },
        function(data, status) {
            $("#refresh_btn").trigger("click");
        });

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

$('#login_btn').click(function() {
    var username = $('#username_input').val();
    var password = $('#password_input').val();

    var url = "api/auth"; // the script where you handle the form input.

        $.ajax({
            type: "POST",
            url: url,
            data: {'username' : username, 'password' : password},
            success: function(data) {
                $('#loginModal').modal('toggle');
                token = data.token;
                var scope = angular.element($('#posts_table')).scope();
                scope.$apply();
                displayToken(token);
            }
        });

});

$(document).ready(function() {

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
                    },
                    stringLength: {
                        min: 10,
                        max: 300,
                        message: 'The message you send must be more than 10 and less than 300 characters long'
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

function refreshTable () {
    //刷新状体提示
    $('#posts_table').addClass('spinner-loader');
    var scope = angular.element($('#posts_table')).scope();
    $.get('/api/posts', function( response ) {
        scope.postList = response.data;
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

