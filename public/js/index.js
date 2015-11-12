var app = angular.module('nodeapp', []);
app.controller('postCtrl', function($scope, $http) {
    $http.get('/api').then(function(response) {
        $scope.postList = response.data.data;
        //console.log(response.data);
    });

});
$('#submit').click(function() {
    var content = $('#content').val();
    var creator = $('#creator').val();
    console.log(content + creator);

    $.post("api/", {
            content: content,
            creator: creator
        },
        function(data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
});
// $.post( "ajax/test.html", function( data ) {
//   $( ".result" ).html( data );
// });
//---------- Form Validation --------
