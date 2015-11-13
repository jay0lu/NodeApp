var app = angular.module('nodeapp', []);
app.controller('postCtrl', function($scope, $http) {

    $http.get('/api/posts').then(function(response) {
        $scope.postList = response.data.data;
    });

});

$('#submit').click(function() {
    var content = $('#content').val();
    var creator = $('#creator').val();
    console.log(content + creator);

    $.post("/api/posts/", {
            content: content,
            creator: creator
        },
        function(data, status) {
            //
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

//---------- Form Validation --------
